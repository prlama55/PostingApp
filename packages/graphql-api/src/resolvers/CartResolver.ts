import {Resolver, Mutation, Arg, Query, FieldResolver, Root, UseMiddleware, Authorized} from "type-graphql";
import {Cart, CartModel} from "../models/Cart";
import {Partner, PartnerModel} from "../models/Partner";
import {Customer, CustomerModel} from "../models/Customer";
import {Product, ProductModel} from "../models/Product";
import {isAuth} from "../authorization/auth";

@Resolver(_of => Cart)
export class CartResolver {

    @UseMiddleware(isAuth)
    @Authorized("CustomerUser")
    @Query(_returns => Cart, { nullable: false})
    async cart(@Arg("id") id: string){
        return CartModel.findById({_id: id});
    };

    @UseMiddleware(isAuth)
    @Authorized("CustomerUser")
    @Query(() => [Cart])
    async carts(@Arg("customerId") customerId: string){
        return CartModel.find({customerId: customerId});
    };

    @UseMiddleware(isAuth)
    @Authorized("CustomerUser")
    @Mutation(() => Cart)
    async createCart(
        @Arg('partnerId') partnerId: string,
        @Arg('customerId') customerId: string,
        @Arg('productId') productId: string,
        @Arg('name') name: string,
        @Arg('price') price: number,
        @Arg('description') description: string
    ): Promise<Cart> {
        const cart = (await CartModel.create({
            partnerId,
            customerId,
            productId,
            name,
            price,
            description
        })).save();
        return cart;
    };

    @UseMiddleware(isAuth)
    @Authorized("CustomerUser")
    @Mutation(() => Boolean)
    async deleteCart(@Arg("id") id: string) {
        await CartModel.deleteOne({id});
        return true;
    }

    @FieldResolver()
    async partner(@Root() cart: Cart): Promise<Partner| null> {
        return (await PartnerModel.findById(cart._doc.partnerId))
    }

    @FieldResolver()
    async customer(@Root() cart: Cart): Promise<Customer| null> {
        return (await CustomerModel.findById(cart._doc.customerId))
    }

    @FieldResolver()
    async product(@Root() cart: Cart): Promise<Product| null> {
        return (await ProductModel.findById(cart._doc.productId))
    }

}
