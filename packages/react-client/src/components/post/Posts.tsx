import React, {useState} from 'react'
import { Paper, Grid, withStyles, WithStyles } from '@material-ui/core'
import {
    usePostsQuery, useCreatePostMutation
} from '../../graphql'
import { RouteComponentProps } from 'react-router-dom'
import {getAppCredential} from "../../config/accessToken";
import Loading from '../core/Loading'
import CustomEditableTable from "../premitive/CustomEditableTable";
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
    { title: 'CreatedAt', field: 'createdAt', editable: 'never' },
    { title: 'User', field: 'userName', editable: 'never' },
    { title: 'PostType', field: 'postType', lookup: { 'text': 'Text','video': 'Video' }, initialEditValue:'text' },
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

    if (!loading && data) {
        data?.posts.map((post: PostType) => {
            postList.push({
                id: post.id,
                title:  post.title,
                postType:  post.postType,
                description:  post.description,
                createdAt:  post.createdAt,
                videoUrl:  post.videoUrl,
                userName:  post.user.name,
            } as PostType)
        })
    }
    const [getPosts, setPosts] = useState(postList)
    const [postMutation] = useCreatePostMutation()

    const onAdd = (newData: PostType) =>{
        return new Promise(resolve => {
            setTimeout(async () => {
                const {postType="",title="",description="",videoUrl=""} = newData
                const {data}=await postMutation({
                    variables: {
                        postType,title,description,videoUrl,
                        userId: appCredential.id
                    }
                })
                const {createPost}: any= data
                const post= {
                    id: createPost.id,
                    title:  createPost.title,
                    postType:  createPost.postType,
                    description:  createPost.description,
                    createdAt:  createPost.createdAt,
                    videoUrl:  createPost.videoUrl,
                    userName:  createPost.user.name,
                } as PostType
                const posts: PostType[] = getPosts.length>0? getPosts: postList
                setPosts([...posts, ...[post]])
                resolve(post)
            }, 1500);
        })
    }


    const onRowUpdate = (newData: PostType, oldData: any) =>
        new Promise(resolve => {
            resolve()
            if (oldData) {
                const posts: PostType[] = getPosts.length>0? getPosts: postList
                posts[posts.indexOf(oldData)] = newData
                setPosts(posts)
            }
        })

    const onRowDelete = (oldData: PostType) =>{
        return new Promise(resolve => {
            const posts: PostType[] = getPosts.length>0? getPosts: postList
            const newData:PostType[]= posts.filter(data=>{
                return data.id!==oldData.id
            })
            setPosts(newData)
            resolve(oldData)
        })
    }


    const { classes } = props
    const posts: PostType[] = getPosts.length>0? getPosts: postList
    return (
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
                        {loading && <Loading/>}
                        {!loading && <CustomEditableTable
                            title="Posts"
                            columns={columns}
                            data={posts}
                            onAdd={onAdd}
                            onRowUpdate={onRowUpdate}
                            onRowDelete={onRowDelete}
                        />}
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default withStyles(styles as any)(Posts)
