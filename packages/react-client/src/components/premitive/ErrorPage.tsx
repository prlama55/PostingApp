import React, {Component} from 'react'
import { Grid, withStyles, WithStyles } from '@material-ui/core'
import { RouteComponentProps } from 'react-router-dom';
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

export type Props= RouteComponentProps & WithStyles
// export interface Props extends RouteComponentProps, WithStyles{
// // name: string
// // }
class ErrorPage extends Component<Props>{
    constructor(props: Props) {
        super(props);
        console.log("==============", this.props)
    }
    render(){
        const {classes, match}: any= this.props
        const errorMessage= match.params.apiError!=='undefined'?match.params.apiError: match.params.networkError
        return (
            <div className={classes.app}>
                <Grid container spacing={8} alignItems="center">
                    <Grid item xs>
                        <p className={classes.error}>{errorMessage}</p>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(ErrorPage)
