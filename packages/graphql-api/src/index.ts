import express from 'express'
import App from './app'
import { APP_PORT } from './config/config';
const app=express()
const expressApp = new App(app)
expressApp.mainApolloServer()
    .then((server)=>{
        // @ts-ignore
        server.applyMiddleware({app, cors:false});
        app.listen({ port: APP_PORT }, () =>
            console.log(`Server ready at ==> http://localhost:${APP_PORT}${server.graphqlPath}`))
    })
    .catch((error)=>{
        console.log(error, 'error');
    })
console.log("module.hot=====",module.hot)
// Hot Module Replacement
if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => console.log('Module disposed. '));
}
