import { InputType, Field } from "type-graphql";
import { Length } from "class-validator";
import { ObjectId } from "mongodb";
import {Post} from "../models/Post";

@InputType()
export class PostInput implements Partial<Post> {
    @Field(()=> String)
    userId: ObjectId;

    @Field()
    title: string;

    @Field()
    postType: string;

    @Field()
    @Length(1, 255)
    description: string;

    @Field()
    videoUrl: string;

    @Field()
    published: boolean;


}
