import React, { useState } from 'react'
import { Paper, Grid, withStyles, WithStyles } from '@material-ui/core'
import {
  useRegisterMutation,
  useUsersQuery,
} from '../../graphql'
import { RouteComponentProps } from 'react-router-dom'
import CustomTable from "../premitive/CustomTable";
// import randomstring from 'randomstring'
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
export interface Users {
  firstName: string
  lastName: string
  email: string
  id: string
  password: string
}
interface Row {
  users: Users[]
}
const columns=[
  { title: 'Name', field: 'firstName' },
  { title: 'Surname', field: 'lastName' },
  { title: 'Email', field: 'email' },
]
type Props = RouteComponentProps<any> & WithStyles & Row
const Users: React.FC<Props> = props => {
  let userList: Users[] = []
  const { data }: any = useUsersQuery({
    fetchPolicy: 'network-only',
  })
  if (data) {
    userList = data?.users.map((user: Users) => {
      return {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        id: user.id,
      }
    })
  }

  const [getUsers, setUsers] = useState<Users[]>(userList)
  const [registerMutation] = useRegisterMutation()

  const onAdd = async (newData: Users) =>{
    return new Promise(resolve => {
      setTimeout(async () => {
        // const _password = randomstring.generate(7);
        await registerMutation({
          variables: {
            ...newData,
            password: 'AdminUser',
            userType: "AdminUser",
          },
        })
        let users: Users[] = getUsers.length > 0 ? getUsers : userList
        users.push(newData)
        setUsers(users)
        resolve(newData)
      }, 1000)
    })
  }


  const onRowUpdate = (_newData: Users, _oldData: any) =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, 100)
    })

  const onRowDelete = (oldData: Users) =>
    new Promise(resolve => {
      setTimeout(() => {
        const users: Users[] = getUsers.length > 0 ? getUsers : userList
        const newData:Users[]= users.filter(data=>{
          return data.email!==oldData.email
        })
        setUsers(newData)
        resolve(oldData)
      }, 1000)
    })

  const { classes } = props
  const users: Users[] = getUsers.length > 0 ? getUsers : userList

  return (
    <div className={classes.app}>
      <Grid container spacing={8}>
        <Grid item xs>
          <Paper className={classes.paper}>
            <CustomTable
                title="Users"
                columns={columns}
                data={users}
                onAdd={onAdd}
                onRowUpdate={onRowUpdate}
                onRowDelete={onRowDelete}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles as any)(Users)
