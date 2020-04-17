import { Resolver, Mutation, Arg, Query,  FieldResolver, Root } from "type-graphql";
import {Post, PostModel} from "../models/Post";
import {User, UserModel} from "../models/User";

@Resolver(_of => Post)
export class PostResolver {

    @Query(_returns => Post, { nullable: false})
    async post(@Arg("id") id: string){
        return PostModel.findById({_id: id});
    };

    @Query(() => [Post])
    async posts(){
        return PostModel.find();
    };

    @Mutation(() => Post)
    async createPost(
        @Arg('userId') userId: string,
        @Arg('postType') postType: string,
        @Arg('title') title: string,
        @Arg('description') description: string,
        @Arg('videoUrl') videoUrl: string,
    ): Promise<Post> {
        const product = (await PostModel.create({
            userId,
            postType,
            title,
            description,
            videoUrl
        })).save();
        return product;
    };

    @Mutation(() => Boolean)
    async deletePost(@Arg("id") id: string) {
        await PostModel.deleteOne({id});
        return true;
    }

    @FieldResolver()
    async user(@Root() post: Post): Promise<User | null> {
        return (await UserModel.findById(post._doc.userId))
    }

}
