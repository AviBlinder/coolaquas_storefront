/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getOrder = /* GraphQL */ `
  query GetOrder($id: ID!) {
    getOrder(id: $id) {
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
export const listOrders = /* GraphQL */ `
  query ListOrders(
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrders(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        orderUserId
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
