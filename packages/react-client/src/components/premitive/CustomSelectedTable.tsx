import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PayPalCheckoutButton from "./PayPalCheckoutButton";
import { REACT_APP_PAYPAL_CLIENT_ID } from '../../config/config';
import {PaypalOptions} from "react-paypal-button";
import {OnApproveData, OnCancelData, OnCaptureData} from "react-paypal-button/bin/types/src/types";


interface Props{
    rows: any[],
    onApprove?: (data: OnApproveData, authId: string) => void;
    onPaymentStart?: () => void;
    onPaymentSuccess?: (response: OnCaptureData) => void;
    onPaymentError?: (msg: string) => void;
    onPaymentCancel?: (data: OnCancelData) => void;
}
const CustomSelectedTable: React.FC<Props>=(props: Props)=> {
    const {rows, onApprove, onPaymentStart, onPaymentSuccess, onPaymentError, onPaymentCancel}= props
    let {clientId=REACT_APP_PAYPAL_CLIENT_ID}= rows[0].partner
    const paypalOptions:PaypalOptions = {
        clientId: clientId,
        intent: 'capture'
    }

    let total= 0
    rows.map(cart=>{ total+=cart.price })
    return (
        <TableContainer component={Paper}>
            <Table size="medium" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        {/*<TableCell>Description</TableCell>*/}
                        <TableCell align="right">Price</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, i: number) => (
                        <TableRow key={i}>
                            <TableCell>{row.name}</TableCell>
                            {/*<TableCell>{row.description}</TableCell>*/}
                            <TableCell align="right">${row.price}</TableCell>
                        </TableRow>
                    ))}
                    <TableRow key='totalRow'>
                        <TableCell rowSpan={2}> </TableCell>
                        <TableCell align="right"><strong>Total: ${total}</strong></TableCell>
                    </TableRow>
                    <TableRow key='totalRowButton'>
                        <TableCell align="right">
                            <PayPalCheckoutButton
                                amount={total}
                                paypalOptions={paypalOptions}
                                onApprove={onApprove}
                                onPaymentStart={onPaymentStart}
                                onPaymentSuccess={onPaymentSuccess}
                                onPaymentError={onPaymentError}
                                onPaymentCancel={onPaymentCancel}
                            />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default CustomSelectedTable
