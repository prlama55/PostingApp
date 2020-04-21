import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import {CardActionArea, FormLabel, CardActions, CardContent, CardMedia, Typography, Button } from '@material-ui/core';
import {useCreateCartMutation} from "../../graphql";
import {AppCredential, getAppCredential} from "../../config/accessToken";
import AppAlert from "./AppAlert";
import ReactPlayer from 'react-player'

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
    },
    playerWrapper: {
        position: 'relative',
        paddingTop: '56.25% '
    },
    reactPlayer: {
        position: 'absolute',
        top: 0,
        left: 0
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

function getExtension(filename: string) {
    let parts = filename.split('.');
    return parts[parts.length - 1];
}

const isVideoFile=(ext: string)=>{
    switch (ext.toLowerCase()) {
        case 'm4v':
        case 'avi':
        case 'mpg':
        case 'mp4':
        case 'ogg':
        case 'webm':
            return true;
    }
    return false;
}

const RenderMedia:React.FC<MediaProps>=(props: MediaProps)=>{
    const classes = useStyles();
    const { url, title, isVideo}= props
    const [playing, setPlaying]= useState(false)
    let ext = getExtension(url);
    const isFile=isVideoFile(ext)
    return isVideo?(
        <div className='playerWrapper'>
            {isFile && <ReactPlayer
                controls
                playing={playing}
                onClick={()=>setPlaying(!playing)}
                className='reactPlayer'
                url={[ {src: url, type: `video/${ext}`}]}
                width='100%'
                height='100%'
            />}
            {!isFile && <ReactPlayer
                className='reactPlayer'
                url={url}
                width='100%'
                height='100%'
            />}
        </div>
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
                <Button size="small" variant='outlined' color="primary" style={{textTransform: 'none'}}>
                    {'Price: $'+price.toString()}
                </Button>}
                {(checkout && userCredential.role==='CustomerUser') &&
                <Button size="small" variant='outlined' color="primary" onClick={()=>addToCart(product)} style={{textTransform: 'none'}}>
                    Add to cart
                </Button>
                }
            </CardActions>
        </Card>
    );
}

export default AppCard
