export const {
    NODE_ENV='development',
    PAYPAL_CLIENT_ID='AToOrRCR3xwa1hs6T5MVv9m7Xi8XCKqvXVM8rVuP1GyUqlhEJ0XZZh6zCKo2pOlosTBV_HEaoj5yVm79',
    PAYPAL_SECRET='ECImpB7zi52-92bVl8Jy6MtNpG6W7M3eJKXddsc6UtC_Swh-QyMd4Yx4flXabwYz6z6mawliOk5tr3HE',
    REDIRECT_URL='http://127.0.0.1:3000/user/profile/',
    PAYPAL_AUTH_URL='https://www.sandbox.paypal.com/signin/authorize',
    PAYPAL_TOKEN_URL='https://api.sandbox.paypal.com/v1/oauth2/token',
    PAYPAL_USER_URL='https://api.sandbox.paypal.com/v1/identity/oauth2/userinfo?schema=paypalv1.1',
    PAYPAL_SCOPE='openid profile email address https://uri.paypal.com/services/paypalattributes',
    BASE_API='http://localhost:4000',
    REFRESH_TOKEN_LIFETIME='7d'
}= process.env

export const PAYPAL_CREDENTIAL=btoa(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`)
export const paypalConfigOption: any={
    url: PAYPAL_AUTH_URL,
    client_id: PAYPAL_CLIENT_ID,
    scope: PAYPAL_SCOPE,
    responseType: 'code',
    redirect_uri: REDIRECT_URL
}
