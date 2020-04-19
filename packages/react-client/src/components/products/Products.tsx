import React, {useState} from 'react'
import { Paper, Grid, withStyles, WithStyles } from '@material-ui/core'
import {
    useCreateProductMutation, useProductsQuery
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
export interface Partner {
    id: string
    name: string
    clientId: string
}
export interface ProductType {
    id: string
    name: string
    price: number
    description: string
    createdAt: string
    businessName: string
    partner: Partner
}
interface Row {
    products: ProductType[]
}


const columns=[
    { title: 'CreatedAt', field: 'createdAt', editable: 'never' },
    { title: 'Business Name', field: 'businessName', editable: 'never' },
    { title: 'Name', field: 'name' },
    { title: 'Description', field: 'description' },
    { title: 'Price', field: 'price', type: 'numeric' },
]
type Props = RouteComponentProps<any> & WithStyles & Row
const Products: React.FC<Props> = (props) => {
    const appCredential= getAppCredential()
    let productList: ProductType[] = []
    const { data, loading }: any = useProductsQuery({
        fetchPolicy: 'network-only',
    })
    if (!loading && data) {
        data?.products.map((product: ProductType) => {
            productList.push({
                id: product.id,
                name:  product.name,
                price:  product.price,
                description:  product.description,
                createdAt:  product.createdAt,
                businessName:  product.partner.name,
                partner:{
                    id:product.partner.id,
                    clientId:product.partner.clientId,
                    name:product.partner.name
                },
            } as ProductType)
        })
    }
    const [getProducts, setProducts] = useState(productList)
    const [productMutation] = useCreateProductMutation()

    const onAdd = (newData: ProductType) =>{
        return new Promise(resolve => {
            setTimeout(async () => {
                const {name="",price="",description=""} = newData
                const {data}=await productMutation({
                    variables: {
                        name,price: parseFloat(price.toString()),description,
                        partnerId: appCredential.businessUserId
                    }
                })
                const {createProduct}: any= data
                const product= {
                    id: createProduct.id,
                    name:  createProduct.name,
                    price:  createProduct.price,
                    description:  createProduct.description,
                    createdAt:  createProduct.createdAt,
                    businessName:  createProduct.createdAt,
                    partner:{
                        id:createProduct.partner.id,
                        clientId:createProduct.partner.name,
                        name:createProduct.partner.name
                    },
                } as ProductType
                const products: ProductType[] = getProducts.length>0? getProducts: productList
                setProducts([...products, ...[product]])
                resolve(product)
            }, 1500);
        })
    }


    const onRowUpdate = (newData: ProductType, oldData: any) =>
        new Promise(resolve => {
            resolve()
            if (oldData) {
                const products: ProductType[] = getProducts.length>0? getProducts: productList
                products[products.indexOf(oldData)] = newData
                setProducts(products)
            }
        })

    const onRowDelete = (oldData: ProductType) =>{
        return new Promise(resolve => {
            const products: ProductType[] = getProducts.length>0? getProducts: productList
            const newData:ProductType[]= products.filter(data=>{
                return data.id!==oldData.id
            })
            setProducts(newData)
            resolve(oldData)
        })
    }


    const { classes } = props
    const products: ProductType[] = getProducts.length>0? getProducts: productList
    return (
        <div className={classes.app}>
            <Grid container spacing={8}>
                <Grid item xs>
                    <Paper className={classes.paper}>
                        {loading && <Loading/>}
                        {!loading && <CustomTable
                            title="Products"
                            columns={columns}
                            data={products}
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

export default withStyles(styles as any)(Products)
