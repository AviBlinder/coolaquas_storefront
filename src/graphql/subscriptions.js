/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($owner: String) {
    onCreateUser(owner: $owner) {
      username
      paypalOrderId
      visitDateTime
      device
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($owner: String) {
    onUpdateUser(owner: $owner) {
      username
      paypalOrderId
      visitDateTime
      device
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($owner: String) {
    onDeleteUser(owner: $owner) {
      username
      paypalOrderId
      visitDateTime
      device
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onCreateOrder = /* GraphQL */ `
  subscription OnCreateOrder($owner: String) {
    onCreateOrder(owner: $owner) {
      id
      username
      userId
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
      owner
    }
  }
`;
export const onUpdateOrder = /* GraphQL */ `
  subscription OnUpdateOrder($owner: String) {
    onUpdateOrder(owner: $owner) {
      id
      username
      userId
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
      owner
    }
  }
`;
export const onDeleteOrder = /* GraphQL */ `
  subscription OnDeleteOrder($owner: String) {
    onDeleteOrder(owner: $owner) {
      id
      username
      userId
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
      owner
    }
  }
`;
