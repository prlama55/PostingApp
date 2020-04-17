import { Resolver, Mutation, Arg, Query,  FieldResolver, Root } from "type-graphql";
import {User, UserModel} from "../models/User";
import {Partner, PartnerModel} from "../models/Partner";

@Resolver(_of => Partner)
export class PartnerResolver {

    @Query(_returns => Partner, { nullable: false})
    async partner(@Arg("id") id: string){
        return PartnerModel.findById({_id: id});
    };

    @Query(() => [Partner])
    async partners(){
        return PartnerModel.find();
    };

    @Mutation(() => Partner)
    async createPartner(
        @Arg('userId') userId: string,
        @Arg('name') name: string,
        @Arg('emails') emails: string,
        @Arg('partnerId') partnerId: string,
        @Arg('payerId') payerId: string,
        @Arg('clientId') clientId: string,
        @Arg('verifiedAccount') verifiedAccount: string,
    ): Promise<Partner> {
        const partner = (await PartnerModel.create({
            userId,
            name,
            emails,
            partnerId,
            payerId,
            clientId,
            verifiedAccount
        })).save();
        return partner;
    };

    @Mutation(() => Boolean)
    async deletePartner(@Arg("id") id: string) {
        await PartnerModel.deleteOne({id});
        return true;
    }

    @FieldResolver()
    async user(@Root() partner: Partner): Promise<User | null> {
        return (await UserModel.findById(partner._doc.userId))
    }

}
