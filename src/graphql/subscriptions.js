/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
    }
  }
`;
export const onCreateOrder = /* GraphQL */ `
  subscription OnCreateOrder {
    onCreateOrder {
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
    }
  }
`;
export const onUpdateOrder = /* GraphQL */ `
  subscription OnUpdateOrder {
    onUpdateOrder {
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
    }
  }
`;
export const onDeleteOrder = /* GraphQL */ `
  subscription OnDeleteOrder {
    onDeleteOrder {
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
    }
  }
`;
