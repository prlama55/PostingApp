import {ObjectType, Field, ID} from "type-graphql";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import {Ref} from "../types";
import {Customer} from "./Customer";
import {Product} from "./Product";

@ObjectType({ description: "The Partner model" })
export class Order {

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

    @Field()
    @Property({ required: false })
    payerId: string;

    @Field(_type => String)
    @Property({ref: Customer})
    customerId: Ref<Customer>

    @Field(() => Customer)
    customer: Customer;

    @Field(_type => [String])
    @Property({ref: Product})
    productIds: Ref<Product>[]

    @Field(() => [Product])
    products: Product[];

    _doc: any
}
export const OrderModel = getModelForClass(Order, { schemaOptions: { timestamps: true } });
