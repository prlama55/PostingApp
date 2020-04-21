import {Resolver, Mutation, Arg, Query, FieldResolver, Root, UseMiddleware} from "type-graphql";
import {Order, OrderModel} from "../models/Order";
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
    async orders(@Arg('partnerId') partnerId: string){
        const products= await ProductModel.find({partnerId: partnerId})
        const orders= await OrderModel.find()
        const orderList= orders.filter(order=>{
            return order.productIds.filter(id=>{
                return products.filter(product=>{
                    return id===product.id.toString()
                })
            })
        })
        return orderList
    };

    @UseMiddleware(isAuth)
    @Mutation(() => Order)
    async createOrder(
        @Arg('payerId') payerId: string,
        @Arg('customerId') customerId: string,
        @Arg('productIds') productIds: string,
        @Arg('name') name: string,
        @Arg('price') price: number,
        @Arg('description') description: string
    ): Promise<Order> {
        const ids=productIds.split(',')
        const Order = (await OrderModel.create({
            payerId,
            customerId,
            productIds: ids,
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
    async customer(@Root() order: Order): Promise<Customer| null> {
        return (await CustomerModel.findById(order._doc.customerId))
    }

    @FieldResolver()
    async products(@Root() order: Order): Promise<Product[]> {
        return (await ProductModel.find({
            _id: { $in:order._doc.productIds}
        }))
    }

}
