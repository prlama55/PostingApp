import React, {useState} from 'react'
import { Paper, Grid, withStyles, WithStyles } from '@material-ui/core'
import {
    usePostsQuery, useCreatePostMutation
} from '../../graphql'
import { RouteComponentProps } from 'react-router-dom'
import {getAppCredential} from "../../config/accessToken";
import Loading from '../core/Loading'
import CustomTable from "../premitive/CustomTable";
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
export interface Me {
    name: string
}
export interface PostType {
    id: string
    title: string
    postType: string
    description: string
    createdAt: string
    videoUrl: string
    userName: string
    user: Me
}
interface Row {
    posts: PostType[]
}

const columns=[
    { title: 'User', field: 'userName' },
    { title: 'PostType', field: 'postType' },
    { title: 'CreatedAt', field: 'createdAt' },
    { title: 'Title', field: 'title' },
    { title: 'Description', field: 'description' },
    { title: 'Video Url', field: 'videoUrl' },
]
type Props = RouteComponentProps<any> & WithStyles & Row
const Posts: React.FC<Props> = (props) => {
    const appCredential= getAppCredential()
    let postList: PostType[] = []
    const { data, loading }: any = usePostsQuery({
        fetchPolicy: 'network-only',
    })
    const [getPosts, setPosts] = useState<PostType[]>(postList)
    if (!loading && data) {
        postList = data?.posts.map((post: PostType) => {
            return {
                id: post.id,
                title:  post.title,
                postType:  post.postType,
                description:  post.description,
                createdAt:  post.createdAt,
                videoUrl:  post.videoUrl,
                userName:  post.user.name,
            }
        })
    }
    const [postMutation] = useCreatePostMutation()

    const onAdd = (newData: PostType) =>
        new Promise(resolve => {
            setTimeout(async () => {
            const {postType="",title="",description="",videoUrl=""} = newData
            await postMutation({
                variables: {
                    postType,title,description,videoUrl,
                    userId: appCredential.id
                },
                // update: (_store, { data }) => {
                //     if (!data) {
                //         return null;
                //     }
                //     // const {createPost}: any= data
                //     // postList.push({
                //     //     id: createPost.id,
                //     //     title:  createPost.title,
                //     //     postType:  createPost.postType,
                //     //     description:  createPost.description,
                //     //     createdAt:  createPost.createdAt,
                //     //     videoUrl:  createPost.videoUrl,
                //     //     userName:  createPost.user.name,
                //     // } as PostType)
                //     // console.log("data=====",data)
                //     /// @ts-ignore
                //
                // }
            })
            const posts: PostType[] = getPosts.length>0? getPosts: postList
            posts.push(newData)
                postList.push(newData)
                setPosts(posts)
                resolve(posts)
            }, 1500);
        })

    const onRowUpdate = (newData: PostType, oldData: any) =>
        new Promise(resolve => {
            resolve()
            if (oldData) {
                const posts: PostType[] = getPosts.length>0? getPosts: postList
                posts[posts.indexOf(oldData)] = newData
                setPosts(posts)
            }
        })

    const onRowDelete = (oldData: any) =>
        new Promise(resolve => {
            resolve()
            const posts: PostType[] = getPosts.length>0? getPosts: postList
            posts.splice(posts.indexOf(oldData), 1)
            setPosts(posts)
        })

    const { classes } = props
    return data ? (
        <div className={classes.app}>
            <Grid container spacing={8}>
                <Grid item xs>
                    <Paper className={classes.paper}>
                        {/*<MaterialTable*/}
                        {/*    style={{ boxShadow: 'none' }}*/}
                        {/*    title='Post'*/}
                        {/*    columns={columns}*/}
                        {/*    data={getPosts.length>0? getPosts: postList}*/}
                        {/*    editable={{*/}
                        {/*        onRowAdd: onAdd,*/}
                        {/*        onRowUpdate: onRowUpdate,*/}
                        {/*        onRowDelete: onRowDelete,*/}
                        {/*    }}*/}
                        {/*/>*/}
                        <CustomTable
                            title="Posts"
                            columns={columns}
                            data={postList}
                            onAdd={onAdd}
                            onRowUpdate={onRowUpdate}
                            onRowDelete={onRowDelete}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    ):(
        <Loading/>
    )
}

export default withStyles(styles as any)(Posts)
