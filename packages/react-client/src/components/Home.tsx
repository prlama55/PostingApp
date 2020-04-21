import React from 'react'
import {FormLabel, Grid, withStyles, WithStyles} from '@material-ui/core'
import {RouteComponentProps} from 'react-router-dom';
import {AppCredential, getAppCredential} from "../config/accessToken";
import {paypalConfigOption} from "../config/config";
import PayPalAuthButton from "./premitive/PayPalAuthButton";
import AppCard from "./premitive/AppCard";
import {usePostsQuery, useProductsQuery} from "../graphql";
import Loading from "./core/Loading";
const styles = () => ({
    app: {
        flexGrow: 1,
        itemAlign: 'center',
        background: 'whitesmoke',
        padding: '70px',
        height: '100vh',
    },
    postTitle:{
        borderBottom: '1px solid #c2c2c2',
        marginBottom:' 10px',
        fontWeight: 'bold'
    }
})
type Props= WithStyles & RouteComponentProps
const Home: React.FC<Props> = (props: any) => {
    // @ts-ignore
    let userCredential: AppCredential= localStorage.getItem('user')?JSON.parse(localStorage.getItem('user').toString()): getAppCredential()

    const { classes } = props
    const postQuery: any = usePostsQuery({
        fetchPolicy: 'network-only',
    })
    const productQuery: any = useProductsQuery({
        fetchPolicy: 'network-only',
    })

    let products:any=[]
    let posts:any=[]
    let loading=false
    if(postQuery.data) {
        posts= postQuery.data.posts
        loading= postQuery.loading
    }
    if(productQuery.data) {
        products= productQuery.data.products
        loading= productQuery.loading
    }

    const hasBusiness=(userCredential.role==='BusinessUser' && !userCredential.hasBusiness)
    return (
        <div className={classes.app}>
            {loading && <Loading/>}
            <Grid container spacing={8} alignItems="center">
                <Grid item xs>
                    {hasBusiness &&
                    <PayPalAuthButton {...paypalConfigOption}/>
                    }
                </Grid>
            </Grid>
            {(!loading && products.length>0) &&
            <>
                <Grid container spacing={8} alignItems="center" className={classes.postTitle}>
                    <FormLabel component='h4'> Products </FormLabel>
                </Grid>
                <Grid container spacing={8} alignItems="center">
                    {!loading && products.map((product: any) => {
                        return (
                            < Grid item xs={3} key={product.id}>
                                <AppCard product={product} key={product.id} title={product.name} price={product.price} description={product.description} checkout/>
                            </Grid>
                        )
                    })
                    }
                </Grid>
            </>
            }
            {(!loading && posts.length>0) &&
            <>
                <Grid container spacing={8} alignItems="center" className={classes.postTitle}>
                    <FormLabel component='h4'> Text & Videos Post </FormLabel>
                </Grid>
                <Grid container spacing={8} alignItems="center">
                    {posts.map((post: any) => {
                        return (
                            < Grid item xs={3} key={post.id}>
                                {post.postType==='video' && <AppCard key={post.id} imageUrl={post.videoUrl} title={post.title} isVideo description={post.description}/>}
                                {post.postType!=='video' && <AppCard key={post.id} imageUrl={post.videoUrl} title={post.title} description={post.description}/>}
                            </Grid>
                        )
                    })
                    }
                </Grid>
            </>
            }
        </div>
    )
}

export default withStyles(styles as any)(Home)
