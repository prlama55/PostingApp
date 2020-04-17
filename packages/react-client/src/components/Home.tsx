import React from 'react'
import {Grid, withStyles, WithStyles} from '@material-ui/core'
import {RouteComponentProps} from 'react-router-dom';
import {AppCredential, getAppCredential} from "../config/accessToken";
import {paypalConfigOption} from "../config/config";
import PayPalAuthButton from "./premitive/PayPalAuthButton";
const styles = () => ({
  app: {
    flexGrow: 1,
    itemAlign: 'center',
    background: 'whitesmoke',
    padding: '70px',
    height: '100vh',
  },
})
// type Props= PayPalButtonProps & WithStyles & RouteComponentProps
type Props= WithStyles & RouteComponentProps
const Home: React.FC<Props> = (props: any) => {

  const { classes } = props
  // @ts-ignore
  let userCredential: AppCredential= localStorage.getItem('user')?JSON.parse(localStorage.getItem('user').toString()): getAppCredential()
  const hasBusiness=(userCredential.role==='BusinessUser' && !userCredential.hasBusiness)
  console.log("hasBusiness====",hasBusiness)
  return (
      <div className={classes.app}>

        <Grid container spacing={8} alignItems="center">
          <Grid item xs>
            {hasBusiness &&
            <PayPalAuthButton {...paypalConfigOption}/>
            }
          </Grid>
        </Grid>
      </div>
  )
}

export default withStyles(styles)(Home)
