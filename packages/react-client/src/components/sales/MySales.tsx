import React from "react";
import {
    useOrdersQuery,
} from "../../graphql";
import {Grid, Paper, WithStyles, withStyles} from "@material-ui/core";
import {AppCredential, getAppCredential} from "../../config/accessToken";
import {RouteComponentProps} from "react-router-dom";
import Loading from "../core/Loading";
import CustomTable from '../premitive/CustomTable';

const styles = (theme: any) => ({
    app: {
        flexGrow: 1,
        itemAlign: 'center',
        background: 'whitesmoke',
        padding: '70px',
        height: '100vh',
    },
    margin: {
        margin: theme.spacing.unit,
    },
    padding: {
        padding: theme.spacing.unit,
    },
    paper: {
        padding: theme.spacing.unit,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    table: {
        boxShadow: 'none',
    },
})
type Props = RouteComponentProps & WithStyles
const columns=[
    { title: 'Date', field: 'createdAt' },
    { title: 'Name', field: 'name' },
    { title: 'Amount', field: 'price' },
    { title: 'Description', field: 'description' },
]
const MySales:React.FC<Props>=(props: Props)=>{
    // @ts-ignore
    const getToken:AppCredential= localStorage.getItem('user')?JSON.parse(localStorage.getItem('user').toString()):  getAppCredential()
    const {data, loading} = useOrdersQuery({
        variables: {
            partnerId: getToken.businessUserId
        },
        fetchPolicy: 'network-only',
    })
    const {classes}=props
    return data ? (
        <div className={classes.app}>
            <Grid container spacing={8}>
                <Grid item xs>
                    {loading && <Loading/>}
                    <Paper className={classes.padding}>
                        {(!loading && data) &&
                        <CustomTable title='Sales' data={data.orders} columns={columns}/>
                        }
                    </Paper>
                </Grid>
            </Grid>
        </div>
    ):(<></>)
}

export default withStyles(styles as any)(MySales)
