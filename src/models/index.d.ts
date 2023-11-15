import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";

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

type EagerBillingDetails = {
  readonly firstName: string;
  readonly lastName: string;
  readonly company?: string | null;
  readonly country: string;
  readonly city: string;
  readonly address: string;
  readonly address2?: string | null;
  readonly phone?: string | null;
  readonly postalCode: string;
}

type LazyBillingDetails = {
  readonly firstName: string;
  readonly lastName: string;
  readonly company?: string | null;
  readonly country: string;
  readonly city: string;
  readonly address: string;
  readonly address2?: string | null;
  readonly phone?: string | null;
  readonly postalCode: string;
}

export declare type BillingDetails = LazyLoading extends LazyLoadingDisabled ? EagerBillingDetails : LazyBillingDetails

export declare const BillingDetails: (new (init: ModelInit<BillingDetails>) => BillingDetails)

type EagerShippingDetails = {
  readonly firstName: string;
  readonly lastName: string;
  readonly company?: string | null;
  readonly country: string;
  readonly city: string;
  readonly address: string;
  readonly address2?: string | null;
  readonly phone?: string | null;
  readonly postalCode: string;
}

type LazyShippingDetails = {
  readonly firstName: string;
  readonly lastName: string;
  readonly company?: string | null;
  readonly country: string;
  readonly city: string;
  readonly address: string;
  readonly address2?: string | null;
  readonly phone?: string | null;
  readonly postalCode: string;
}

export declare type ShippingDetails = LazyLoading extends LazyLoadingDisabled ? EagerShippingDetails : LazyShippingDetails

export declare const ShippingDetails: (new (init: ModelInit<ShippingDetails>) => ShippingDetails)

type EagerProducts = {
  readonly productId: string;
  readonly name?: string | null;
  readonly image?: string | null;
  readonly slug?: string | null;
  readonly price: number;
  readonly currency: Currencies | keyof typeof Currencies;
  readonly quantity: number;
}

type LazyProducts = {
  readonly productId: string;
  readonly name?: string | null;
  readonly image?: string | null;
  readonly slug?: string | null;
  readonly price: number;
  readonly currency: Currencies | keyof typeof Currencies;
  readonly quantity: number;
}

export declare type Products = LazyLoading extends LazyLoadingDisabled ? EagerProducts : LazyProducts

export declare const Products: (new (init: ModelInit<Products>) => Products)

type EagerTotal = {
  readonly amount: number;
  readonly currency: Currencies | keyof typeof Currencies;
}

type LazyTotal = {
  readonly amount: number;
  readonly currency: Currencies | keyof typeof Currencies;
}

export declare type Total = LazyLoading extends LazyLoadingDisabled ? EagerTotal : LazyTotal

export declare const Total: (new (init: ModelInit<Total>) => Total)

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type OrderMetaData = {
  readOnlyFields: 'updatedAt';
}

type EagerUser = {
  readonly id: string;
  readonly username: string;
  readonly owner: string;
  readonly paypalOrderId?: (string | null)[] | null;
  readonly visitDateTime?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly id: string;
  readonly username: string;
  readonly owner: string;
  readonly paypalOrderId?: (string | null)[] | null;
  readonly visitDateTime?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User, UserMetaData>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}

type EagerOrder = {
  readonly id: string;
  readonly username?: string | null;
  readonly owner: string;
  readonly email: string;
  readonly paypalOrderId: string;
  readonly status: OrderStatus | keyof typeof OrderStatus;
  readonly shippingType: ShippingType | keyof typeof ShippingType;
  readonly shippingCost?: number | null;
  readonly shippingDetails: ShippingDetails;
  readonly billingDetails: BillingDetails;
  readonly products?: Products[] | null;
  readonly total: Total;
  readonly createdAt: string;
  readonly remarks?: string | null;
  readonly billingAsShipping?: boolean | null;
  readonly updatedAt?: string | null;
}

type LazyOrder = {
  readonly id: string;
  readonly username?: string | null;
  readonly owner: string;
  readonly email: string;
  readonly paypalOrderId: string;
  readonly status: OrderStatus | keyof typeof OrderStatus;
  readonly shippingType: ShippingType | keyof typeof ShippingType;
  readonly shippingCost?: number | null;
  readonly shippingDetails: ShippingDetails;
  readonly billingDetails: BillingDetails;
  readonly products?: Products[] | null;
  readonly total: Total;
  readonly createdAt: string;
  readonly remarks?: string | null;
  readonly billingAsShipping?: boolean | null;
  readonly updatedAt?: string | null;
}

export declare type Order = LazyLoading extends LazyLoadingDisabled ? EagerOrder : LazyOrder

export declare const Order: (new (init: ModelInit<Order, OrderMetaData>) => Order) & {
  copyOf(source: Order, mutator: (draft: MutableModel<Order, OrderMetaData>) => MutableModel<Order, OrderMetaData> | void): Order;
}