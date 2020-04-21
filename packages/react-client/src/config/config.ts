export const {
    REACT_APP_PAYPAL_CLIENT_ID='AToOrRCR3xwa1hs6T5MVv9m7Xi8XCKqvXVM8rVuP1GyUqlhEJ0XZZh6zCKo2pOlosTBV_HEaoj5yVm79',
    REACT_APP_PAYPAL_SECRET='ECImpB7zi52-92bVl8Jy6MtNpG6W7M3eJKXddsc6UtC_Swh-QyMd4Yx4flXabwYz6z6mawliOk5tr3HE',
    REACT_APP_REDIRECT_URL='http://localhost:3000/user/profile/',
    REACT_APP_PAYPAL_AUTH_URL='https://www.sandbox.paypal.com/signin/authorize',
    REACT_APP_PAYPAL_TOKEN_URL='https://api.sandbox.paypal.com/v1/oauth2/token',
    REACT_APP_PAYPAL_USER_URL='https://api.sandbox.paypal.com/v1/identity/oauth2/userinfo?schema=paypalv1.1',
    REACT_APP_PAYPAL_SCOPE='openid profile email address https://uri.paypal.com/services/paypalattributes',
    REACT_APP_BASE_API='http://127.0.0.1:4000',
    REACT_APP_REFRESH_TOKEN_LIFETIME='7d'
}= process.env

export const REACT_APP_PAYPAL_CREDENTIAL=btoa(`${REACT_APP_PAYPAL_CLIENT_ID}:${REACT_APP_PAYPAL_SECRET}`)
export const paypalConfigOption: any={
    url: REACT_APP_PAYPAL_AUTH_URL,
    client_id: REACT_APP_PAYPAL_CLIENT_ID,
    scope: REACT_APP_PAYPAL_SCOPE,
    responseType: 'code',
    redirect_uri: REACT_APP_REDIRECT_URL
}
