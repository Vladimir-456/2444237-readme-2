import { CreateLinkPostDto, CreatePhotoPostDto, CreateQuotePostDto, CreateTextPostDto, CreateVideoPostDto } from "./create-dto.interface"
import { UpdateLinkPostDTO, UpdatePhotoPostDTO, UpdateQuotePostDTO, UpdateTextPostDTO, UpdateVideoPostDTO } from "./update-dto.interface"

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
