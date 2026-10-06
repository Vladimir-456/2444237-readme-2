import { ArgumentMetadata, BadRequestException, PipeTransform, Type } from "@nestjs/common";
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

type PostDtoValidationPipeType = {
    createDto: Record<string, Type<any>>;
    updateDto: Record<string, Type<any>>;
    getExistingPostType?: (postId: string) => Promise<string | null> ;
    postId?: string
}

export class PostDtoValidationPipe implements PipeTransform {
    private readonly createDtoMap: Record<string, Type<any>>;
    private readonly updateDtoMap: Record<string, Type<any>>;
    private readonly getExistingPostType?: (postId: string) => Promise<string | null> ;
    private readonly postId?: string

    constructor(options: PostDtoValidationPipeType) {
        this.createDtoMap = options.createDto;
        this.updateDtoMap = options.updateDto;
        this.getExistingPostType = options.getExistingPostType
        this.postId = options.postId
    }

    async transform(value: any, metadata: ArgumentMetadata) {
        if (!value || typeof value !== 'object') {
        throw new BadRequestException('Body must be an object');
        }

    const isUpdate = !!this.getExistingPostType;

    const dtoMap = isUpdate ? this.updateDtoMap : this.createDtoMap;

    let typeValue = value.typePost;

    if (isUpdate && typeValue === undefined) {
      if (!this.getExistingPostType) {
        throw new BadRequestException('Field "typePost" is required');
      }

      if (!this.postId) {
        throw new BadRequestException('Post ID is required');
      }

      typeValue = await this.getExistingPostType(this.postId);

    }

    if (!typeValue) {
      throw new BadRequestException('Field "typePost" is required');
    }

    if (!dtoMap[typeValue]) {
        throw new BadRequestException(`Invalid "typePost": ${typeValue}`);
    }

    const instance = plainToInstance(dtoMap[typeValue], value);
    const errors = await validate(instance);

    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }
    
    return instance;
  }
}