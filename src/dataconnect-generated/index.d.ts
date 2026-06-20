import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise, DataConnectSettings } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface CreateOrderData {
  order_insert: Order_Key;
}

export interface CreateOrderVariables {
  userId: UUIDString;
  totalAmount: number;
  status: string;
}

export interface GetUserSubscriptionsData {
  userSubscriptions: ({
    startDate: TimestampString;
    endDate: TimestampString;
    status: string;
    product: {
      name: string;
      price: number;
    };
  })[];
}

export interface GetUserSubscriptionsVariables {
  userId: UUIDString;
}

export interface ListServiceRequestsData {
  serviceRequests: ({
    status: string;
    details: string;
    order: {
      totalAmount: number;
      user: {
        displayName: string;
      };
    };
  })[];
}

export interface OrderItem_Key {
  id: UUIDString;
  __typename?: 'OrderItem_Key';
}

export interface Order_Key {
  id: UUIDString;
  __typename?: 'Order_Key';
}

export interface Product_Key {
  id: UUIDString;
  __typename?: 'Product_Key';
}

export interface ServiceRequest_Key {
  id: UUIDString;
  __typename?: 'ServiceRequest_Key';
}

export interface UpdateProductPriceData {
  product_update?: Product_Key | null;
}

export interface UpdateProductPriceVariables {
  id: UUIDString;
  newPrice: number;
}

export interface UserSubscription_Key {
  id: UUIDString;
  __typename?: 'UserSubscription_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateOrderRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateOrderVariables): MutationRef<CreateOrderData, CreateOrderVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateOrderVariables): MutationRef<CreateOrderData, CreateOrderVariables>;
  operationName: string;
}
export const createOrderRef: CreateOrderRef;

export function createOrder(vars: CreateOrderVariables): MutationPromise<CreateOrderData, CreateOrderVariables>;
export function createOrder(dc: DataConnect, vars: CreateOrderVariables): MutationPromise<CreateOrderData, CreateOrderVariables>;

interface UpdateProductPriceRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateProductPriceVariables): MutationRef<UpdateProductPriceData, UpdateProductPriceVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateProductPriceVariables): MutationRef<UpdateProductPriceData, UpdateProductPriceVariables>;
  operationName: string;
}
export const updateProductPriceRef: UpdateProductPriceRef;

export function updateProductPrice(vars: UpdateProductPriceVariables): MutationPromise<UpdateProductPriceData, UpdateProductPriceVariables>;
export function updateProductPrice(dc: DataConnect, vars: UpdateProductPriceVariables): MutationPromise<UpdateProductPriceData, UpdateProductPriceVariables>;

interface GetUserSubscriptionsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserSubscriptionsVariables): QueryRef<GetUserSubscriptionsData, GetUserSubscriptionsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetUserSubscriptionsVariables): QueryRef<GetUserSubscriptionsData, GetUserSubscriptionsVariables>;
  operationName: string;
}
export const getUserSubscriptionsRef: GetUserSubscriptionsRef;

export function getUserSubscriptions(vars: GetUserSubscriptionsVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserSubscriptionsData, GetUserSubscriptionsVariables>;
export function getUserSubscriptions(dc: DataConnect, vars: GetUserSubscriptionsVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserSubscriptionsData, GetUserSubscriptionsVariables>;

interface ListServiceRequestsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListServiceRequestsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListServiceRequestsData, undefined>;
  operationName: string;
}
export const listServiceRequestsRef: ListServiceRequestsRef;

export function listServiceRequests(options?: ExecuteQueryOptions): QueryPromise<ListServiceRequestsData, undefined>;
export function listServiceRequests(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListServiceRequestsData, undefined>;

