import React, {Component} from 'react'
import { Grid, withStyles, WithStyles } from '@material-ui/core'
import AppAlert from "./AppAlert";
import {RouteComponentProps} from "react-router-dom";
import * as queryString from "query-string";
const styles = () => ({
    app: {
        flexGrow: 1,
        itemAlign: 'center',
        background: 'whitesmoke',
        padding: '70px',
        height: '100vh',
    },
    error:{
        color: 'red'
    }
})

type Props = WithStyles & RouteComponentProps

class ErrorPage extends Component<Props>{
    constructor(props: Props) {
        super(props);
        console.log("==============", this.props)
    }
    render(){
        const {classes, location}= this.props
        const parsedData: any = queryString.parse(location.search);
        const errorMessage= parsedData.errorMessage
        console.log("parsedData====",parsedData)
        console.log("location====",location)
        console.log("errorMessage====",errorMessage)
        return (
            <div className={classes.app}>
                <Grid container spacing={8} alignItems="center">
                    <Grid item xs>
                        <AppAlert message={errorMessage} alertType='error'/>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(ErrorPage)
