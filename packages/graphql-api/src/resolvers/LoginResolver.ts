import { Resolver, Mutation, Arg, Ctx } from 'type-graphql'
import { User, UserModel } from '../models/User'
import { compare } from 'bcryptjs'
import { LoginResponse } from '../types/AppResponse'
import { AppContext } from '../types/AppContext'
import {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
} from '../authorization/auth'
@Resolver(_of => User)
export class LoginResolver {
  @Mutation(() => LoginResponse, { nullable: true })
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { res }: AppContext
  ): Promise<LoginResponse> {
    const user = await UserModel.findOne({ email })
    if (!user) {
      throw new Error('Could not find user!')
    }

    const validPassword = await compare(password, user.password)
    if (!validPassword) {
      throw new Error('Invalid password!')
    }
    const refreshToken = await createRefreshToken(user)
    const accessToken = await createAccessToken(user)
    sendRefreshToken(res, refreshToken)
    return {
      email: user.email,
      accessToken: accessToken,
      role: 'Admin',
      name: user.firstName,
      id: user.id,
    }
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { res }: AppContext) {
    sendRefreshToken(res, '')

    return true
  }
}
