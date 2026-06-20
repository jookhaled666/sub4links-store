import { CreateOrderData, CreateOrderVariables, UpdateProductPriceData, UpdateProductPriceVariables, GetUserSubscriptionsData, GetUserSubscriptionsVariables, ListServiceRequestsData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateOrder(options?: useDataConnectMutationOptions<CreateOrderData, FirebaseError, CreateOrderVariables>): UseDataConnectMutationResult<CreateOrderData, CreateOrderVariables>;
export function useCreateOrder(dc: DataConnect, options?: useDataConnectMutationOptions<CreateOrderData, FirebaseError, CreateOrderVariables>): UseDataConnectMutationResult<CreateOrderData, CreateOrderVariables>;

export function useUpdateProductPrice(options?: useDataConnectMutationOptions<UpdateProductPriceData, FirebaseError, UpdateProductPriceVariables>): UseDataConnectMutationResult<UpdateProductPriceData, UpdateProductPriceVariables>;
export function useUpdateProductPrice(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateProductPriceData, FirebaseError, UpdateProductPriceVariables>): UseDataConnectMutationResult<UpdateProductPriceData, UpdateProductPriceVariables>;

export function useGetUserSubscriptions(vars: GetUserSubscriptionsVariables, options?: useDataConnectQueryOptions<GetUserSubscriptionsData>): UseDataConnectQueryResult<GetUserSubscriptionsData, GetUserSubscriptionsVariables>;
export function useGetUserSubscriptions(dc: DataConnect, vars: GetUserSubscriptionsVariables, options?: useDataConnectQueryOptions<GetUserSubscriptionsData>): UseDataConnectQueryResult<GetUserSubscriptionsData, GetUserSubscriptionsVariables>;

export function useListServiceRequests(options?: useDataConnectQueryOptions<ListServiceRequestsData>): UseDataConnectQueryResult<ListServiceRequestsData, undefined>;
export function useListServiceRequests(dc: DataConnect, options?: useDataConnectQueryOptions<ListServiceRequestsData>): UseDataConnectQueryResult<ListServiceRequestsData, undefined>;
