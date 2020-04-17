import {ObjectType, Field, ID} from "type-graphql";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import {User} from "./User";
import {Ref} from "../types";

@ObjectType({ description: "The Partner model" })
export class Partner {

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
    partnerId: string;

    @Field()
    @Property({ required: false })
    payerId: string;

    @Field()
    @Property({ required: false })
    clientId: string;

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
export const PartnerModel = getModelForClass(Partner, { schemaOptions: { timestamps: true } });
