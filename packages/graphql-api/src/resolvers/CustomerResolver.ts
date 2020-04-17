import { Resolver, Mutation, Arg, Query,  FieldResolver, Root } from "type-graphql";
import {User, UserModel} from "../models/User";
import {Customer, CustomerModel} from "../models/Customer";

@Resolver(_of => Customer)
export class CustomerResolver {

    @Query(_returns => Customer, { nullable: false})
    async customer(@Arg("id") id: string){
        return CustomerModel.findById({_id: id});
    };

    @Query(() => [Customer])
    async customers(){
        return CustomerModel.find();
    };

    @Mutation(() => Customer)
    async createCustomer(
        @Arg('userId') userId: string,
        @Arg('name') name: string,
        @Arg('emails') emails: string,
        @Arg('customerId') customerId: string,
        @Arg('payerId') payerId: string,
        @Arg('verifiedAccount') verifiedAccount: string,
    ): Promise<Customer> {
        const customer = (await CustomerModel.create({
            userId,
            name,
            emails,
            customerId,
            payerId,
            verifiedAccount
        })).save();
        return customer;
    };

    @Mutation(() => Boolean)
    async deleteCustomer(@Arg("id") id: string) {
        await CustomerModel.deleteOne({id});
        return true;
    }

    @FieldResolver()
    async user(@Root() customer: Customer): Promise<User | null> {
        return (await UserModel.findById(customer._doc.userId))
    }

}
