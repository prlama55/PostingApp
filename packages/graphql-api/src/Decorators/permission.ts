import {AuthChecker} from "type-graphql";
import {AppContext} from "../types/AppContext";
import {verify} from "jsonwebtoken";
import {ACCESS_TOKEN_SECRET} from "../config/config";
import {UserModel} from "../models/User";

export const permissionChecker: AuthChecker<AppContext> = async ({ context }, roles) => {
    const authorization = context.req.headers['authorization']
    if (!authorization) {
        throw new Error('You are not authorized!')
    }

    try {
        const token = authorization.split(' ')[1]
        const payload:any = verify(token, ACCESS_TOKEN_SECRET!)
        const userId=payload.userId
        const user= await UserModel.findOne({_id: userId})
        if(user){
            if(roles.includes(user.userType)) return true;
            else throw new Error('You are not authorized!')
        }else{
            throw new Error('You are not authorized!')
        }
    } catch (err) {
        throw new Error('You are not authorized!')
    }
};
