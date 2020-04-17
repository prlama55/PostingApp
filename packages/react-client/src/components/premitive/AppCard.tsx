import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PayPalCheckoutButton from "./PayPalCheckoutButton";
import {PaypalOptions} from "react-paypal-button";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});
interface Props {
    clientId: string
    title: string
    description?: string
    price?: number
    imageUrl?: string
    checkout?: boolean
    isVideo?: boolean
}

const renderMedia=(url: string, title: string, isVideo=false)=>{
    const classes = useStyles();
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
    const {clientId,title, description, price, imageUrl, checkout, isVideo}= props
    const amount:number= price==undefined?0:price
    const imgUrl=imageUrl?imageUrl:`https://via.placeholder.com/345x140.png?text=`

    const paypalOptions:PaypalOptions = {
        clientId: clientId,
        intent: 'capture'
    }


    return (
        <Card className={classes.root}>
            <CardActionArea>
                {renderMedia(imgUrl,title, isVideo)}
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {title}  <small>{price?price:''}</small>
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Share
                </Button>
                {checkout &&
                <PayPalCheckoutButton paypalOptions={paypalOptions} amount={amount}/>
                }
            </CardActions>
        </Card>
    );
}

export default AppCard
