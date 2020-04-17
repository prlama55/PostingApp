import React, { ChangeEvent, useState } from 'react'
import {
  Paper,
  withStyles,
  WithStyles,
  Grid,
  TextField,
  Button,
  Radio,
  FormLabel,
  FormControlLabel,
  RadioGroup ,
} from '@material-ui/core'
import { useRegisterMutation } from '../../graphql'
import {RouteComponentProps} from 'react-router-dom'
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
  radioControl:{
    margin: 0
  }
})
type Props = RouteComponentProps & WithStyles
interface RegisterState {
  email: string
  password: string
  firstName: string
  lastName: string
  userType: string
}
const Register: React.FC<Props> = ({classes, history}) => {
  const [registerMutation] = useRegisterMutation()
  const initialState: RegisterState = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    userType: '',
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

  const submit = async () => {
    await registerMutation({
      variables: {
        ...state,
      },
    })
    history.push('/users')
  }
  const setUserType=(event: React.ChangeEvent<HTMLInputElement>)=>{
    setState({
      ...state,
      userType: event.target.value
    })
  }
  console.log("state=====",state)
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
                    Register
                  </Grid>
                </Grid>
                <Grid container spacing={8} alignItems="flex-end">
                  <Grid item md={true} sm={true} xs={true}>
                    <FormLabel component="legend">Register as: </FormLabel>
                    <RadioGroup row aria-label="position" name="position" defaultValue="top">
                      <FormControlLabel
                          className={classes.radioControl}
                          value="BusinessUser"
                          control={<Radio color="primary" checked={state.userType === 'BusinessUser'} onChange={setUserType}/>}
                          label="Business User"
                          labelPlacement="start"
                      />
                      <FormControlLabel
                          className={classes.radioControl}
                          value="CustomerUser"
                          control={
                            <Radio color="primary" checked={state.userType === 'CustomerUser'} onChange={setUserType}/>
                          }
                          label="Customer User"
                          labelPlacement="end"
                      />
                    </RadioGroup>
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
                  <Button
                      variant="outlined"
                      color="primary"
                      style={{ textTransform: 'none' }}
                      onClick={submit}
                  >
                    Register
                  </Button>
                </Grid>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
  )
}

export default withStyles(styles as any)(Register)
