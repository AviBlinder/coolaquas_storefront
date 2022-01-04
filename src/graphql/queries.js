/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUserByOwnerId = /* GraphQL */ `
  query GetUserByOwnerId($owner: String!) {
    getUserByOwnerId(owner: $owner) {
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
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncUsers = /* GraphQL */ `
  query SyncUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getOrder = /* GraphQL */ `
  query GetOrder($id: ID!) {
    getOrder(id: $id) {
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
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listOrders = /* GraphQL */ `
  query ListOrders(
    $id: ID
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listOrders(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncOrders = /* GraphQL */ `
  query SyncOrders(
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncOrders(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const byOwner = /* GraphQL */ `
  query ByOwner(
    $owner: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byOwner(
      owner: $owner
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
