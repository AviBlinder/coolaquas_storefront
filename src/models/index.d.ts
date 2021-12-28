import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum OrderStatus {
  NEW = "NEW",
  IN_PROGRESS = "IN_PROGRESS",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED"
}

export enum ShippingType {
  PICKUP = "PICKUP",
  STANDARD = "STANDARD",
  EXPRESS = "EXPRESS"
}

export enum Currencies {
  USD = "USD",
  ILS = "ILS",
  EUR = "EUR",
  CAD = "CAD",
  JPY = "JPY",
  AUD = "AUD"
}

export declare class ShippingDetails {
  readonly firstName: string;
  readonly lastName: string;
  readonly company?: string;
  readonly country: string;
  readonly city: string;
  readonly address: string;
  readonly address2?: string;
  readonly phone?: string;
  readonly postalCode: string;
  constructor(init: ModelInit<ShippingDetails>);
}

export declare class BillingDetails {
  readonly firstName: string;
  readonly lastName: string;
  readonly company?: string;
  readonly country: string;
  readonly city: string;
  readonly address: string;
  readonly address2?: string;
  readonly phone?: string;
  readonly postalCode: string;
  constructor(init: ModelInit<BillingDetails>);
}

export declare class Products {
  readonly productId: string;
  readonly name?: string;
  readonly price: number;
  readonly currency: Currencies | keyof typeof Currencies;
  readonly quantity: number;
  constructor(init: ModelInit<Products>);
}

export declare class Total {
  readonly amount: number;
  readonly currency: Currencies | keyof typeof Currencies;
  constructor(init: ModelInit<Total>);
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type OrderMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class User {
  readonly id: string;
  readonly username: string;
  readonly owner: string;
  readonly paypalOrderId?: (string | null)[];
  readonly visitDateTime?: (string | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}

export declare class Order {
  readonly id: string;
  readonly username?: string;
  readonly owner: string;
  readonly email: string;
  readonly paypalOrderId: string;
  readonly status: OrderStatus | keyof typeof OrderStatus;
  readonly shippingType: ShippingType | keyof typeof ShippingType;
  readonly shippingCost?: number;
  readonly shippingDetails: ShippingDetails;
  readonly billingDetails: BillingDetails;
  readonly products?: Products[];
  readonly total: Total;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Order, OrderMetaData>);
  static copyOf(source: Order, mutator: (draft: MutableModel<Order, OrderMetaData>) => MutableModel<Order, OrderMetaData> | void): Order;
}