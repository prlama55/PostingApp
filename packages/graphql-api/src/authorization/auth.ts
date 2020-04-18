import { Request, Response } from 'express'
import { MiddlewareFn } from 'type-graphql'
import { AppContext } from '../types/AppContext'
import { sign, verify } from 'jsonwebtoken'
import {
  ACCESS_TOKEN_LIFETIME,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_LIFETIME,
} from '../config/config'
import { User, UserModel } from '../models/User'
import {PartnerModel} from "../models/Partner";
import {CustomerModel} from "../models/Customer";

export const isAuth: MiddlewareFn<AppContext> = ({ context }, next) => {
  const authorization = context.req.headers['authorization']

  if (!authorization) {
    throw new Error('Not authorized!')
  }

  try {
    const token = authorization.split(' ')[1]
    const payload = verify(token, ACCESS_TOKEN_SECRET!)
    context.payload = payload as any
  } catch (err) {
    throw new Error('Not authorized!')
  }

  return next()
}

export const createAccessToken = async (user: User) => {
  return sign({ userId: user.id }, ACCESS_TOKEN_SECRET!, {
    expiresIn: ACCESS_TOKEN_LIFETIME,
  })
}

export const createRefreshToken = async (user: User) => {
  return sign(
    { userId: user.id, tokenVersion: user.tokenVersion },
    REFRESH_TOKEN_SECRET!,
    {
      expiresIn: REFRESH_TOKEN_LIFETIME,
    }
  )
}

export const sendRefreshToken = (res: Response, refreshToken: string) => {
  res.cookie('jid', refreshToken, {
    httpOnly: true,
    path: '/refresh_token'
  })
}

export const getRefreshToken = async (req: Request | any, res: Response) => {
  const { jid } = req.cookies
  if (!jid) {
    res.send({
      success: false,
      email: '',
      accessToken: '',
      role: '',
      name: '',
      businessUserId: '',
      id: '',
    })
  }
  let payload: any
  try {
    payload = verify(jid, REFRESH_TOKEN_SECRET)
  } catch (error) {
    res.send({
      success: false,
      email: '',
      accessToken: '',
      role: '',
      name: '',
      businessUserId: '',
      id: '',
    })
  }
  const user = await UserModel.findById(payload.userId)
  if (!user) {
    res.send({
      success: false,
      email: '',
      accessToken: '',
      role: '',
      name: '',
      businessUserId: '',
      id: '',
    })
  }
  else if (user.tokenVersion !== payload.tokenVersion) {
    res.send({
      success: false,
      email: '',
      accessToken: '',
      role: '',
      name: '',
      businessUserId: '',
      id: '',
    })
  }else{
    const accessToken = await createAccessToken(user)
    const refreshToken = await createRefreshToken(user)
    let businessUserId: string= ''
    let hasBusiness: boolean= false
    sendRefreshToken(res, refreshToken)
    if(user.userType==='BusinessUser'){
      const partner= await PartnerModel.findOne({userId:user.id})
      if(partner) {
        hasBusiness= true
        businessUserId= partner.id
      }
    }else if(user.userType==='CustomerUser'){
      const customer= await CustomerModel.findOne({userId:user.id})
      if(customer) {
        hasBusiness= false
        businessUserId= customer.id
      }
    }

    res.send({
      success: true,
      email: user.email,
      accessToken: accessToken,
      role: user.userType?user.userType:'AdminUser',
      hasBusiness: hasBusiness,
      name: user.firstName,
      businessUserId: businessUserId,
      id: user.id,
    })
  }


}
