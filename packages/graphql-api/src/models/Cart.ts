import {ObjectType, Field, ID} from "type-graphql";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import {Ref} from "../types";
import {Partner} from "./Partner";
import {Customer} from "./Customer";
import {Product} from "./Product";

@ObjectType({ description: "The Cart model" })
export class Cart {

    @Field(() => ID)
    id: number;

    @Field()
    @Property({ required: true })
    name: string;

    @Field()
    @Property({ required: true })
    price: number;

    @Field()
    @Property({ required: false })
    description: string;

    @Field()
    @Property({ required: true, default: Date.now() })
    createdAt: Date;

    @Field()
    @Property({ required: false})
    updatedAt: Date;

    @Field(_type => String)
    @Property({ref: Partner})
    partnerId: Ref<Partner>

    @Field(() => Partner)
    partner: Partner;

    @Field(_type => String)
    @Property({ref: Customer})
    customerId: Ref<Customer>

    @Field(() => Customer)
    customer: Customer;

    @Field(_type => String)
    @Property({ref: Product})
    productId: Ref<Product>

    @Field(() => Product)
    product: Product;

    _doc: any
}
export const CartModel = getModelForClass(Cart, { schemaOptions: { timestamps: true } });
