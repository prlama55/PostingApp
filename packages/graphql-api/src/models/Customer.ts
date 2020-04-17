import {ObjectType, Field, ID} from "type-graphql";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import {User} from "./User";
import {Ref} from "../types";

@ObjectType({ description: "The Partner model" })
export class Customer {

    @Field(() => ID)
    id: number;

    @Field()
    @Property({ required: true })
    name: string;

    @Field()
    @Property({ required: true })
    emails: string;

    @Field()
    @Property({ required: true })
    customerId: string;  // paypal user_id

    @Field()
    @Property({ required: false })
    payerId: string;

    @Field()
    @Property({ required: false })
    verifiedAccount: string;

    @Field()
    @Property({ required: true, default: Date.now() })
    createdAt: Date;

    @Field()
    @Property({ required: false})
    updatedAt: Date;

    @Field(_type => String)
    @Property({ref: User})
    userId: Ref<User>
    _doc: any

    @Field(() => User)
    user: User;
}
export const CustomerModel = getModelForClass(Customer, { schemaOptions: { timestamps: true } });
