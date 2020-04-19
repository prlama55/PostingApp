import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import {CardActionArea, FormLabel, CardActions, CardContent, CardMedia, Typography, Button } from '@material-ui/core';
import PayPalCheckoutButton from "./PayPalCheckoutButton";
import {PaypalOptions} from "react-paypal-button";
import {PAYPAL_CLIENT_ID} from "../../config/config";

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
interface Props {
    clientId?: string
    title: string
    description?: string
    price?: number
    imageUrl?: string
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

const AppCard:React.FC<Props>=(props: Props)=> {
    const classes = useStyles();
    const {clientId=PAYPAL_CLIENT_ID,title, description, price, imageUrl=`https://via.placeholder.com/345x140.png?text=`, checkout=false, isVideo=false}= props
    const amount:number= price===undefined?0:price

    const paypalOptions:PaypalOptions = {
        clientId: clientId,
        intent: 'capture'
    }

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <RenderMedia url={imageUrl} title={title} isVideo={isVideo}/>
                <CardContent>
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
                <PayPalCheckoutButton key={title.replace(' ','_')} paypalOptions={paypalOptions} amount={amount}/>
                }
            </CardActions>
        </Card>
    );
}

export default AppCard
