import {ObjectType, Field, ID} from "type-graphql";
import {prop as Property, getModelForClass} from "@typegoose/typegoose";

@ObjectType({ description: "The Users model" })
export class Payment {

    @Field(() => ID)
    id: number;

    @Field(()=> Array)
    @Property({ default: [] })
    user: Array<any>

    @Field(()=> Array)
    @Property({ default: [] })
    data: Array<any>

    @Field(()=> Array)
    @Property({ default: [] })
    product: Array<any>
}
export const UserModel = getModelForClass(Payment, { schemaOptions: { timestamps: true } });
