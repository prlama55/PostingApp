import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import {CardActionArea, FormLabel, CardActions, CardContent, CardMedia, Typography, Button } from '@material-ui/core';
import {useCreateCartMutation} from "../../graphql";
import {AppCredential, getAppCredential} from "../../config/accessToken";
import AppAlert from "./AppAlert";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
    title:{
        fontSize:20
    },
    button:{
        float: 'right',
        justifyItems:'flex-end'
    }
});
interface Props{
    clientId?: string
    title: string
    description?: string
    price?: number
    imageUrl?: string
    product?: any
    checkout?: boolean
    isVideo?: boolean
}
interface MediaProps {
    url: string, title: string, isVideo:boolean
}
const RenderMedia:React.FC<MediaProps>=(props: MediaProps)=>{
    const classes = useStyles();
    const { url, title, isVideo}= props
    return isVideo?(
        <CardMedia
            className={classes.media}
            component='iframe'
            title={title}
            src={url}
        />
    ):(
        <CardMedia
            className={classes.media}
            image={url}
            title={title}
        />
    )
}
type MessageType= 'success' | 'error'
const AppCard:React.FC<Props>=(props: Props)=> {
    // @ts-ignore
    let userCredential:AppCredential= localStorage.getItem('user')?JSON.parse(localStorage.getItem('user').toString()): getAppCredential()
    const [cartMutation] = useCreateCartMutation()
    const classes = useStyles();
    const {title, description, price, imageUrl=`https://via.placeholder.com/345x140.png?text=`, checkout=false, isVideo=false, product}= props
    const [message, setMessage] = useState('')
    const [messageType, setMessageType] = useState<MessageType>('success')
    // const amount:number= price===undefined?0:price
    // const paypalOptions:PaypalOptions = {
    //     clientId: clientId,
    //     intent: 'capture'
    // }

    const addToCart=async (product: any)=>{
        console.log('product==addToCart====',product)
        const {data} = await cartMutation({
            variables:{
                partnerId: product.partner.id,
                customerId:userCredential.businessUserId,
                productId: product.id,
                name: product.name,
                price: product.price,
                description: product.description
            }
        })
        if(data) {
            setMessage('Added to cart')
        }
        else {
            setMessage('Something error. Please try again.')
            setMessageType('error')
        }
    }

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <RenderMedia url={imageUrl} title={title} isVideo={isVideo}/>
                <CardContent>
                    {message &&
                    <Typography gutterBottom variant="h5" component="h2">
                       <AppAlert message={message} alertType={messageType}/>
                    </Typography>}
                    <Typography gutterBottom variant="h5" component="h2">
                        <FormLabel component="legend"><span className={classes.title}>{title} </span></FormLabel>
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                {price &&
                <Button size="small" color="primary">
                    <strong>{'$'+price.toString()}</strong>
                </Button>}
                {checkout &&
                <Button size="small" color="primary" onClick={()=>addToCart(product)} style={{textDecoration: 'none'}}>
                    Add to cart
                </Button>
                    // <PayPalCheckoutButton key={product.id} product={product} paypalOptions={paypalOptions} amount={amount}/>
                }
            </CardActions>
        </Card>
    );
}

export default AppCard
