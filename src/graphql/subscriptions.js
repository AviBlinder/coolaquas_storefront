/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateOrder = /* GraphQL */ `
  subscription OnCreateOrder {
    onCreateOrder {
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
export const onUpdateOrder = /* GraphQL */ `
  subscription OnUpdateOrder {
    onUpdateOrder {
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
export const onDeleteOrder = /* GraphQL */ `
  subscription OnDeleteOrder {
    onDeleteOrder {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
