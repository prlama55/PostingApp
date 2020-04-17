import React from 'react'
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
})
// type Props= PayPalButtonProps & WithStyles & RouteComponentProps
type Props= WithStyles & RouteComponentProps
const Home: React.FC<Props> = (props: any) => {

  const { classes } = props
  return (
    <div className={classes.app}>

      <Grid container spacing={8} alignItems="center">
        <Grid item xs>

        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(Home)
