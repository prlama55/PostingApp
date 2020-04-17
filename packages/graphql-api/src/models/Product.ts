import {ObjectType, Field, ID} from "type-graphql";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import {Ref} from "../types";
import {Partner} from "./Partner";

@ObjectType({ description: "The Partner model" })
export class Product {

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
    _doc: any

    @Field(() => Partner)
    partner: Partner;
}
export const ProductModel = getModelForClass(Product, { schemaOptions: { timestamps: true } });
