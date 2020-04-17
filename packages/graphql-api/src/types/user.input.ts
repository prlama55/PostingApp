import { InputType, Field } from "type-graphql";
import { IsEmail } from "class-validator";
import { User } from "../models/User";

@InputType()
export class UserInput implements Partial<User> {
    @Field()
    password: string;

    @Field()
    userType: string;

    @Field()
    @IsEmail()
    email: string;

    @Field()
    firstName: string;

    @Field()
    lastName: string;
}
