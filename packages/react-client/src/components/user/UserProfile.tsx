import React, { ChangeEvent, useState } from 'react'
import {
  Paper,
  withStyles,
  WithStyles,
  Grid,
  TextField, Button,
} from '@material-ui/core'
import {RouteComponentProps} from 'react-router-dom'
import queryString from 'query-string'
import qs from 'qs'
import axios, {AxiosRequestConfig} from 'axios'
import {PAYPAL_USER_URL, PAYPAL_CREDENTIAL, PAYPAL_TOKEN_URL} from "../../config/config";
import {AppCredential, getAppCredential} from "../../config/accessToken";
import {useCreatePartnerMutation} from "../../graphql";
import AppAlert, {AppAlertProps} from "../premitive/AppAlert";


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
  userId: string
  name: string
  emails: string
  partnerId: string
  payerId: string
  clientId: string
  verifiedAccount: string
}
const UserProfile: React.FC<Props> = (props: Props) => {
  const [createPartner] = useCreatePartnerMutation()
  const initialState: RegisterState = {
    userId: '',
    name: '',
    emails: '',
    partnerId: '',
    payerId: '',
    clientId: '',
    verifiedAccount:'',
  }
  const initialAlert:AppAlertProps={
    message:'',
    alertType:'success'
  }
  // @ts-ignore
  let userCredential: AppCredential= localStorage.getItem('user')?JSON.parse(localStorage.getItem('user').toString()): getAppCredential()
  const [state, setState] = useState(initialState)
  const [alertMessage, setAlertMessage] = useState(initialAlert)
  const setValue = (
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.target.value as string
    setState({
      ...state,
      clientId: value,
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
  let userData: RegisterState

  const submit = async () => {
    if(!state.clientId){
      setAlertMessage({
        alertType: 'error',
        message: 'Please enter PayPal clientID.',
      })
    }else{
      axios(options).then(res=>{
        const data= res.data
        const userOptions:AxiosRequestConfig = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer  ${data.access_token}`
          },
          url:PAYPAL_USER_URL,
        };
        axios(userOptions).then(usrData=>{
          console.log("userData=====",usrData)
          const data: any= usrData.data
          let email=''
          const {user_id,name, payer_id, verified_account, emails}= data
          // const {street_address, locality, region, postal_code, country}= address
          emails.map((e: any)=>{
            email= email.concat(','+e.value)
          })
          userData={
            ...state,
            userId:userCredential.id,
            name:name,
            emails: email,
            partnerId: user_id,
            payerId: payer_id,
            verifiedAccount:verified_account,
          } as RegisterState
        }).catch(err=>{
          console.log(err)
          setAlertMessage({
            alertType: 'error',
            message: 'Could not verify PayPal. Please! try again',
          })
        })
      }).catch(err=>{
        console.log("err===", err)
        setAlertMessage({
          alertType: 'error',
          message: 'Could not verify PayPal. Please! try again',
        })
      }).finally(async function () {
        // always executed
        await createPartner({
          variables: {
            ...userData,
          },
        })
        setAlertMessage({
          alertType: 'success',
          message: 'Your business profile has been updated..',
        })
      });
    }


  }
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
                    Business User Detail
                  </Grid>
                </Grid>

                <Grid container spacing={8} alignItems="flex-end">
                  <Grid item md={true} sm={true} xs={true}>
                    {alertMessage && <AppAlert {...alertMessage}/>}
                  </Grid>
                </Grid>
                <Grid container spacing={8} alignItems="flex-end">
                  <Grid item md={true} sm={true} xs={true}>
                    <TextField
                        id="clientId"
                        label="ClientID"
                        type="text"
                        fullWidth
                        required
                        onChange={setValue}
                    />
                  </Grid>
                </Grid>
                <Grid container justify="flex-end" style={{ marginTop: '10px' }}>
                  <Button
                      variant="outlined"
                      color="primary"
                      style={{ textTransform: 'none' }}
                      onClick={submit}
                  >
                    Save
                  </Button>
                </Grid>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
  )
}

export default withStyles(styles as any)(UserProfile)
