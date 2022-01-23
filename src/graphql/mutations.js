/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      username
      owner
      paypalOrderId
      visitDateTime
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      username
      owner
      paypalOrderId
      visitDateTime
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      username
      owner
      paypalOrderId
      visitDateTime
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createOrder = /* GraphQL */ `
  mutation CreateOrder(
    $input: CreateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    createOrder(input: $input, condition: $condition) {
      id
      username
      owner
      email
      paypalOrderId
      status
      shippingType
      shippingCost
      shippingDetails {
        firstName
        lastName
        company
        country
        city
        address
        address2
        phone
        postalCode
      }
      billingDetails {
        firstName
        lastName
        company
        country
        city
        address
        address2
        phone
        postalCode
      }
      products {
        productId
        name
        image
        slug
        price
        currency
        quantity
      }
      total {
        amount
        currency
      }
      createdAt
      remarks
      billingAsShipping
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateOrder = /* GraphQL */ `
  mutation UpdateOrder(
    $input: UpdateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    updateOrder(input: $input, condition: $condition) {
      id
      username
      owner
      email
      paypalOrderId
      status
      shippingType
      shippingCost
      shippingDetails {
        firstName
        lastName
        company
        country
        city
        address
        address2
        phone
        postalCode
      }
      billingDetails {
        firstName
        lastName
        company
        country
        city
        address
        address2
        phone
        postalCode
      }
      products {
        productId
        name
        image
        slug
        price
        currency
        quantity
      }
      total {
        amount
        currency
      }
      createdAt
      remarks
      billingAsShipping
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteOrder = /* GraphQL */ `
  mutation DeleteOrder(
    $input: DeleteOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    deleteOrder(input: $input, condition: $condition) {
      id
      username
      owner
      email
      paypalOrderId
      status
      shippingType
      shippingCost
      shippingDetails {
        firstName
        lastName
        company
        country
        city
        address
        address2
        phone
        postalCode
      }
      billingDetails {
        firstName
        lastName
        company
        country
        city
        address
        address2
        phone
        postalCode
      }
      products {
        productId
        name
        image
        slug
        price
        currency
        quantity
      }
      total {
        amount
        currency
      }
      createdAt
      remarks
      billingAsShipping
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
