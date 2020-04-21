import React from "react";
import {useCartsQuery, useCreateOrderMutation, useRemoveCartsMutation} from "../../graphql";
import {Grid, Paper, WithStyles, withStyles} from "@material-ui/core";
import {AppCredential, getAppCredential} from "../../config/accessToken";
import {RouteComponentProps} from "react-router-dom";
import Loading from "../core/Loading";
import CustomSelectedTable from "../premitive/CustomSelectedTable";
import {OnApproveData, OnCancelData, OnCaptureData} from "react-paypal-button";

const styles = (theme: any) => ({
    app: {
        flexGrow: 1,
        itemAlign: 'center',
        background: 'whitesmoke',
        padding: '70px',
        height: '100vh',
    },
    margin: {
        margin: theme.spacing.unit * 2,
    },
    padding: {
        padding: theme.spacing.unit,
        width: '50%',
        margin: 'auto',
    },
    paper: {
        padding: theme.spacing.unit,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
    },
    headerTitle: {
        background: 'white',
        boxShadow:
            '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
        marginBottom: 10,
    },
})
type Props = RouteComponentProps & WithStyles
const MyCarts:React.FC<Props>=(props: Props)=>{
    // @ts-ignore
    const getToken:AppCredential= localStorage.getItem('user')?JSON.parse(localStorage.getItem('user').toString()):  getAppCredential()

    const [orderMutation] = useCreateOrderMutation()
    const [removeCartsMutation] = useRemoveCartsMutation()
    const {data, loading} = useCartsQuery({
        variables: {
            customerId: getToken.businessUserId
        },
        fetchPolicy: 'network-only',
    })

    const onApprove=(_data: OnApproveData, _authId: string)=>{

    }
    const onPaymentStart= () => {
        console.log("Payment started====")
    }
    const onPaymentSuccess= async (response: OnCaptureData) => {
        //@ts-ignore
        const user: AppCredential=localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):getAppCredential()
        let productIds: string[]=[]
        let ids: string[]=[]
        let price=0
        if(data){
            data.carts.map(cart=>{
                ids.push(cart.id)
                productIds.push(cart.product.id)
                price=price+cart.price
            })
        }

        const createdOrder=await orderMutation({
            variables:{
                productIds: productIds.join(','),
                customerId:user.businessUserId,
                name: `${response.payer.name.given_name} ${response.payer.name.surname}`,
                price: price,
                description:`Order ID: ${response.id} ${response.status} at ${response.create_time}`,
                partnerId:response.payer.payer_id,
            }
        })
        if(createdOrder.data){
           await removeCartsMutation({
                variables:{
                    ids: ids.join(',')
                }
            })
            props.history.push('/')
        }

    }
    const onPaymentError = (msg: string) => {
        alert(msg)
    }
    const onPaymentCancel=(_data: OnCancelData) =>{

    }

    const {classes}=props
    return data ? (
        <div className={classes.app}>
            <Grid container spacing={8}>
                <Grid item xs>
                    {loading && <Loading/>}
                    <Paper className={classes.padding}>
                        <div className={classes.margin}>
                            <Grid container spacing={8} alignItems="flex-end">
                                {(!loading && data.carts.length>0) &&
                                <CustomSelectedTable
                                    rows={data.carts}
                                    onApprove={onApprove}
                                    onPaymentStart={onPaymentStart}
                                    onPaymentSuccess={onPaymentSuccess}
                                    onPaymentError={onPaymentError}
                                    onPaymentCancel={onPaymentCancel}
                                />}
                            </Grid>
                            <Grid container spacing={8} alignItems="flex-end">
                                {(!loading && data.carts.length===0) && <Grid item style={{padding: 50}}>No data available.</Grid>}
                            </Grid>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    ):(<></>)
}

export default withStyles(styles as any)(MyCarts)
