// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const OrderStatus = {
  "NEW": "NEW",
  "IN_PROGRESS": "IN_PROGRESS",
  "SHIPPED": "SHIPPED",
  "DELIVERED": "DELIVERED"
};

const ShippingType = {
  "PICKUP": "PICKUP",
  "STANDARD": "STANDARD",
  "EXPRESS": "EXPRESS"
};

const Currencies = {
  "USD": "USD",
  "ILS": "ILS",
  "EUR": "EUR",
  "CAD": "CAD",
  "JPY": "JPY",
  "AUD": "AUD"
};

const { User, Order, BillingDetails, ShippingDetails, Products, Total } = initSchema(schema);

export {
  User,
  Order,
  OrderStatus,
  ShippingType,
  Currencies,
  BillingDetails,
  ShippingDetails,
  Products,
  Total
};