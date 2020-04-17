import {Resolver, Mutation, Arg, Query, FieldResolver, Root, UseMiddleware} from "type-graphql";
import {Order, OrderModel} from "../models/Order";
import {Partner, PartnerModel} from "../models/Partner";
import {Customer, CustomerModel} from "../models/Customer";
import {Product, ProductModel} from "../models/Product";
import {isAuth} from "../authorization/auth";

@Resolver(_of => Order)
export class OrderResolver {

    @UseMiddleware(isAuth)
    @Query(_returns => Order, { nullable: false})
    async order(@Arg("id") id: string){
        return OrderModel.findById({_id: id});
    };

    @UseMiddleware(isAuth)
    @Query(() => [Order])
    async orders(){
        return OrderModel.find();
    };

    @UseMiddleware(isAuth)
    @Mutation(() => Order)
    async createOrder(
        @Arg('partnerId') partnerId: string,
        @Arg('customerId') customerId: string,
        @Arg('productId') productId: string,
        @Arg('name') name: string,
        @Arg('price') price: number,
        @Arg('description') description: string
    ): Promise<Order> {
        const Order = (await OrderModel.create({
            partnerId,
            customerId,
            productId,
            name,
            price,
            description
        })).save();
        return Order;
    };

    @UseMiddleware(isAuth)
    @Mutation(() => Boolean)
    async deleteOrder(@Arg("id") id: string) {
        await OrderModel.deleteOne({id});
        return true;
    }

    @FieldResolver()
    async partner(@Root() order: Order): Promise<Partner| null> {
        return (await PartnerModel.findById(order._doc.partnerId))
    }

    @FieldResolver()
    async customer(@Root() order: Order): Promise<Customer| null> {
        return (await CustomerModel.findById(order._doc.customerId))
    }

    @FieldResolver()
    async product(@Root() order: Order): Promise<Product| null> {
        return (await ProductModel.findById(order._doc.productId))
    }

}
