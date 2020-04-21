import {Resolver, Mutation, Arg, Query, FieldResolver, Root, UseMiddleware, Authorized} from "type-graphql";
import { User, UserModel } from "../models/User";
import { hash } from 'bcryptjs'
import {isAuth} from "../authorization/auth";
import {CustomerModel} from "../models/Customer";
@Resolver(_of => User)
export class UserResolver {

    @Query(_returns => User, { nullable: false})
    @UseMiddleware(isAuth)
    async user(@Arg("id") id: string){
        return UserModel.findById({_id: id});
    };

    @Query(() => [User])
    @UseMiddleware(isAuth)
    @Authorized("AdminUser")
    async users(){
        return UserModel.find();
    };

    @FieldResolver()
    async name(@Root() parent: User){
        return `${parent._doc.firstName} ${parent._doc.lastName}`
    }

    @Mutation(()=> Boolean)
    async revokeRefreshToken(@Arg('userId') userId: string){
        await UserModel.findByIdAndUpdate(userId, {$inc: {tokenVersion:1}},{new: true})
        return true
    }

    @Mutation(() => Boolean)
    async register(
        @Arg("email") email: string,
        @Arg("password") password: string,
        @Arg("firstName") firstName: string,
        @Arg("lastName") lastName: string,
        @Arg("userType") userType: string
    ) {
        const hashPass= await hash(password,12)
        const user:any = await (await UserModel.create({
            email,
            firstName,
            lastName,
            userType,
            password: hashPass
        })).save();
        if(userType==='CustomerUser'){
            (await CustomerModel.create({
                userId: user.id,
                verifiedAccount: 'false',
                customerId: user.id,
                payerId: user.id,
                name: `${firstName} ${lastName}`,
                emails: `${email}`
            })).save();
        }
        return user? true: false;
    };

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deleteUser(@Arg("id") id: string) {
        await UserModel.deleteOne({id});
        return true;
    }


}
