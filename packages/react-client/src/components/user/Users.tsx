import React, { useState, createRef } from 'react'
import { Paper, Grid, withStyles, WithStyles } from '@material-ui/core'
import MaterialTable, { Column } from 'material-table'
import {
  useRegisterMutation,
  useUsersQuery,
} from '../../graphql'
import { RouteComponentProps } from 'react-router-dom'
import randomstring from 'randomstring'
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

interface TableState {
  columns: Array<Column<Users>>
  users: Users[]
}

type Props = RouteComponentProps<any> & WithStyles & Row
const Users: React.FC<Props> = props => {
  let tableRef = createRef();
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
  console.log("userList=====",userList)
  const [state, setState] = useState<TableState>({
    columns: [
      { title: 'Name', field: 'firstName' },
      { title: 'Surname', field: 'lastName' },
      { title: 'Email', field: 'email' },
    ],
    users: [...userList],
  })
  const [registerMutation] = useRegisterMutation()

  const onAdd = async (newData: Users) =>
    new Promise(resolve => {
      setTimeout(async () => {
        resolve()
        const password = randomstring.generate(7);
        await registerMutation({
          variables: {
            ...newData,
            password: password,
            userType: "BusinessUser",
          },
        })
        const users: Users[] = state.users.length > 0 ? state.users : userList
        users.push(newData)
        setState((prevState: TableState) => {
          const users: Users[] = prevState.users.length > 0 ? prevState.users : userList
          users.push(newData)
          return { ...prevState, users }
        })
      }, 100)
    })

  const onRowUpdate = (newData: Users, oldData: any) =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve()
        if (oldData) {
          setState((prevState: TableState) => {
            const users: Users[] = prevState.users.length > 0 ? prevState.users : userList
            users[users.indexOf(oldData)] = newData
            return { ...prevState, users }
          })
        }
      }, 100)
    })

  const onRowDelete = (oldData: any) =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve()
        setState((prevState: TableState) => {
          const users: Users[] = prevState.users.length > 0 ? prevState.users : userList
          users.splice(users.indexOf(oldData), 1)
          return { ...prevState, users }
        })
      }, 100)
    })

  const { classes } = props
  const { columns } = state
  const users = [...state.users]
  console.log("users====",users)
  return (
    <div className={classes.app}>
      <Grid container spacing={8}>
        <Grid item xs>
          <Paper className={classes.paper}>
            <MaterialTable
              tableRef={tableRef}
              style={{ boxShadow: 'none' }}
              title="Users"
              columns={columns}
              data={userList}
              editable={{
                onRowAdd: onAdd,
                onRowUpdate: onRowUpdate,
                onRowDelete: onRowDelete,
              }}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles as any)(Users)
