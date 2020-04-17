import React from 'react'
import { Button, CircularProgress } from '@material-ui/core'
import { withStyles, WithStyles } from '@material-ui/core'

const styles = (theme: any) => ({
  app: {
    flexGrow: 1,
    itemAlign: 'center',
    background: 'whitesmoke',
    padding: '70px',
    height: '100vh',
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
})
const Loading: React.FC<WithStyles> = props => {
  const { classes } = props
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    function tick() {
      // reset when reaching 100%
      setProgress(oldProgress => (oldProgress >= 100 ? 0 : oldProgress + 1))
    }

    const timer = setInterval(tick, 20)
    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div className={classes.app}>
      <Button variant="text" className={classes.button} disabled style={{ textTransform: 'none' }}>
        <CircularProgress className={classes.circularProgress} value={progress} size={20}/>
        Loading...
      </Button>
    </div>
  )
}

export default withStyles(styles as any)(Loading)
