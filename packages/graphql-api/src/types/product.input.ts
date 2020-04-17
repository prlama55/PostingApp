import { InputType, Field } from "type-graphql";
import { Length } from "class-validator";
import { ObjectId } from "mongodb";
import {Product} from "../models/Product";

@InputType()
export class ProductInput implements Partial<Product> {
    @Field(()=> String)
    partner_id: ObjectId;

    @Field()
    name: string;

    @Field()
    price: number;

    @Field()
    @Length(1, 255)
    description: string;

}
