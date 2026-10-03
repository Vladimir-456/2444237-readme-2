import { CreateLinkPostDto, CreatePhotoPostDto, CreateQuotePostDto, CreateTextPostDto, CreateVideoPostDto } from "./dto/create-dto.interface";
import { UpdateLinkPostDTO, UpdatePhotoPostDTO, UpdateQuotePostDTO, UpdateTextPostDTO, UpdateVideoPostDTO } from "./dto/update-dto.interface";

export const AUTHOR_ID = 'user34324532';

export const createDtoMap = {
  LINK: CreateLinkPostDto,
  PHOTO: CreatePhotoPostDto,
  QUOTE: CreateQuotePostDto,
  TEXT: CreateTextPostDto,
  VIDEO: CreateVideoPostDto
}

export const updateDtoMap = {
  LINK: UpdateLinkPostDTO,
  PHOTO: UpdatePhotoPostDTO,
  QUOTE: UpdateQuotePostDTO,
  TEXT: UpdateTextPostDTO,
  VIDEO: UpdateVideoPostDTO
}
