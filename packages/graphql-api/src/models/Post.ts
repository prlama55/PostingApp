import {ObjectType, Field, ID} from "type-graphql";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import {User} from "./User";
import {Ref} from "../types";

@ObjectType({ description: "The Users model" })
export class Post {

    @Field(() => ID)
    id: number;

    @Field()
    @Property({ required: true })
    title: string;

    @Field()
    @Property({ required: true })
    postType: string;

    @Field()
    @Property({ required: true })
    description: string;

    @Field()
    @Property({ required: false })
    videoUrl: string;

    @Field()
    @Property({ required: true, default: false })
    published: boolean;

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
export const PostModel = getModelForClass(Post, { schemaOptions: { timestamps: true } });
