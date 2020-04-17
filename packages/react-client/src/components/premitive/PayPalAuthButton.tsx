import React, {Component} from 'react'
import {
    withStyles,
    WithStyles,
    Button,
} from '@material-ui/core'
const styles = (_theme: any) => ({
    button: {
        borderRadius: '50px'
    }
})

interface Props extends WithStyles{
    url: string
    client_id: string
    scope: string
    redirect_uri: string
    response_type: string
}
class PayPalAuthButton extends Component <Props> {

    getConnected=()=>{
        const {url, client_id, scope, redirect_uri, response_type}= this.props
        const payPalLoginUrl=`${url}?scope=${scope}&response_type=${response_type}&redirect_uri=${redirect_uri}&client_id=${client_id}`
        window.location.href=payPalLoginUrl
    }

    render(){
        const {classes}= this.props
        return (
            <Button
                onClick={this.getConnected}
                className={classes.button}

            >
                <img alt='Connect with PayPal' className={classes.img} src='https://www.paypalobjects.com/webstatic/en_US/developer/docs/login/connectwithpaypalbutton.png'/>
            </Button>
        )
    }
}

export default withStyles(styles as any)(PayPalAuthButton)
