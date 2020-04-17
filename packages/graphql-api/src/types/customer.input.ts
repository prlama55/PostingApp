import { InputType, Field } from "type-graphql";
import { ObjectId } from "mongodb";
import {Customer} from "../models/Customer";

@InputType()
export class CustomerInput implements Partial<Customer> {
    @Field(()=> String)
    user_id: ObjectId;

    @Field()
    name: string;

    @Field()
    emails: string;

    @Field()
    partner_id: string;

    @Field()
    payer_id: string;

    @Field()
    verified_account: string;

    @Field()
    published: boolean;


}
