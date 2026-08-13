import { UserInterface } from '@project/shared-types';
import { Entity } from '@project/core';
import { genSalt, hash } from 'bcrypt';
import { SALT_ROUNDS } from './user.constant';

export class UserEntity implements UserInterface, Entity<string> {
  public id?: string;
  public email!: string;
  public name!: string;
  public password!: string;
  public avatar?: string;

  constructor(user: UserInterface) {
    this.populate(user);
  }

  public toPOJO() {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      password: this.password,
      avatar: this.avatar,
    };
  }

  public populate(user: UserInterface) {
    this.email = user.email;
    this.name = user.name;
    this.password = user.password;
    this.avatar = user.avatar;
  }

  public async setPassword(password: string) {
    const salt = await genSalt(SALT_ROUNDS);
    this.password = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string) {
    return await hash(password, this.password);
  }
}
