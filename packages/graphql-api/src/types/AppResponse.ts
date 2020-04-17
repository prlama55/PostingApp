import {Field, ObjectType} from "type-graphql";

@ObjectType()
export class LoginResponse {
    @Field()
    id: string

    @Field()
    email: string

    @Field()
    role: string

    @Field()
    accessToken: string

    @Field()
    name: string

    @Field()
    hasBusiness: boolean
}
