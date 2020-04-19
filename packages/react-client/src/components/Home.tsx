import React from 'react'
import {FormLabel, Grid, withStyles, WithStyles} from '@material-ui/core'
import {RouteComponentProps} from 'react-router-dom';
import {AppCredential, getAppCredential} from "../config/accessToken";
import {paypalConfigOption} from "../config/config";
import PayPalAuthButton from "./premitive/PayPalAuthButton";
import AppCard from "./premitive/AppCard";
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
// type Props= PayPalButtonProps & WithStyles & RouteComponentProps
type Props= WithStyles & RouteComponentProps
const Home: React.FC<Props> = (props: any) => {

    const { classes } = props
    // @ts-ignore
    let userCredential: AppCredential= localStorage.getItem('user')?JSON.parse(localStorage.getItem('user').toString()): getAppCredential()
    const hasBusiness=(userCredential.role==='BusinessUser' && !userCredential.hasBusiness)
    return (
        <div className={classes.app}>

            <Grid container spacing={8} alignItems="center">
                <Grid item xs>
                    {hasBusiness &&
                    <PayPalAuthButton {...paypalConfigOption}/>
                    }
                </Grid>
            </Grid>
            <Grid container spacing={8} alignItems="center" className={classes.postTitle}>
                <FormLabel component='h4'> Text & Videos Post </FormLabel>
            </Grid>
            <Grid container spacing={8} alignItems="center">
                <Grid item xs>
                    <AppCard title={'Name'} description={'hello sarkar'} price={100} checkout/>
                </Grid>
            </Grid>
        </div>
    )
}

export default withStyles(styles as any)(Home)
