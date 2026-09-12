import { PrismaClient, PostStatus, PostType } from '@prisma/client';
import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
const connectionString =
  'postgresql://postgres:12@localhost:5432/readme?schema=public';

const FIRST_USER_ID = '658170cbb954e9f5b905ccf4';
const SECOND_USER_ID = '6581762309c030b503e30512';

const FIRST_POST_UUID = '6d308040-96a2-4162-bea6-2338e9976540';
const SECOND_POST_UUID = 'ab04593b-da99-4fe3-8b4b-e06d82e2efdd';

const FIRST_COMMENT_UUID = 'c8b6e7e7-8f8d-4a8d-9a24-4a7c4a7c4a7c';
const SECOND_COMMENT_UUID = 'd9c7f8f8-9a9e-4b9e-8b4b-5b8d5b8d5b8d';

const LIKE_UUID = 'e0d8f9f9-aa0f-4caf-9c5c-6c9e6c9e6c9e';

const getComments = () => [
  {
    id: FIRST_COMMENT_UUID,
    text: 'First comment',
    author: FIRST_USER_ID,
    postId: FIRST_POST_UUID,
  },
  {
    id: SECOND_COMMENT_UUID,
    text: 'Second comment',
    author: SECOND_USER_ID,
    postId: FIRST_POST_UUID,
  },
];

const getLikes = () => [
  {
    id: LIKE_UUID,
    userId: FIRST_USER_ID,
    postId: FIRST_POST_UUID,
    createAt: new Date(),
  },
];

const getPosts = () => [
  {
    id: FIRST_POST_UUID,
    authorId: FIRST_USER_ID,
    typePost: PostType.VIDEO,
    tags: ['tag1', 'tag2'],
    status: PostStatus.PUBLISHED,
    isRepost: false,
    publishDate: new Date(),
    title: 'First post',
    url: 'https://www.youtube.com/watch?v=6ZfWJzU7WY8',
  },
  {
    id: SECOND_POST_UUID,
    authorId: SECOND_USER_ID,
    typePost: PostType.TEXT,
    tags: ['tag3'],
    status: PostStatus.PUBLISHED,
    isRepost: false,
    publishDate: new Date(),
    text: 'Second post',
  },
];

const seedDB = async (prisma: PrismaClient) => {
  const posts = getPosts();
  const comments = getComments();
  const likes = getLikes();

  for (const post of posts) {
    await prisma.post.upsert({
      where: { id: post.id },
      update: {},
      create: post,
    });
  }

  for (const comment of comments) {
    await prisma.comment.upsert({
      where: { id: comment.id },
      update: {},
      create: comment,
    });
  }

  for (const like of likes) {
    await prisma.like.upsert({
      where: { id: like.id },
      update: {},
      create: like,
    });
  }

  console.info('🤘 Database was filled');
};

const adapter = new PrismaPg(connectionString);

const bootstrap = async () => {
  const prismaClient = new PrismaClient({
    adapter,
  });

  try {
    await seedDB(prismaClient);
  } catch (error) {
    console.error('Seed error:', error);
  } finally {
    await prismaClient.$disconnect();
  }
};

bootstrap();
