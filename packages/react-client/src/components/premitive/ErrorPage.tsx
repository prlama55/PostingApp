import React, {Component} from 'react'
import { Grid, withStyles, WithStyles } from '@material-ui/core'
import AppAlert from "./AppAlert";
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

interface Props extends WithStyles{
    error: string
}
// export interface Props extends RouteComponentProps, WithStyles{
// // name: string
// // }
class ErrorPage extends Component<Props>{
    constructor(props: Props) {
        super(props);
        console.log("==============", this.props)
    }
    render(){
        const {classes, error}= this.props
        // const parsedData: any = queryString.parse(location.search);
        // const errorMessage= parsedData.errorMessage
        return (
            <div className={classes.app}>
                <Grid container spacing={8} alignItems="center">
                    <Grid item xs>
                        <AppAlert message={error} alertType='error'/>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(ErrorPage)
