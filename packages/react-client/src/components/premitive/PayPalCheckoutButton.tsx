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
        layout: 'vertical',
        shape: 'rect',
    }
    const onApprove=(data: OnApproveData, authId: string)=>{
        console.log(`${authId}=====`, data)
    }

    const onPaymentStart= () => {

    }
    const onPaymentSuccess= (_response: OnCaptureData) => {

    }
    const onPaymentError = (_msg: string) => {

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
