import {
    ButtonStylingOptions, OnApproveData,
    OnCancelData,
    OnCaptureData,
    PayPalButton,
    PayPalButtonProps,
    PaypalOptions
} from 'react-paypal-button'
import React from "react";

interface Props extends PayPalButtonProps{
    amount: number
    paypalOptions:PaypalOptions
}
const PayPalCheckoutButton:React.FC<Props>=(props: Props)=>{
    const { amount, paypalOptions}= props

    const buttonStyles: ButtonStylingOptions = {
        layout: 'horizontal',
        shape: 'rect',
        label: 'pay'
    }
    const onApprove=(_data: OnApproveData, _authId: string)=>{

    }

    const onPaymentStart= () => {
        console.log("Payment started====")
    }
    const onPaymentSuccess= (_response: OnCaptureData) => {
        // @ts-ignore
        // const user: AppCredential=localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):getAppCredential()
        // const {create_time, status} = response
        // console.log("onPaymentSuccess====", _response)
        // products.map(async (product)=>{
        //     await orderMutation({
        //         variables:{
        //             productId: product.id,
        //             customerId:user.businessUserId,
        //             name: product.name,
        //             price: product.price,
        //             description:`Payment ${status} at ${create_time}`,
        //             partnerId:product.partner.id,
        //         }
        //     })
        // })
    }
    const onPaymentError = (msg: string) => {
        alert(msg)
    }
    const onPaymentCancel=(_data: OnCancelData) =>{

    }

    return (
        <PayPalButton
            paypalOptions={paypalOptions}
            buttonStyles={buttonStyles}
            onApprove={onApprove}
            onPaymentStart={onPaymentStart}
            onPaymentSuccess={onPaymentSuccess}
            onPaymentError={onPaymentError}
            onPaymentCancel={onPaymentCancel}
            amount={amount}
        />
    )
}

export default PayPalCheckoutButton
