# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetUserSubscriptions*](#getusersubscriptions)
  - [*ListServiceRequests*](#listservicerequests)
- [**Mutations**](#mutations)
  - [*CreateOrder*](#createorder)
  - [*UpdateProductPrice*](#updateproductprice)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetUserSubscriptions
You can execute the `GetUserSubscriptions` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getUserSubscriptions(vars: GetUserSubscriptionsVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserSubscriptionsData, GetUserSubscriptionsVariables>;

interface GetUserSubscriptionsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserSubscriptionsVariables): QueryRef<GetUserSubscriptionsData, GetUserSubscriptionsVariables>;
}
export const getUserSubscriptionsRef: GetUserSubscriptionsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUserSubscriptions(dc: DataConnect, vars: GetUserSubscriptionsVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserSubscriptionsData, GetUserSubscriptionsVariables>;

interface GetUserSubscriptionsRef {
  ...
  (dc: DataConnect, vars: GetUserSubscriptionsVariables): QueryRef<GetUserSubscriptionsData, GetUserSubscriptionsVariables>;
}
export const getUserSubscriptionsRef: GetUserSubscriptionsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserSubscriptionsRef:
```typescript
const name = getUserSubscriptionsRef.operationName;
console.log(name);
```

### Variables
The `GetUserSubscriptions` query requires an argument of type `GetUserSubscriptionsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetUserSubscriptionsVariables {
  userId: UUIDString;
}
```
### Return Type
Recall that executing the `GetUserSubscriptions` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserSubscriptionsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetUserSubscriptions`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUserSubscriptions, GetUserSubscriptionsVariables } from '@dataconnect/generated';

// The `GetUserSubscriptions` query requires an argument of type `GetUserSubscriptionsVariables`:
const getUserSubscriptionsVars: GetUserSubscriptionsVariables = {
  userId: ..., 
};

// Call the `getUserSubscriptions()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUserSubscriptions(getUserSubscriptionsVars);
// Variables can be defined inline as well.
const { data } = await getUserSubscriptions({ userId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUserSubscriptions(dataConnect, getUserSubscriptionsVars);

console.log(data.userSubscriptions);

// Or, you can use the `Promise` API.
getUserSubscriptions(getUserSubscriptionsVars).then((response) => {
  const data = response.data;
  console.log(data.userSubscriptions);
});
```

### Using `GetUserSubscriptions`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserSubscriptionsRef, GetUserSubscriptionsVariables } from '@dataconnect/generated';

// The `GetUserSubscriptions` query requires an argument of type `GetUserSubscriptionsVariables`:
const getUserSubscriptionsVars: GetUserSubscriptionsVariables = {
  userId: ..., 
};

// Call the `getUserSubscriptionsRef()` function to get a reference to the query.
const ref = getUserSubscriptionsRef(getUserSubscriptionsVars);
// Variables can be defined inline as well.
const ref = getUserSubscriptionsRef({ userId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserSubscriptionsRef(dataConnect, getUserSubscriptionsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.userSubscriptions);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.userSubscriptions);
});
```

## ListServiceRequests
You can execute the `ListServiceRequests` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listServiceRequests(options?: ExecuteQueryOptions): QueryPromise<ListServiceRequestsData, undefined>;

interface ListServiceRequestsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListServiceRequestsData, undefined>;
}
export const listServiceRequestsRef: ListServiceRequestsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listServiceRequests(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListServiceRequestsData, undefined>;

interface ListServiceRequestsRef {
  ...
  (dc: DataConnect): QueryRef<ListServiceRequestsData, undefined>;
}
export const listServiceRequestsRef: ListServiceRequestsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listServiceRequestsRef:
```typescript
const name = listServiceRequestsRef.operationName;
console.log(name);
```

### Variables
The `ListServiceRequests` query has no variables.
### Return Type
Recall that executing the `ListServiceRequests` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListServiceRequestsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListServiceRequests`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listServiceRequests } from '@dataconnect/generated';


// Call the `listServiceRequests()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listServiceRequests();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listServiceRequests(dataConnect);

console.log(data.serviceRequests);

// Or, you can use the `Promise` API.
listServiceRequests().then((response) => {
  const data = response.data;
  console.log(data.serviceRequests);
});
```

### Using `ListServiceRequests`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listServiceRequestsRef } from '@dataconnect/generated';


// Call the `listServiceRequestsRef()` function to get a reference to the query.
const ref = listServiceRequestsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listServiceRequestsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.serviceRequests);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.serviceRequests);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateOrder
You can execute the `CreateOrder` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createOrder(vars: CreateOrderVariables): MutationPromise<CreateOrderData, CreateOrderVariables>;

interface CreateOrderRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateOrderVariables): MutationRef<CreateOrderData, CreateOrderVariables>;
}
export const createOrderRef: CreateOrderRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createOrder(dc: DataConnect, vars: CreateOrderVariables): MutationPromise<CreateOrderData, CreateOrderVariables>;

interface CreateOrderRef {
  ...
  (dc: DataConnect, vars: CreateOrderVariables): MutationRef<CreateOrderData, CreateOrderVariables>;
}
export const createOrderRef: CreateOrderRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createOrderRef:
```typescript
const name = createOrderRef.operationName;
console.log(name);
```

### Variables
The `CreateOrder` mutation requires an argument of type `CreateOrderVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateOrderVariables {
  userId: UUIDString;
  totalAmount: number;
  status: string;
}
```
### Return Type
Recall that executing the `CreateOrder` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateOrderData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateOrderData {
  order_insert: Order_Key;
}
```
### Using `CreateOrder`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createOrder, CreateOrderVariables } from '@dataconnect/generated';

// The `CreateOrder` mutation requires an argument of type `CreateOrderVariables`:
const createOrderVars: CreateOrderVariables = {
  userId: ..., 
  totalAmount: ..., 
  status: ..., 
};

// Call the `createOrder()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createOrder(createOrderVars);
// Variables can be defined inline as well.
const { data } = await createOrder({ userId: ..., totalAmount: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createOrder(dataConnect, createOrderVars);

console.log(data.order_insert);

// Or, you can use the `Promise` API.
createOrder(createOrderVars).then((response) => {
  const data = response.data;
  console.log(data.order_insert);
});
```

### Using `CreateOrder`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createOrderRef, CreateOrderVariables } from '@dataconnect/generated';

// The `CreateOrder` mutation requires an argument of type `CreateOrderVariables`:
const createOrderVars: CreateOrderVariables = {
  userId: ..., 
  totalAmount: ..., 
  status: ..., 
};

// Call the `createOrderRef()` function to get a reference to the mutation.
const ref = createOrderRef(createOrderVars);
// Variables can be defined inline as well.
const ref = createOrderRef({ userId: ..., totalAmount: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createOrderRef(dataConnect, createOrderVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.order_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.order_insert);
});
```

## UpdateProductPrice
You can execute the `UpdateProductPrice` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateProductPrice(vars: UpdateProductPriceVariables): MutationPromise<UpdateProductPriceData, UpdateProductPriceVariables>;

interface UpdateProductPriceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateProductPriceVariables): MutationRef<UpdateProductPriceData, UpdateProductPriceVariables>;
}
export const updateProductPriceRef: UpdateProductPriceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateProductPrice(dc: DataConnect, vars: UpdateProductPriceVariables): MutationPromise<UpdateProductPriceData, UpdateProductPriceVariables>;

interface UpdateProductPriceRef {
  ...
  (dc: DataConnect, vars: UpdateProductPriceVariables): MutationRef<UpdateProductPriceData, UpdateProductPriceVariables>;
}
export const updateProductPriceRef: UpdateProductPriceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateProductPriceRef:
```typescript
const name = updateProductPriceRef.operationName;
console.log(name);
```

### Variables
The `UpdateProductPrice` mutation requires an argument of type `UpdateProductPriceVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateProductPriceVariables {
  id: UUIDString;
  newPrice: number;
}
```
### Return Type
Recall that executing the `UpdateProductPrice` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateProductPriceData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateProductPriceData {
  product_update?: Product_Key | null;
}
```
### Using `UpdateProductPrice`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateProductPrice, UpdateProductPriceVariables } from '@dataconnect/generated';

// The `UpdateProductPrice` mutation requires an argument of type `UpdateProductPriceVariables`:
const updateProductPriceVars: UpdateProductPriceVariables = {
  id: ..., 
  newPrice: ..., 
};

// Call the `updateProductPrice()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateProductPrice(updateProductPriceVars);
// Variables can be defined inline as well.
const { data } = await updateProductPrice({ id: ..., newPrice: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateProductPrice(dataConnect, updateProductPriceVars);

console.log(data.product_update);

// Or, you can use the `Promise` API.
updateProductPrice(updateProductPriceVars).then((response) => {
  const data = response.data;
  console.log(data.product_update);
});
```

### Using `UpdateProductPrice`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateProductPriceRef, UpdateProductPriceVariables } from '@dataconnect/generated';

// The `UpdateProductPrice` mutation requires an argument of type `UpdateProductPriceVariables`:
const updateProductPriceVars: UpdateProductPriceVariables = {
  id: ..., 
  newPrice: ..., 
};

// Call the `updateProductPriceRef()` function to get a reference to the mutation.
const ref = updateProductPriceRef(updateProductPriceVars);
// Variables can be defined inline as well.
const ref = updateProductPriceRef({ id: ..., newPrice: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateProductPriceRef(dataConnect, updateProductPriceVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.product_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.product_update);
});
```

