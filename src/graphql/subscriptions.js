/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($owner: String) {
    onCreateUser(owner: $owner) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($owner: String) {
    onUpdateUser(owner: $owner) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($owner: String) {
    onDeleteUser(owner: $owner) {
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
export const onCreateOrder = /* GraphQL */ `
  subscription OnCreateOrder($owner: String) {
    onCreateOrder(owner: $owner) {
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
export const onUpdateOrder = /* GraphQL */ `
  subscription OnUpdateOrder($owner: String) {
    onUpdateOrder(owner: $owner) {
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
export const onDeleteOrder = /* GraphQL */ `
  subscription OnDeleteOrder($owner: String) {
    onDeleteOrder(owner: $owner) {
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
