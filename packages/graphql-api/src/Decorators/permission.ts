import {AuthChecker} from "type-graphql";
import {AppContext} from "../types/AppContext";
import {verify} from "jsonwebtoken";
import {ACCESS_TOKEN_SECRET} from "../config/config";
import {UserModel} from "../models/User";

export const permissionChecker: AuthChecker<AppContext> = async ({ context }, roles) => {
    // here we can read the user from context
    // and check his permission in the db against the `roles` argument
    // that comes from the `@Authorized` decorator, eg. ["ADMIN", "MODERATOR"]
    const authorization = context.req.headers['authorization']

    if (!authorization) {
        throw new Error('Not authorized!')
    }

    try {
        const token = authorization.split(' ')[1]
        const payload:any = verify(token, ACCESS_TOKEN_SECRET!)
        const userId=payload.userId
        const user= await UserModel.findOne({_id: userId})
        if(user){
            console.log("roles.includes(user.userType)======",roles.includes(user.userType))
            if(roles.includes(user.userType)) return true;
        }else{
            throw new Error('Not authorized!')
        }
    } catch (err) {
        throw new Error('Not authorized!')
    }
    console.log("roles=====",roles)
    return true; // or false if access is denied
};
