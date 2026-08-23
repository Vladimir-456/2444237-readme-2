import { UserInterface } from '@project/shared-types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'users',
  timestamps: true,
})
export class UserModel extends Document implements UserInterface {
  @Prop({
    required: true,
  })
  public email: string;
  @Prop({
    required: true,
  })
  public password: string;
  @Prop({
    required: true,
  })
  public name: string;
  @Prop({
    required: false,
  })
  public avatar: string;
}

export type UserDocument = HydratedDocument<UserModel>;

export const UserSchema = SchemaFactory.createForClass(UserModel);
