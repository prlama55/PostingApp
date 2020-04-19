import React, { ChangeEvent, useState } from 'react'
import {
  Paper,
  withStyles,
  WithStyles,
  Grid,
  TextField, Button, FormLabel,
} from '@material-ui/core'
import {RouteComponentProps} from 'react-router-dom'
import queryString from 'query-string'
import qs from 'qs'
import axios, {AxiosRequestConfig} from 'axios'
import {PAYPAL_USER_URL, PAYPAL_CREDENTIAL, PAYPAL_TOKEN_URL} from "../../config/config";
import {AppCredential, getAppCredential, setAppCredential} from "../../config/accessToken";
import {
  useCreatePartnerMutation,
  useCustomerDetailQuery,
  usePartnerDetailQuery
} from "../../graphql";
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

// @ts-ignore
const getToken:AppCredential= localStorage.getItem('user')?JSON.parse(localStorage.getItem('user').toString()):  getAppCredential()

export const UserInfo:React.FC=()=>{
  return (
      <>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item md={true} sm={true} xs={true} component='h4'>
            Name: {getToken.name}
          </Grid>
        </Grid>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item md={true} sm={true} xs={true} component='h4'>
            Email: {getToken.email}
          </Grid>
        </Grid>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item md={true} sm={true} xs={true} component='h4'>
            User Role: {getToken.role}
          </Grid>
        </Grid>
      </>
  )
}
export const CustomerProfile:React.FC=()=>{
  const {data} = useCustomerDetailQuery({
    variables: {
      id: getToken.businessUserId
    },
    fetchPolicy: 'network-only',
  })
  let customer
  if(data) customer= data.customer
  return customer ? (
      <>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item md={true} sm={true} xs={true} component='h4'>
            Name: {customer.name}
          </Grid>
        </Grid>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item md={true} sm={true} xs={true} component='h4'>
            Email: {customer.user.email}
          </Grid>
        </Grid>
      </>
  ):(<></>)
}
export const BusinessProfile:React.FC=()=>{
  const {data} = usePartnerDetailQuery({
    variables: {
      id: getToken.businessUserId
    },
    fetchPolicy: 'network-only',
  })
  let partner
  if(data) partner= data.partner
  return partner ? (
      <>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item md={true} sm={true} xs={true} component='h4'>
            Business Name: {partner.name}
          </Grid>
        </Grid>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item md={true} sm={true} xs={true} component='h4'>
            Personal Email: {partner.user.email}
          </Grid>
        </Grid>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item md={true} sm={true} xs={true} component='h4'>
            Business Emails: {partner.emails}
          </Grid>
        </Grid>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item md={true} sm={true} xs={true} component='h4'>
            PayPal Verified: {partner.verifiedAccount==='true'?'Verified':'Not verified'}
          </Grid>
        </Grid>

      </>
  ):(<></>)
}

const UserProfile: React.FC<Props> = (props: Props) => {
  const [partnerMutation] = useCreatePartnerMutation()

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
    "grant_type": 'authorization_code',
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

  const submit = async () => {
    if(!state.clientId){
      setAlertMessage({
        alertType: 'error',
        message: 'Please enter PayPal clientID.',
      })
    }else{
      const getAccessToken= await axios(options)
      const userOptions:AxiosRequestConfig = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer  ${getAccessToken.data.access_token}`
        },
        url:PAYPAL_USER_URL,
      };

      const getUserData= await axios(userOptions)
      const data: any= getUserData.data
      let email=''
      const {user_id,name, payer_id, verified_account, emails}= data
      // const {street_address, locality, region, postal_code, country}= address
      emails.map((e: any)=>{
        email= email.concat(','+e.value)
      })
      const userData={
        ...state,
        userId:getToken.id,
        name:name,
        emails: email,
        partnerId: user_id,
        payerId: payer_id,
        verifiedAccount:verified_account,
      } as RegisterState

      const response=await partnerMutation({
        variables: {
          ...userData,
        },
      })
      const {createPartner}: any= response.data
      const newCredential={
        ...getToken,
        hasBusiness: true,
        businessUserId: createPartner.id
      }
      setAppCredential({
        ...newCredential,
      } as AppCredential)
      localStorage.setItem('user', JSON.stringify(newCredential))
      setAlertMessage({
        alertType: 'success',
        message: 'Your business profile has been updated..',
      })
    }


  }
  return (
      <div className={classes.app}>
        <Grid container spacing={8}>
          <Grid item xs>
            <Paper className={classes.padding}>
              <div className={classes.margin}>
                <FormLabel component='h4'>User Profile</FormLabel>
                <Grid container spacing={8} alignItems="flex-end">
                  <Grid item md={true} sm={true} xs={true}>
                    {alertMessage.message && <AppAlert {...alertMessage}/>}
                  </Grid>
                </Grid>
                {getToken.businessUserId && getToken.role==='BusinessUser' &&
                <BusinessProfile/>
                }
                {getToken.businessUserId && getToken.role==='CustomerUser' &&
                <CustomerProfile/>
                }
                {getToken.role==='AdminUser' &&
                <UserInfo/>
                }
                {getToken.role==='CustomerUser' && getToken.businessUserId==='' &&
                <UserInfo/>
                }
                {getToken.businessUserId==='' && getToken.role==='BusinessUser' &&
                <>
                  <Grid container spacing={8} alignItems="flex-end">
                    <Grid item md={true} sm={true} xs={true}>
                      <TextField
                          id="clientId"
                          label="ClientID"
                          type="text"
                          fullWidth
                          required
                          variant="outlined"
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
                </>
                }

              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
  )
}

export default withStyles(styles as any)(UserProfile)
