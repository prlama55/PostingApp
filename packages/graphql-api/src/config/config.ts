import 'dotenv/config'
export const {
    NODE_ENV='development',
    APP_PORT=4000,
    DB_NAME='posting',
    DB_HOST='localhost',
    DB_POST=27017,
    ACCESS_TOKEN_SECRET='Nepal123',
    REFRESH_TOKEN_SECRET='RNepal123',
    ACCESS_TOKEN_LIFETIME='15m',
    REFRESH_TOKEN_LIFETIME='7d'
}= process.env
export const MONGO_URL = `mongodb://${DB_HOST}:${DB_POST}/${DB_NAME}`
export const IS_PROD = NODE_ENV==='production'
