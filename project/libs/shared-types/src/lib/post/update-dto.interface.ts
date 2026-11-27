import { PartialType } from '@nestjs/mapped-types';
import {
  CreateLinkPostDto,
  CreatePhotoPostDto,
  CreateQuotePostDto,
  CreateTextPostDto,
  CreateVideoPostDto,
} from './create-dto.interface';

export class UpdateVideoPostDTO extends PartialType(CreateVideoPostDto) {}

export class UpdateTextPostDTO extends PartialType(CreateTextPostDto) {}

export class UpdateQuotePostDTO extends PartialType(CreateQuotePostDto) {}

export class UpdatePhotoPostDTO extends PartialType(CreatePhotoPostDto) {}

export class UpdateLinkPostDTO extends PartialType(CreateLinkPostDto) {}

export type UpdatePostDTO =
  | UpdateVideoPostDTO
  | UpdateTextPostDTO
  | UpdateQuotePostDTO
  | UpdatePhotoPostDTO
  | UpdateLinkPostDTO;
