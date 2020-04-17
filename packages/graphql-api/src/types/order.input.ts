import { InputType, Field } from "type-graphql";
import { Length } from "class-validator";
import { ObjectId } from "mongodb";
import {Order} from "../models/Order";

@InputType()
export class OrderInput implements Partial<Order> {
    @Field(()=> String)
    partner_id: ObjectId;

    @Field(()=> String)
    product_id: ObjectId;

    @Field(()=> String)
    customer_id: ObjectId;

    @Field()
    name: string;

    @Field()
    price: number;

    @Field()
    @Length(1, 255)
    description: string;

}
