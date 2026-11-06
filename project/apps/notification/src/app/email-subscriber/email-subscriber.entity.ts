import { Entity } from "@project/core";
import { Subscriber } from "@project/shared-types";

export class EmailSubscriberEntity implements Subscriber, Entity<string, Subscriber> {
    public email: string;
    public name: string;
    public id: string;
    public authorId: string;

    public toPOJO() {
        return {
            id: this.id,
            email: this.email,
            name: this.name,
            authorId: this.authorId
        }
    }

  public populate(data: Subscriber): EmailSubscriberEntity {
    if (!data.id) {
        throw new Error('Subscriber id is required');
    }
    this.id = data.id;
    this.email = data.email;
    this.name = data.name;
    this.authorId = data.authorId

    return this;
  }

  static fromObject (data: Subscriber) {
    return new EmailSubscriberEntity().populate(data)
  }
}