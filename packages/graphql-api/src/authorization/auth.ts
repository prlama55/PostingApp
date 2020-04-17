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
    console.log(err)
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
      id: '',
    })
  }
  const user = (await UserModel.findById(payload.userId)) as User
  if (user.tokenVersion !== payload.tokenVersion) {
    res.send({
      success: false,
      email: '',
      accessToken: '',
      role: '',
      name: '',
      id: '',
    })
  }
  if (!user) {
    res.send({
      success: false,
      email: '',
      accessToken: '',
      role: '',
      name: '',
      id: '',
    })
  }
  const accessToken = await createAccessToken(user)
  const refreshToken = await createRefreshToken(user)
  sendRefreshToken(res, refreshToken)
  res.send({
    success: true,
    email: user.email,
    accessToken: accessToken,
    role: 'Admin',
    name: user.firstName,
    id: user.id,
  })
}
