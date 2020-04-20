import {Resolver, Mutation, Arg, Query, FieldResolver, Root, UseMiddleware, Authorized} from "type-graphql";
import {Post, PostModel} from "../models/Post";
import {User, UserModel} from "../models/User";
import {isAuth} from "../authorization/auth";

@Resolver(_of => Post)
export class PostResolver {

    @UseMiddleware(isAuth)
    @Query(_returns => Post, { nullable: false})
    async post(@Arg("id") id: string){
        return PostModel.findById({_id: id});
    };

    @UseMiddleware(isAuth)
    @Query(() => [Post])
    async posts(){
        return PostModel.find();
    };

    @UseMiddleware(isAuth)
    @Mutation(() => Post)
    @Authorized("AdminUser","BusinessUser")
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

    @UseMiddleware(isAuth)
    @Mutation(() => Boolean)
    @Authorized("AdminUser","BusinessUser")
    async deletePost(@Arg("id") id: string) {
        await PostModel.deleteOne({id});
        return true;
    }

    @FieldResolver()
    async user(@Root() post: Post): Promise<User | null> {
        return (await UserModel.findById(post._doc.userId))
    }

}
