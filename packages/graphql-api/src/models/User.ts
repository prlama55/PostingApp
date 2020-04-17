import {ObjectType, Field, ID} from "type-graphql";
import {prop as Property, getModelForClass} from "@typegoose/typegoose";

@ObjectType({ description: "The Users model" })
export class User {

    @Field(() => ID)
    id: number;

    @Property({ required: true })
    password: string;

    @Property({ required: true })
    userType: string;

    @Field()
    @Property({ required: true })
    email: string;

    @Field()
    @Property({ required: true })
    firstName: string;

    @Field()
    @Property({ required: true })
    lastName: string;

    @Field()
    @Property({ required: true, default: Date.now() })
    createdAt: Date;

    @Field()
    @Property({ required: false})
    updatedAt: Date;

    @Field(()=>String)
    name: string
    _doc: any

    @Property({ required: false, default: 0 })
    tokenVersion: number;
}
export const UserModel = getModelForClass(User, { schemaOptions: { timestamps: true } });
