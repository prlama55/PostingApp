import { InputType, Field } from "type-graphql";
import { ObjectId } from "mongodb";
import {Partner} from "../models/Partner";

@InputType()
export class PartnerInput implements Partial<Partner> {
    @Field(()=> String)
    user_id: ObjectId;

    @Field()
    name: string;

    @Field()
    emails: string;

    @Field()
    partnerId: string;

    @Field()
    payerId: string;

    @Field()
    clientId: string;

    @Field()
    verified_account: string;

}
