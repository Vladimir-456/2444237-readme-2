import { Expose } from "class-transformer";

export class UpdateAvatarRdo {
    @Expose()
    id: string;
    @Expose()
    email: string;
    @Expose()
    name: string;
    @Expose()
    avatar: string;
    @Expose()
    createdAt: string;
    @Expose()
    updatedAt: string;
}