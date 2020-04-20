import { InputType, Field } from "type-graphql";
import { Length } from "class-validator";
import { ObjectId } from "mongodb";
import {Cart} from "../models/Cart";

@InputType()
export class CartInput implements Partial<Cart> {
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
