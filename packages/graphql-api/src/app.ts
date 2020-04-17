import { Application, Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import {MONGO_URL} from "./config/config";
import { buildSchema} from "type-graphql";
import {UserResolver} from "./resolvers/UserResolver";
import {PostResolver} from "./resolvers/PostResolver";
import {LoginResolver} from "./resolvers/LoginResolver";
import {ApolloServer} from "apollo-server-express";
import cookieParser from "cookie-parser";
import {getRefreshToken} from "./authorization/auth";
import {PartnerResolver} from "./resolvers/PartnerResolver";
import {CustomerResolver} from "./resolvers/CustomerResolver";
import {ProductResolver} from "./resolvers/ProductResolver";
import {OrderResolver} from "./resolvers/OrderResolver";
class App {
  public app: Application

  constructor(expressApp: Application) {
    this.app = expressApp
    this.setConfig()
    this.setMongoConfig()
    this.routes()
  }
  private setMongoConfig() {
    mongoose.Promise = global.Promise
    mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(() => console.log)
  }

  private setConfig() {
    this.app.disable('x-powered-by')
    // @ts-ignore
    this.app.use(cookieParser());
    // @ts-ignore
    this.app.use(cors({
      credentials: true,
      origin: ["http://localhost:3000", "http://127.0.0.1:3000"]
    }))
    this.app.use(bodyParser.json({ limit: '50mb' }))
    this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
  }

  public async mainApolloServer (){
    const schema = await buildSchema({
      resolvers: [
        UserResolver,
        PostResolver,
        LoginResolver,
        PartnerResolver,
        CustomerResolver,
        ProductResolver,
        OrderResolver
      ],
      emitSchemaFile: true,
      validate: false
    });
    const apolloServer = new ApolloServer({
      schema,
      context: ({req, res}) => ({ req, res }),
      playground: true
    });
    return apolloServer
  }

  private routes(){
    this.app.get('/',(_req: Request, res: Response)=>{
      res.send("Welcome")
    })

    this.app.post('/refresh_token',getRefreshToken)
  }
}

export default App
