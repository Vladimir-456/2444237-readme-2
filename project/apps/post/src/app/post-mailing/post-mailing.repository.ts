import { Injectable } from "@nestjs/common";
import { NotifyService } from "../notify/notify.service";
import { PrismaClientService } from "@project/models";

@Injectable()
export class PostMailingRepository {
    constructor (
        private readonly notifyService: NotifyService,
        private readonly prisma: PrismaClientService) {}

    async createAndSendDigest(adminId: string) {
        const posts = await this.prisma.post.findMany({
        where: {
            digestPosts: {
                none: {},
            },
        },
        select: {
            id: true,
            title: true,
            description: true,
            imageUrl: true,
            url: true,
            publishDate: true,
        },
        orderBy: {
            publishDate: 'asc',
        },
        });

        if (posts.length === 0) {
            return {
                status: 'nothing_to_send',
                digestId: null,
                mailingId: null,
                postsCount: 0,
            }
        }

        const digest = await this.prisma.digest.create({
        data: {
            title: `Дайджест от ${new Date().toLocaleDateString('ru-RU')}`,
            posts: {
            create: posts.map((post) => ({
                postId: post.id,
            })),
            },
        },
        include: {
            posts: {
            include: {
                post: true,
            },
            },
        },
        });

        const mailing = await this.prisma.postMailing.create({
            data: {
                digestId: digest.id,
                title: digest.title,
                status: 'PENDING',
                createdBy: adminId
            },
        });

        await this.notifyService.notifyPostMailingCreated({
            mailingId: mailing.id,
            title: mailing.title,
            posts: digest.posts.map((item) => ({
                postId: item.post.id,
                title: item.post.title ?? undefined,
                description: item.post.description ?? undefined,
                imageUrl: item.post.imageUrl ?? undefined,
                url: item.post.url ?? undefined,
                publishDate: item.post.publishDate.toISOString(),
            })),
        });

        await this.prisma.postMailing.update({
        where: { id: mailing.id },
        data: {
            status: 'PUBLISHED',
            sentAt: new Date(),
        },
        });

        return {
            status: 'created',
            digestId: digest.id,
            mailingId: mailing.id,
            postsCount: posts.length,
        };
  }
}