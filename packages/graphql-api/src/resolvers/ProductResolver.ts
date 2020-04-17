import {Resolver, Mutation, Arg, Query, FieldResolver, Root, UseMiddleware} from "type-graphql";
import {Product, ProductModel} from "../models/Product";
import {Partner, PartnerModel} from "../models/Partner";
import {isAuth} from "../authorization/auth";

@Resolver(_of => Product)
export class ProductResolver {

    @Query(_returns => Product, { nullable: false})
    @UseMiddleware(isAuth)
    async product(@Arg("id") id: string){
        return ProductModel.findById({_id: id});
    };

    @Query(() => [Product])
    @UseMiddleware(isAuth)
    async products(){
        return ProductModel.find();
    };

    @Mutation(() => Product)
    @UseMiddleware(isAuth)
    async createProduct(
        @Arg('partnerId') partnerId: string,
        @Arg('name') name: string,
        @Arg('price') price: number,
        @Arg('description') description: string
    ): Promise<Product> {
        const product = (await ProductModel.create({
            partnerId,
            name,
            price,
            description
        })).save();
        return product;
    };

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deleteProduct(@Arg("id") id: string) {
        await ProductModel.deleteOne({id});
        return true;
    }

    @FieldResolver()
    async partner(@Root() product: Product): Promise<Partner| null> {
        return (await PartnerModel.findById(product._doc.partnerId))
    }

}
