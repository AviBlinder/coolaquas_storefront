/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createOrder = /* GraphQL */ `
  mutation CreateOrder(
    $input: CreateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    createOrder(input: $input, condition: $condition) {
      id
      orderId
      email
      shippingCost
      shippingType
      status
      total {
        amount
        currency
      }
      shippingDetails {
        firstName
        lastName
        company
        country
        city
        address
        postalCode
      }
      billingDetails {
        firstName
        lastName
        company
        country
        city
        address
        postalCode
      }
      products {
        id
        price
        currency
        quantity
      }
      User {
        id
        username
        shippingDetails {
          firstName
          lastName
          company
          country
          city
          address
          postalCode
        }
        billingDetails {
          firstName
          lastName
          company
          country
          city
          address
          postalCode
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      orderUserId
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
      orderId
      email
      shippingCost
      shippingType
      status
      total {
        amount
        currency
      }
      shippingDetails {
        firstName
        lastName
        company
        country
        city
        address
        postalCode
      }
      billingDetails {
        firstName
        lastName
        company
        country
        city
        address
        postalCode
      }
      products {
        id
        price
        currency
        quantity
      }
      User {
        id
        username
        shippingDetails {
          firstName
          lastName
          company
          country
          city
          address
          postalCode
        }
        billingDetails {
          firstName
          lastName
          company
          country
          city
          address
          postalCode
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      orderUserId
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
      orderId
      email
      shippingCost
      shippingType
      status
      total {
        amount
        currency
      }
      shippingDetails {
        firstName
        lastName
        company
        country
        city
        address
        postalCode
      }
      billingDetails {
        firstName
        lastName
        company
        country
        city
        address
        postalCode
      }
      products {
        id
        price
        currency
        quantity
      }
      User {
        id
        username
        shippingDetails {
          firstName
          lastName
          company
          country
          city
          address
          postalCode
        }
        billingDetails {
          firstName
          lastName
          company
          country
          city
          address
          postalCode
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      orderUserId
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      username
      shippingDetails {
        firstName
        lastName
        company
        country
        city
        address
        postalCode
      }
      billingDetails {
        firstName
        lastName
        company
        country
        city
        address
        postalCode
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      username
      shippingDetails {
        firstName
        lastName
        company
        country
        city
        address
        postalCode
      }
      billingDetails {
        firstName
        lastName
        company
        country
        city
        address
        postalCode
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      username
      shippingDetails {
        firstName
        lastName
        company
        country
        city
        address
        postalCode
      }
      billingDetails {
        firstName
        lastName
        company
        country
        city
        address
        postalCode
      }
      createdAt
      updatedAt
    }
  }
`;
