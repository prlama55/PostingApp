import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

/** The Cart model */
export type Cart = {
   __typename?: 'Cart';
  id: Scalars['ID'];
  name: Scalars['String'];
  price: Scalars['Float'];
  description: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  partnerId: Scalars['String'];
  partner: Partner;
  customerId: Scalars['String'];
  customer: Customer;
  productId: Scalars['String'];
  product: Product;
};

/** The Partner model */
export type Customer = {
   __typename?: 'Customer';
  id: Scalars['ID'];
  name: Scalars['String'];
  emails: Scalars['String'];
  customerId: Scalars['String'];
  payerId: Scalars['String'];
  verifiedAccount: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
  user: User;
};


export type LoginResponse = {
   __typename?: 'LoginResponse';
  id: Scalars['String'];
  email: Scalars['String'];
  role: Scalars['String'];
  accessToken: Scalars['String'];
  name: Scalars['String'];
  businessUserId: Scalars['String'];
  hasBusiness: Scalars['Boolean'];
};

export type Mutation = {
   __typename?: 'Mutation';
  revokeRefreshToken: Scalars['Boolean'];
  register: Scalars['Boolean'];
  deleteUser: Scalars['Boolean'];
  createPost: Post;
  deletePost: Scalars['Boolean'];
  login?: Maybe<LoginResponse>;
  logout: Scalars['Boolean'];
  createPartner: Partner;
  deletePartner: Scalars['Boolean'];
  createCustomer: Customer;
  deleteCustomer: Scalars['Boolean'];
  createProduct: Product;
  deleteProduct: Scalars['Boolean'];
  createOrder: Order;
  deleteOrder: Scalars['Boolean'];
  createCart: Cart;
  deleteCart: Scalars['Boolean'];
  removeCarts: Scalars['Boolean'];
};


export type MutationRevokeRefreshTokenArgs = {
  userId: Scalars['String'];
};


export type MutationRegisterArgs = {
  userType: Scalars['String'];
  lastName: Scalars['String'];
  firstName: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['String'];
};


export type MutationCreatePostArgs = {
  videoUrl: Scalars['String'];
  description: Scalars['String'];
  title: Scalars['String'];
  postType: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationDeletePostArgs = {
  id: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationCreatePartnerArgs = {
  verifiedAccount: Scalars['String'];
  clientId: Scalars['String'];
  payerId: Scalars['String'];
  partnerId: Scalars['String'];
  emails: Scalars['String'];
  name: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationDeletePartnerArgs = {
  id: Scalars['String'];
};


export type MutationCreateCustomerArgs = {
  verifiedAccount: Scalars['String'];
  payerId: Scalars['String'];
  customerId: Scalars['String'];
  emails: Scalars['String'];
  name: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationDeleteCustomerArgs = {
  id: Scalars['String'];
};


export type MutationCreateProductArgs = {
  description: Scalars['String'];
  price: Scalars['Float'];
  name: Scalars['String'];
  partnerId: Scalars['String'];
};


export type MutationDeleteProductArgs = {
  id: Scalars['String'];
};


export type MutationCreateOrderArgs = {
  description: Scalars['String'];
  price: Scalars['Float'];
  name: Scalars['String'];
  productIds: Scalars['String'];
  customerId: Scalars['String'];
  payerId: Scalars['String'];
};


export type MutationDeleteOrderArgs = {
  id: Scalars['String'];
};


export type MutationCreateCartArgs = {
  description: Scalars['String'];
  price: Scalars['Float'];
  name: Scalars['String'];
  productId: Scalars['String'];
  customerId: Scalars['String'];
  partnerId: Scalars['String'];
};


export type MutationDeleteCartArgs = {
  id: Scalars['String'];
};


export type MutationRemoveCartsArgs = {
  ids: Scalars['String'];
};

/** The Partner model */
export type Order = {
   __typename?: 'Order';
  id: Scalars['ID'];
  name: Scalars['String'];
  price: Scalars['Float'];
  description: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  payerId: Scalars['String'];
  customerId: Scalars['String'];
  customer: Customer;
  productIds: Array<Scalars['String']>;
  products: Array<Product>;
};

/** The Partner model */
export type Partner = {
   __typename?: 'Partner';
  id: Scalars['ID'];
  name: Scalars['String'];
  emails: Scalars['String'];
  partnerId: Scalars['String'];
  payerId: Scalars['String'];
  clientId: Scalars['String'];
  verifiedAccount: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
  user: User;
};

/** The Users model */
export type Post = {
   __typename?: 'Post';
  id: Scalars['ID'];
  title: Scalars['String'];
  postType: Scalars['String'];
  description: Scalars['String'];
  videoUrl: Scalars['String'];
  published: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
  user: User;
};

/** The Partner model */
export type Product = {
   __typename?: 'Product';
  id: Scalars['ID'];
  name: Scalars['String'];
  price: Scalars['Float'];
  description: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  partnerId: Scalars['String'];
  partner: Partner;
};

export type Query = {
   __typename?: 'Query';
  user: User;
  users: Array<User>;
  post: Post;
  posts: Array<Post>;
  partner: Partner;
  partners: Array<Partner>;
  customer: Customer;
  customers: Array<Customer>;
  product: Product;
  products: Array<Product>;
  order: Order;
  orders: Array<Order>;
  cart: Cart;
  carts: Array<Cart>;
};


export type QueryUserArgs = {
  id: Scalars['String'];
};


export type QueryPostArgs = {
  id: Scalars['String'];
};


export type QueryPartnerArgs = {
  id: Scalars['String'];
};


export type QueryCustomerArgs = {
  id: Scalars['String'];
};


export type QueryProductArgs = {
  id: Scalars['String'];
};


export type QueryOrderArgs = {
  id: Scalars['String'];
};


export type QueryOrdersArgs = {
  partnerId: Scalars['String'];
};


export type QueryCartArgs = {
  id: Scalars['String'];
};


export type QueryCartsArgs = {
  customerId: Scalars['String'];
};

/** The Users model */
export type User = {
   __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
};

export type CartsQueryVariables = {
  customerId: Scalars['String'];
};


export type CartsQuery = (
  { __typename?: 'Query' }
  & { carts: Array<(
    { __typename?: 'Cart' }
    & Pick<Cart, 'id' | 'name' | 'price' | 'description' | 'createdAt'>
    & { partner: (
      { __typename?: 'Partner' }
      & Pick<Partner, 'id' | 'clientId' | 'name'>
    ), customer: (
      { __typename?: 'Customer' }
      & Pick<Customer, 'id' | 'name'>
    ), product: (
      { __typename?: 'Product' }
      & Pick<Product, 'id' | 'name'>
    ) }
  )> }
);

export type CreateCartMutationVariables = {
  partnerId: Scalars['String'];
  customerId: Scalars['String'];
  productId: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Float'];
  description: Scalars['String'];
};


export type CreateCartMutation = (
  { __typename?: 'Mutation' }
  & { createCart: (
    { __typename?: 'Cart' }
    & Pick<Cart, 'id' | 'name' | 'price' | 'description' | 'createdAt'>
    & { partner: (
      { __typename?: 'Partner' }
      & Pick<Partner, 'id' | 'clientId' | 'name'>
    ), customer: (
      { __typename?: 'Customer' }
      & Pick<Customer, 'id' | 'name'>
    ), product: (
      { __typename?: 'Product' }
      & Pick<Product, 'id' | 'name'>
    ) }
  ) }
);

export type RemoveCartsMutationVariables = {
  ids: Scalars['String'];
};


export type RemoveCartsMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeCarts'>
);

export type CreateCustomerMutationVariables = {
  userId: Scalars['String'];
  name: Scalars['String'];
  emails: Scalars['String'];
  customerId: Scalars['String'];
  payerId: Scalars['String'];
  clientId: Scalars['String'];
  verifiedAccount: Scalars['String'];
};


export type CreateCustomerMutation = (
  { __typename?: 'Mutation' }
  & { createCustomer: (
    { __typename?: 'Customer' }
    & Pick<Customer, 'id' | 'name' | 'emails' | 'customerId' | 'createdAt' | 'payerId' | 'verifiedAccount'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'email' | 'name'>
    ) }
  ) }
);

export type CustomerDetailQueryVariables = {
  id: Scalars['String'];
};


export type CustomerDetailQuery = (
  { __typename?: 'Query' }
  & { customer: (
    { __typename?: 'Customer' }
    & Pick<Customer, 'id' | 'name' | 'emails' | 'customerId' | 'createdAt' | 'payerId' | 'verifiedAccount'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'email' | 'name'>
    ) }
  ) }
);

export type CustomersQueryVariables = {};


export type CustomersQuery = (
  { __typename?: 'Query' }
  & { customers: Array<(
    { __typename?: 'Customer' }
    & Pick<Customer, 'id' | 'name' | 'emails' | 'customerId' | 'createdAt' | 'payerId' | 'verifiedAccount'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'email' | 'name'>
    ) }
  )> }
);

export type CreateOrderMutationVariables = {
  partnerId: Scalars['String'];
  customerId: Scalars['String'];
  productIds: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Float'];
  description: Scalars['String'];
};


export type CreateOrderMutation = (
  { __typename?: 'Mutation' }
  & { createOrder: (
    { __typename?: 'Order' }
    & Pick<Order, 'id' | 'name' | 'price' | 'description' | 'createdAt'>
    & { customer: (
      { __typename?: 'Customer' }
      & Pick<Customer, 'id' | 'name'>
    ), products: Array<(
      { __typename?: 'Product' }
      & Pick<Product, 'id' | 'name'>
      & { partner: (
        { __typename?: 'Partner' }
        & Pick<Partner, 'id' | 'name'>
      ) }
    )> }
  ) }
);

export type OrdersQueryVariables = {
  partnerId: Scalars['String'];
};


export type OrdersQuery = (
  { __typename?: 'Query' }
  & { orders: Array<(
    { __typename?: 'Order' }
    & Pick<Order, 'id' | 'name' | 'price' | 'description' | 'createdAt'>
    & { customer: (
      { __typename?: 'Customer' }
      & Pick<Customer, 'id' | 'name'>
    ), products: Array<(
      { __typename?: 'Product' }
      & Pick<Product, 'id' | 'name'>
      & { partner: (
        { __typename?: 'Partner' }
        & Pick<Partner, 'id' | 'name'>
      ) }
    )> }
  )> }
);

export type CreatePartnerMutationVariables = {
  userId: Scalars['String'];
  name: Scalars['String'];
  emails: Scalars['String'];
  partnerId: Scalars['String'];
  payerId: Scalars['String'];
  clientId: Scalars['String'];
  verifiedAccount: Scalars['String'];
};


export type CreatePartnerMutation = (
  { __typename?: 'Mutation' }
  & { createPartner: (
    { __typename?: 'Partner' }
    & Pick<Partner, 'id' | 'name' | 'emails' | 'partnerId' | 'createdAt' | 'payerId' | 'clientId' | 'verifiedAccount'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'email' | 'name'>
    ) }
  ) }
);

export type PartnerDetailQueryVariables = {
  id: Scalars['String'];
};


export type PartnerDetailQuery = (
  { __typename?: 'Query' }
  & { partner: (
    { __typename?: 'Partner' }
    & Pick<Partner, 'id' | 'name' | 'emails' | 'partnerId' | 'createdAt' | 'payerId' | 'clientId' | 'verifiedAccount'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'email' | 'name'>
    ) }
  ) }
);

export type PartnerQueryVariables = {};


export type PartnerQuery = (
  { __typename?: 'Query' }
  & { partners: Array<(
    { __typename?: 'Partner' }
    & Pick<Partner, 'id' | 'name' | 'emails' | 'partnerId' | 'createdAt' | 'payerId' | 'clientId' | 'verifiedAccount'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'email' | 'name'>
    ) }
  )> }
);

export type CreatePostMutationVariables = {
  userId: Scalars['String'];
  postType: Scalars['String'];
  title: Scalars['String'];
  description: Scalars['String'];
  videoUrl: Scalars['String'];
};


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { createPost: (
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'title' | 'postType' | 'description' | 'createdAt' | 'videoUrl'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'email' | 'name'>
    ) }
  ) }
);

export type PostsQueryVariables = {};


export type PostsQuery = (
  { __typename?: 'Query' }
  & { posts: Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'title' | 'postType' | 'description' | 'createdAt' | 'videoUrl'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'email' | 'name'>
    ) }
  )> }
);

export type CreateProductMutationVariables = {
  partnerId: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Float'];
  description: Scalars['String'];
};


export type CreateProductMutation = (
  { __typename?: 'Mutation' }
  & { createProduct: (
    { __typename?: 'Product' }
    & Pick<Product, 'id' | 'name' | 'price' | 'description' | 'createdAt'>
    & { partner: (
      { __typename?: 'Partner' }
      & Pick<Partner, 'id' | 'clientId' | 'name'>
    ) }
  ) }
);

export type ProductsQueryVariables = {};


export type ProductsQuery = (
  { __typename?: 'Query' }
  & { products: Array<(
    { __typename?: 'Product' }
    & Pick<Product, 'id' | 'name' | 'price' | 'description' | 'createdAt'>
    & { partner: (
      { __typename?: 'Partner' }
      & Pick<Partner, 'id' | 'clientId' | 'name'>
    ) }
  )> }
);

export type LoginMutationVariables = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login?: Maybe<(
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'id' | 'email' | 'role' | 'accessToken' | 'name' | 'hasBusiness' | 'businessUserId'>
  )> }
);

export type LogoutMutationVariables = {};


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = {
  email: Scalars['String'];
  password: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  userType: Scalars['String'];
};


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'register'>
);

export type UsersQueryVariables = {};


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'name' | 'firstName' | 'lastName'>
  )> }
);


export const CartsDocument = gql`
    query Carts($customerId: String!) {
  carts(customerId: $customerId) {
    id
    name
    price
    description
    createdAt
    partner {
      id
      clientId
      name
    }
    customer {
      id
      name
    }
    product {
      id
      name
    }
  }
}
    `;

/**
 * __useCartsQuery__
 *
 * To run a query within a React component, call `useCartsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCartsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCartsQuery({
 *   variables: {
 *      customerId: // value for 'customerId'
 *   },
 * });
 */
export function useCartsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CartsQuery, CartsQueryVariables>) {
        return ApolloReactHooks.useQuery<CartsQuery, CartsQueryVariables>(CartsDocument, baseOptions);
      }
export function useCartsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CartsQuery, CartsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CartsQuery, CartsQueryVariables>(CartsDocument, baseOptions);
        }
export type CartsQueryHookResult = ReturnType<typeof useCartsQuery>;
export type CartsLazyQueryHookResult = ReturnType<typeof useCartsLazyQuery>;
export type CartsQueryResult = ApolloReactCommon.QueryResult<CartsQuery, CartsQueryVariables>;
export const CreateCartDocument = gql`
    mutation CreateCart($partnerId: String!, $customerId: String!, $productId: String!, $name: String!, $price: Float!, $description: String!) {
  createCart(partnerId: $partnerId, customerId: $customerId, productId: $productId, name: $name, price: $price, description: $description) {
    id
    name
    price
    description
    createdAt
    partner {
      id
      clientId
      name
    }
    customer {
      id
      name
    }
    product {
      id
      name
    }
  }
}
    `;
export type CreateCartMutationFn = ApolloReactCommon.MutationFunction<CreateCartMutation, CreateCartMutationVariables>;

/**
 * __useCreateCartMutation__
 *
 * To run a mutation, you first call `useCreateCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCartMutation, { data, loading, error }] = useCreateCartMutation({
 *   variables: {
 *      partnerId: // value for 'partnerId'
 *      customerId: // value for 'customerId'
 *      productId: // value for 'productId'
 *      name: // value for 'name'
 *      price: // value for 'price'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useCreateCartMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateCartMutation, CreateCartMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateCartMutation, CreateCartMutationVariables>(CreateCartDocument, baseOptions);
      }
export type CreateCartMutationHookResult = ReturnType<typeof useCreateCartMutation>;
export type CreateCartMutationResult = ApolloReactCommon.MutationResult<CreateCartMutation>;
export type CreateCartMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateCartMutation, CreateCartMutationVariables>;
export const RemoveCartsDocument = gql`
    mutation RemoveCarts($ids: String!) {
  removeCarts(ids: $ids)
}
    `;
export type RemoveCartsMutationFn = ApolloReactCommon.MutationFunction<RemoveCartsMutation, RemoveCartsMutationVariables>;

/**
 * __useRemoveCartsMutation__
 *
 * To run a mutation, you first call `useRemoveCartsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveCartsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeCartsMutation, { data, loading, error }] = useRemoveCartsMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useRemoveCartsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveCartsMutation, RemoveCartsMutationVariables>) {
        return ApolloReactHooks.useMutation<RemoveCartsMutation, RemoveCartsMutationVariables>(RemoveCartsDocument, baseOptions);
      }
export type RemoveCartsMutationHookResult = ReturnType<typeof useRemoveCartsMutation>;
export type RemoveCartsMutationResult = ApolloReactCommon.MutationResult<RemoveCartsMutation>;
export type RemoveCartsMutationOptions = ApolloReactCommon.BaseMutationOptions<RemoveCartsMutation, RemoveCartsMutationVariables>;
export const CreateCustomerDocument = gql`
    mutation CreateCustomer($userId: String!, $name: String!, $emails: String!, $customerId: String!, $payerId: String!, $clientId: String!, $verifiedAccount: String!) {
  createCustomer(userId: $userId, name: $name, emails: $emails, customerId: $customerId, payerId: $payerId, verifiedAccount: $verifiedAccount) {
    id
    name
    emails
    customerId
    createdAt
    payerId
    verifiedAccount
    user {
      email
      name
    }
  }
}
    `;
export type CreateCustomerMutationFn = ApolloReactCommon.MutationFunction<CreateCustomerMutation, CreateCustomerMutationVariables>;

/**
 * __useCreateCustomerMutation__
 *
 * To run a mutation, you first call `useCreateCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCustomerMutation, { data, loading, error }] = useCreateCustomerMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      name: // value for 'name'
 *      emails: // value for 'emails'
 *      customerId: // value for 'customerId'
 *      payerId: // value for 'payerId'
 *      clientId: // value for 'clientId'
 *      verifiedAccount: // value for 'verifiedAccount'
 *   },
 * });
 */
export function useCreateCustomerMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateCustomerMutation, CreateCustomerMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateCustomerMutation, CreateCustomerMutationVariables>(CreateCustomerDocument, baseOptions);
      }
export type CreateCustomerMutationHookResult = ReturnType<typeof useCreateCustomerMutation>;
export type CreateCustomerMutationResult = ApolloReactCommon.MutationResult<CreateCustomerMutation>;
export type CreateCustomerMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateCustomerMutation, CreateCustomerMutationVariables>;
export const CustomerDetailDocument = gql`
    query CustomerDetail($id: String!) {
  customer(id: $id) {
    id
    name
    emails
    customerId
    createdAt
    payerId
    verifiedAccount
    user {
      email
      name
    }
  }
}
    `;

/**
 * __useCustomerDetailQuery__
 *
 * To run a query within a React component, call `useCustomerDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useCustomerDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCustomerDetailQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCustomerDetailQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CustomerDetailQuery, CustomerDetailQueryVariables>) {
        return ApolloReactHooks.useQuery<CustomerDetailQuery, CustomerDetailQueryVariables>(CustomerDetailDocument, baseOptions);
      }
export function useCustomerDetailLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CustomerDetailQuery, CustomerDetailQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CustomerDetailQuery, CustomerDetailQueryVariables>(CustomerDetailDocument, baseOptions);
        }
export type CustomerDetailQueryHookResult = ReturnType<typeof useCustomerDetailQuery>;
export type CustomerDetailLazyQueryHookResult = ReturnType<typeof useCustomerDetailLazyQuery>;
export type CustomerDetailQueryResult = ApolloReactCommon.QueryResult<CustomerDetailQuery, CustomerDetailQueryVariables>;
export const CustomersDocument = gql`
    query Customers {
  customers {
    id
    name
    emails
    customerId
    createdAt
    payerId
    verifiedAccount
    user {
      email
      name
    }
  }
}
    `;

/**
 * __useCustomersQuery__
 *
 * To run a query within a React component, call `useCustomersQuery` and pass it any options that fit your needs.
 * When your component renders, `useCustomersQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCustomersQuery({
 *   variables: {
 *   },
 * });
 */
export function useCustomersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CustomersQuery, CustomersQueryVariables>) {
        return ApolloReactHooks.useQuery<CustomersQuery, CustomersQueryVariables>(CustomersDocument, baseOptions);
      }
export function useCustomersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CustomersQuery, CustomersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CustomersQuery, CustomersQueryVariables>(CustomersDocument, baseOptions);
        }
export type CustomersQueryHookResult = ReturnType<typeof useCustomersQuery>;
export type CustomersLazyQueryHookResult = ReturnType<typeof useCustomersLazyQuery>;
export type CustomersQueryResult = ApolloReactCommon.QueryResult<CustomersQuery, CustomersQueryVariables>;
export const CreateOrderDocument = gql`
    mutation CreateOrder($partnerId: String!, $customerId: String!, $productIds: String!, $name: String!, $price: Float!, $description: String!) {
  createOrder(payerId: $partnerId, customerId: $customerId, productIds: $productIds, name: $name, price: $price, description: $description) {
    id
    name
    price
    description
    createdAt
    customer {
      id
      name
    }
    products {
      id
      name
      partner {
        id
        name
      }
    }
  }
}
    `;
export type CreateOrderMutationFn = ApolloReactCommon.MutationFunction<CreateOrderMutation, CreateOrderMutationVariables>;

/**
 * __useCreateOrderMutation__
 *
 * To run a mutation, you first call `useCreateOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrderMutation, { data, loading, error }] = useCreateOrderMutation({
 *   variables: {
 *      partnerId: // value for 'partnerId'
 *      customerId: // value for 'customerId'
 *      productIds: // value for 'productIds'
 *      name: // value for 'name'
 *      price: // value for 'price'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useCreateOrderMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateOrderMutation, CreateOrderMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateOrderMutation, CreateOrderMutationVariables>(CreateOrderDocument, baseOptions);
      }
export type CreateOrderMutationHookResult = ReturnType<typeof useCreateOrderMutation>;
export type CreateOrderMutationResult = ApolloReactCommon.MutationResult<CreateOrderMutation>;
export type CreateOrderMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateOrderMutation, CreateOrderMutationVariables>;
export const OrdersDocument = gql`
    query Orders($partnerId: String!) {
  orders(partnerId: $partnerId) {
    id
    name
    price
    description
    createdAt
    customer {
      id
      name
    }
    products {
      id
      name
      partner {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useOrdersQuery__
 *
 * To run a query within a React component, call `useOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrdersQuery({
 *   variables: {
 *      partnerId: // value for 'partnerId'
 *   },
 * });
 */
export function useOrdersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<OrdersQuery, OrdersQueryVariables>) {
        return ApolloReactHooks.useQuery<OrdersQuery, OrdersQueryVariables>(OrdersDocument, baseOptions);
      }
export function useOrdersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<OrdersQuery, OrdersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<OrdersQuery, OrdersQueryVariables>(OrdersDocument, baseOptions);
        }
export type OrdersQueryHookResult = ReturnType<typeof useOrdersQuery>;
export type OrdersLazyQueryHookResult = ReturnType<typeof useOrdersLazyQuery>;
export type OrdersQueryResult = ApolloReactCommon.QueryResult<OrdersQuery, OrdersQueryVariables>;
export const CreatePartnerDocument = gql`
    mutation CreatePartner($userId: String!, $name: String!, $emails: String!, $partnerId: String!, $payerId: String!, $clientId: String!, $verifiedAccount: String!) {
  createPartner(userId: $userId, name: $name, emails: $emails, partnerId: $partnerId, payerId: $payerId, clientId: $clientId, verifiedAccount: $verifiedAccount) {
    id
    name
    emails
    partnerId
    createdAt
    payerId
    clientId
    verifiedAccount
    user {
      email
      name
    }
  }
}
    `;
export type CreatePartnerMutationFn = ApolloReactCommon.MutationFunction<CreatePartnerMutation, CreatePartnerMutationVariables>;

/**
 * __useCreatePartnerMutation__
 *
 * To run a mutation, you first call `useCreatePartnerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePartnerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPartnerMutation, { data, loading, error }] = useCreatePartnerMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      name: // value for 'name'
 *      emails: // value for 'emails'
 *      partnerId: // value for 'partnerId'
 *      payerId: // value for 'payerId'
 *      clientId: // value for 'clientId'
 *      verifiedAccount: // value for 'verifiedAccount'
 *   },
 * });
 */
export function useCreatePartnerMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreatePartnerMutation, CreatePartnerMutationVariables>) {
        return ApolloReactHooks.useMutation<CreatePartnerMutation, CreatePartnerMutationVariables>(CreatePartnerDocument, baseOptions);
      }
export type CreatePartnerMutationHookResult = ReturnType<typeof useCreatePartnerMutation>;
export type CreatePartnerMutationResult = ApolloReactCommon.MutationResult<CreatePartnerMutation>;
export type CreatePartnerMutationOptions = ApolloReactCommon.BaseMutationOptions<CreatePartnerMutation, CreatePartnerMutationVariables>;
export const PartnerDetailDocument = gql`
    query PartnerDetail($id: String!) {
  partner(id: $id) {
    id
    name
    emails
    partnerId
    createdAt
    payerId
    clientId
    verifiedAccount
    user {
      email
      name
    }
  }
}
    `;

/**
 * __usePartnerDetailQuery__
 *
 * To run a query within a React component, call `usePartnerDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `usePartnerDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePartnerDetailQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePartnerDetailQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PartnerDetailQuery, PartnerDetailQueryVariables>) {
        return ApolloReactHooks.useQuery<PartnerDetailQuery, PartnerDetailQueryVariables>(PartnerDetailDocument, baseOptions);
      }
export function usePartnerDetailLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PartnerDetailQuery, PartnerDetailQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PartnerDetailQuery, PartnerDetailQueryVariables>(PartnerDetailDocument, baseOptions);
        }
export type PartnerDetailQueryHookResult = ReturnType<typeof usePartnerDetailQuery>;
export type PartnerDetailLazyQueryHookResult = ReturnType<typeof usePartnerDetailLazyQuery>;
export type PartnerDetailQueryResult = ApolloReactCommon.QueryResult<PartnerDetailQuery, PartnerDetailQueryVariables>;
export const PartnerDocument = gql`
    query Partner {
  partners {
    id
    name
    emails
    partnerId
    createdAt
    payerId
    clientId
    verifiedAccount
    user {
      email
      name
    }
  }
}
    `;

/**
 * __usePartnerQuery__
 *
 * To run a query within a React component, call `usePartnerQuery` and pass it any options that fit your needs.
 * When your component renders, `usePartnerQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePartnerQuery({
 *   variables: {
 *   },
 * });
 */
export function usePartnerQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PartnerQuery, PartnerQueryVariables>) {
        return ApolloReactHooks.useQuery<PartnerQuery, PartnerQueryVariables>(PartnerDocument, baseOptions);
      }
export function usePartnerLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PartnerQuery, PartnerQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PartnerQuery, PartnerQueryVariables>(PartnerDocument, baseOptions);
        }
export type PartnerQueryHookResult = ReturnType<typeof usePartnerQuery>;
export type PartnerLazyQueryHookResult = ReturnType<typeof usePartnerLazyQuery>;
export type PartnerQueryResult = ApolloReactCommon.QueryResult<PartnerQuery, PartnerQueryVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($userId: String!, $postType: String!, $title: String!, $description: String!, $videoUrl: String!) {
  createPost(userId: $userId, postType: $postType, title: $title, description: $description, videoUrl: $videoUrl) {
    id
    title
    postType
    description
    createdAt
    videoUrl
    user {
      email
      name
    }
  }
}
    `;
export type CreatePostMutationFn = ApolloReactCommon.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      postType: // value for 'postType'
 *      title: // value for 'title'
 *      description: // value for 'description'
 *      videoUrl: // value for 'videoUrl'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        return ApolloReactHooks.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, baseOptions);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = ApolloReactCommon.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = ApolloReactCommon.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const PostsDocument = gql`
    query Posts {
  posts {
    id
    title
    postType
    description
    createdAt
    videoUrl
    user {
      email
      name
    }
  }
}
    `;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePostsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        return ApolloReactHooks.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, baseOptions);
      }
export function usePostsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, baseOptions);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = ApolloReactCommon.QueryResult<PostsQuery, PostsQueryVariables>;
export const CreateProductDocument = gql`
    mutation CreateProduct($partnerId: String!, $name: String!, $price: Float!, $description: String!) {
  createProduct(partnerId: $partnerId, name: $name, price: $price, description: $description) {
    id
    name
    price
    description
    createdAt
    partner {
      id
      clientId
      name
    }
  }
}
    `;
export type CreateProductMutationFn = ApolloReactCommon.MutationFunction<CreateProductMutation, CreateProductMutationVariables>;

/**
 * __useCreateProductMutation__
 *
 * To run a mutation, you first call `useCreateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductMutation, { data, loading, error }] = useCreateProductMutation({
 *   variables: {
 *      partnerId: // value for 'partnerId'
 *      name: // value for 'name'
 *      price: // value for 'price'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useCreateProductMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateProductMutation, CreateProductMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateProductMutation, CreateProductMutationVariables>(CreateProductDocument, baseOptions);
      }
export type CreateProductMutationHookResult = ReturnType<typeof useCreateProductMutation>;
export type CreateProductMutationResult = ApolloReactCommon.MutationResult<CreateProductMutation>;
export type CreateProductMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateProductMutation, CreateProductMutationVariables>;
export const ProductsDocument = gql`
    query Products {
  products {
    id
    name
    price
    description
    createdAt
    partner {
      id
      clientId
      name
    }
  }
}
    `;

/**
 * __useProductsQuery__
 *
 * To run a query within a React component, call `useProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductsQuery({
 *   variables: {
 *   },
 * });
 */
export function useProductsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
        return ApolloReactHooks.useQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, baseOptions);
      }
export function useProductsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, baseOptions);
        }
export type ProductsQueryHookResult = ReturnType<typeof useProductsQuery>;
export type ProductsLazyQueryHookResult = ReturnType<typeof useProductsLazyQuery>;
export type ProductsQueryResult = ApolloReactCommon.QueryResult<ProductsQuery, ProductsQueryVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    id
    email
    role
    accessToken
    name
    hasBusiness
    businessUserId
  }
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = ApolloReactCommon.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($email: String!, $password: String!, $firstName: String!, $lastName: String!, $userType: String!) {
  register(email: $email, password: $password, firstName: $firstName, lastName: $lastName, userType: $userType)
}
    `;
export type RegisterMutationFn = ApolloReactCommon.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      userType: // value for 'userType'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return ApolloReactHooks.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = ApolloReactCommon.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const UsersDocument = gql`
    query Users {
  users {
    id
    email
    name
    firstName
    lastName
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        return ApolloReactHooks.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
      }
export function useUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = ApolloReactCommon.QueryResult<UsersQuery, UsersQueryVariables>;