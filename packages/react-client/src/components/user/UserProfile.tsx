import React, { ChangeEvent, useState } from 'react'
import {
  Paper,
  withStyles,
  WithStyles,
  Grid,
  TextField,
} from '@material-ui/core'
import {RouteComponentProps} from 'react-router-dom'
import PayPalAuthButton from "../premitive/PayPalAuthButton";
import queryString from 'query-string'
import qs from 'qs'
import axios, {AxiosRequestConfig} from 'axios'
import {paypalConfigOption, PAYPAL_USER_URL, PAYPAL_CREDENTIAL, PAYPAL_TOKEN_URL} from "../../config/config";


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
interface RegisterState {
  user_id: string
  payer_id: string
  verified_account: string
  emails: any[]
  code: string
  name: string
  address: any
}
const UserProfile: React.FC<Props> = (props: Props) => {
  const initialState: RegisterState = {
    emails: [],
    payer_id: '',
    code: '',
    verified_account: '',
    user_id: '',
    name: '',
    address: {},
  }

  const [state, setState] = useState(initialState)
  const setValue = (
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const field = event.target.getAttribute('id') as string
    const value = event.target.value as string
    const data: RegisterState = { ...initialState }
    let newState = Object.create(data)
    newState[field] = value
    setState({
      ...state,
      ...newState,
    })
  }

  const {classes}= props
  const parsedData: any = queryString.parse(props.location.search);
  const {code}= parsedData
  const reqData = {
    "grant_type": 'client_credentials',
    "code": code
  };
  const options:AxiosRequestConfig = {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${PAYPAL_CREDENTIAL}`
    },
    data: qs.stringify(reqData),
    url: PAYPAL_TOKEN_URL,
  };
  axios(options).then(res=>{
    console.log("data====",res.data)
    const data= res.data
    const userOptions:AxiosRequestConfig = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer  ${data.access_token}`
      },
      url:PAYPAL_USER_URL,
    };
    axios(userOptions).then(userData=>{
      console.log("userData=====",userData)
      // const data= userData.data
      // setState({
      //   ...state,
      //   ...newState,
      // })
    }).catch(err=>console.log(err))
  }).catch(err=>{
    console.log("err===", err)
  }).finally(function () {
    // always executed
  });

  return (
      <div className={classes.app}>
        <Grid container spacing={8}>
          <Grid item xs>
            <Paper className={classes.padding}>
              <div className={classes.margin}>
                <Grid
                    container
                    spacing={8}
                    justify="center"
                    alignItems="center"
                    className={classes.headerTitle}
                >
                  <Grid
                      item
                      md={true}
                      sm={true}
                      xs={true}
                      className={classes.title}
                  >
                    User Detail
                  </Grid>
                </Grid>
                <Grid container spacing={8} alignItems="flex-end">
                  <Grid item md={true} sm={true} xs={true}>
                    <TextField
                        id="email"
                        label="Email"
                        type="email"
                        fullWidth
                        autoFocus
                        required
                        onChange={setValue}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={8} alignItems="flex-end">
                  <Grid item md={true} sm={true} xs={true}>
                    <TextField
                        id="password"
                        label="Password"
                        type="password"
                        fullWidth
                        required
                        onChange={setValue}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={8} alignItems="flex-end">
                  <Grid item md={true} sm={true} xs={true}>
                    <TextField
                        id="firstName"
                        label="First Name"
                        type="text"
                        fullWidth
                        required
                        onChange={setValue}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={8} alignItems="flex-end">
                  <Grid item md={true} sm={true} xs={true}>
                    <TextField
                        id="lastName"
                        label="Last Name"
                        type="text"
                        fullWidth
                        required
                        onChange={setValue}
                    />
                  </Grid>
                </Grid>
                <Grid container justify="flex-end" style={{ marginTop: '10px' }}>
                  <PayPalAuthButton {...paypalConfigOption}/>
                </Grid>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
  )
}

export default withStyles(styles as any)(UserProfile)
