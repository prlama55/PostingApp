import {
    ButtonStylingOptions, OnApproveData,
    OnCancelData,
    OnCaptureData,
    PayPalButton,
    PayPalButtonProps,
    PaypalOptions
} from 'react-paypal-button'
import React from "react";
// import {RouteComponentProps} from 'react-router-dom';
interface CheckOutProps extends PayPalButtonProps{
    amount: number
    paypalOptions:PaypalOptions,
    onApprove?: (data: OnApproveData, authId: string) => void;
    onPaymentStart?: () => void;
    onPaymentSuccess?: (response: OnCaptureData) => void;
    onPaymentError?: (msg: string) => void;
    onPaymentCancel?: (data: OnCancelData) => void;
}

type Props = CheckOutProps
const PayPalCheckoutButton:React.FC<Props>=(props: Props)=>{
    const { amount, paypalOptions, onApprove, onPaymentStart, onPaymentSuccess, onPaymentError, onPaymentCancel}= props

    const buttonStyles: ButtonStylingOptions = {
        layout: 'horizontal',
        shape: 'rect',
        label: 'pay'
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
