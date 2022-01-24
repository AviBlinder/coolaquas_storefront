type BillingDetails @aws_iam
@aws_cognito_user_pools
@aws_api_key {
	firstName: String!
	lastName: String!
	company: String
	country: String!
	city: String!
	address: String!
	address2: String
	phone: String
	postalCode: String!
}

input BillingDetailsInput {
	firstName: String!
	lastName: String!
	company: String
	country: String!
	city: String!
	address: String!
	address2: String
	phone: String
	postalCode: String!
}

input CreateOrderInput {
	id: ID
	username: String
	owner: String!
	email: String!
	paypalOrderId: String!
	status: OrderStatus!
	shippingType: ShippingType!
	shippingCost: Float
	shippingDetails: ShippingDetailsInput!
	billingDetails: BillingDetailsInput!
	products: [ProductsInput!]
	total: TotalInput!
	createdAt: AWSDateTime
	remarks: String
	billingAsShipping: Boolean
	_version: Int
}

input CreateUserInput {
	username: AWSEmail!
	owner: String!
	paypalOrderId: [String]
	visitDateTime: [AWSDateTime]
	id: ID
	_version: Int
}

enum Currencies {
	USD
	ILS
	EUR
	CAD
	JPY
	AUD
}

input DeleteOrderInput {
	id: ID!
	_version: Int
}

input DeleteUserInput {
	id: ID!
	_version: Int
}

enum ModelAttributeTypes {
	binary
	binarySet
	bool
	list
	map
	number
	numberSet
	string
	stringSet
	_null
}

input ModelBooleanInput {
	ne: Boolean
	eq: Boolean
	attributeExists: Boolean
	attributeType: ModelAttributeTypes
}

input ModelFloatInput {
	ne: Float
	eq: Float
	le: Float
	lt: Float
	ge: Float
	gt: Float
	between: [Float]
	attributeExists: Boolean
	attributeType: ModelAttributeTypes
}

input ModelIDInput {
	ne: ID
	eq: ID
	le: ID
	lt: ID
	ge: ID
	gt: ID
	contains: ID
	notContains: ID
	between: [ID]
	beginsWith: ID
	attributeExists: Boolean
	attributeType: ModelAttributeTypes
	size: ModelSizeInput
}

input ModelIntInput {
	ne: Int
	eq: Int
	le: Int
	lt: Int
	ge: Int
	gt: Int
	between: [Int]
	attributeExists: Boolean
	attributeType: ModelAttributeTypes
}

input ModelOrderConditionInput {
	username: ModelStringInput
	owner: ModelStringInput
	email: ModelStringInput
	paypalOrderId: ModelStringInput
	status: ModelOrderStatusInput
	shippingType: ModelShippingTypeInput
	shippingCost: ModelFloatInput
	createdAt: ModelStringInput
	remarks: ModelStringInput
	billingAsShipping: ModelBooleanInput
	and: [ModelOrderConditionInput]
	or: [ModelOrderConditionInput]
	not: ModelOrderConditionInput
}

type ModelOrderConnection @aws_api_key
@aws_iam
@aws_cognito_user_pools {
	items: [Order]!
	nextToken: String
	startedAt: AWSTimestamp
}

input ModelOrderFilterInput {
	id: ModelIDInput
	username: ModelStringInput
	owner: ModelStringInput
	email: ModelStringInput
	paypalOrderId: ModelStringInput
	status: ModelOrderStatusInput
	shippingType: ModelShippingTypeInput
	shippingCost: ModelFloatInput
	createdAt: ModelStringInput
	remarks: ModelStringInput
	billingAsShipping: ModelBooleanInput
	and: [ModelOrderFilterInput]
	or: [ModelOrderFilterInput]
	not: ModelOrderFilterInput
}

input ModelOrderStatusInput {
	eq: OrderStatus
	ne: OrderStatus
}

input ModelShippingTypeInput {
	eq: ShippingType
	ne: ShippingType
}

input ModelSizeInput {
	ne: Int
	eq: Int
	le: Int
	lt: Int
	ge: Int
	gt: Int
	between: [Int]
}

enum ModelSortDirection {
	ASC
	DESC
}

input ModelStringInput {
	ne: String
	eq: String
	le: String
	lt: String
	ge: String
	gt: String
	contains: String
	notContains: String
	between: [String]
	beginsWith: String
	attributeExists: Boolean
	attributeType: ModelAttributeTypes
	size: ModelSizeInput
}

input ModelStringKeyConditionInput {
	eq: String
	le: String
	lt: String
	ge: String
	gt: String
	between: [String]
	beginsWith: String
}

input ModelUserConditionInput {
	username: ModelStringInput
	owner: ModelStringInput
	paypalOrderId: ModelStringInput
	visitDateTime: ModelStringInput
	and: [ModelUserConditionInput]
	or: [ModelUserConditionInput]
	not: ModelUserConditionInput
}

type ModelUserConnection @aws_api_key
@aws_iam
@aws_cognito_user_pools {
	items: [User]!
	nextToken: String
	startedAt: AWSTimestamp
}

input ModelUserFilterInput {
	username: ModelStringInput
	owner: ModelStringInput
	paypalOrderId: ModelStringInput
	visitDateTime: ModelStringInput
	and: [ModelUserFilterInput]
	or: [ModelUserFilterInput]
	not: ModelUserFilterInput
}

type Mutation {
	createUser(input: CreateUserInput!, condition: ModelUserConditionInput): User
		@aws_api_key
@aws_iam
@aws_cognito_user_pools
	updateUser(input: UpdateUserInput!, condition: ModelUserConditionInput): User
		@aws_iam
@aws_cognito_user_pools
	deleteUser(input: DeleteUserInput!, condition: ModelUserConditionInput): User
		@aws_iam
@aws_cognito_user_pools
	createOrder(input: CreateOrderInput!, condition: ModelOrderConditionInput): Order
		@aws_api_key
@aws_iam
@aws_cognito_user_pools
	updateOrder(input: UpdateOrderInput!, condition: ModelOrderConditionInput): Order
		@aws_api_key
@aws_iam
@aws_cognito_user_pools
	deleteOrder(input: DeleteOrderInput!, condition: ModelOrderConditionInput): Order
		@aws_iam
@aws_cognito_user_pools
}

type Order @aws_iam
@aws_cognito_user_pools
@aws_api_key {
	id: ID!
	username: String
	owner: String!
	email: String!
	paypalOrderId: String!
	status: OrderStatus!
	shippingType: ShippingType!
	shippingCost: Float
	shippingDetails: ShippingDetails!
	billingDetails: BillingDetails!
	products: [Products!]
	total: Total!
	createdAt: AWSDateTime!
	remarks: String
	billingAsShipping: Boolean
	updatedAt: AWSDateTime!
	_version: Int!
	_deleted: Boolean
	_lastChangedAt: AWSTimestamp!
}

enum OrderStatus {
	NEW
	IN_PROGRESS
	SHIPPED
	DELIVERED
}

type Products @aws_iam
@aws_cognito_user_pools
@aws_api_key {
	productId: String!
	name: String
	image: String
	slug: String
	price: Float!
	currency: Currencies!
	quantity: Int!
}

input ProductsInput {
	productId: String!
	name: String
	image: String
	slug: String
	price: Float!
	currency: Currencies!
	quantity: Int!
}

type Query {
	getUserByOwnerId(owner: String!): User
	getUser(id: ID!): User
		@aws_api_key
@aws_iam
@aws_cognito_user_pools
	listUsers(filter: ModelUserFilterInput, limit: Int, nextToken: String): ModelUserConnection
		@aws_api_key
@aws_iam
@aws_cognito_user_pools
	syncUsers(
		filter: ModelUserFilterInput,
		limit: Int,
		nextToken: String,
		lastSync: AWSTimestamp
	): ModelUserConnection
		@aws_api_key
@aws_iam
@aws_cognito_user_pools
	getOrder(id: ID!): Order
		@aws_api_key
@aws_iam
@aws_cognito_user_pools
	listOrders(
		id: ID,
		filter: ModelOrderFilterInput,
		limit: Int,
		nextToken: String,
		sortDirection: ModelSortDirection
	): ModelOrderConnection
		@aws_api_key
@aws_iam
@aws_cognito_user_pools
	syncOrders(
		filter: ModelOrderFilterInput,
		limit: Int,
		nextToken: String,
		lastSync: AWSTimestamp
	): ModelOrderConnection
		@aws_api_key
@aws_iam
@aws_cognito_user_pools
	byOwner(
		owner: String,
		createdAt: ModelStringKeyConditionInput,
		sortDirection: ModelSortDirection,
		filter: ModelOrderFilterInput,
		limit: Int,
		nextToken: String
	): ModelOrderConnection
		@aws_api_key
@aws_iam
@aws_cognito_user_pools
}

type ShippingDetails @aws_iam
@aws_cognito_user_pools
@aws_api_key {
	firstName: String!
	lastName: String!
	company: String
	country: String!
	city: String!
	address: String!
	address2: String
	phone: String
	postalCode: String!
}

input ShippingDetailsInput {
	firstName: String!
	lastName: String!
	company: String
	country: String!
	city: String!
	address: String!
	address2: String
	phone: String
	postalCode: String!
}

enum ShippingType {
	PICKUP
	STANDARD
	EXPRESS
}

type Subscription {
	onCreateUser(owner: String): User
		@aws_subscribe(mutations: ["createUser"])
@aws_api_key
@aws_iam
@aws_cognito_user_pools
	onUpdateUser(owner: String): User
		@aws_subscribe(mutations: ["updateUser"])
@aws_api_key
@aws_iam
@aws_cognito_user_pools
	onDeleteUser(owner: String): User
		@aws_subscribe(mutations: ["deleteUser"])
@aws_api_key
@aws_iam
@aws_cognito_user_pools
	onCreateOrder(owner: String): Order
		@aws_subscribe(mutations: ["createOrder"])
@aws_api_key
@aws_iam
@aws_cognito_user_pools
	onUpdateOrder(owner: String): Order
		@aws_subscribe(mutations: ["updateOrder"])
@aws_api_key
@aws_iam
@aws_cognito_user_pools
	onDeleteOrder(owner: String): Order
		@aws_subscribe(mutations: ["deleteOrder"])
@aws_api_key
@aws_iam
@aws_cognito_user_pools
}

type Total @aws_iam
@aws_cognito_user_pools
@aws_api_key {
	amount: Float!
	currency: Currencies!
}

input TotalInput {
	amount: Float!
	currency: Currencies!
}

input UpdateOrderInput {
	id: ID!
	username: String
	owner: String
	email: String
	paypalOrderId: String
	status: OrderStatus
	shippingType: ShippingType
	shippingCost: Float
	shippingDetails: ShippingDetailsInput
	billingDetails: BillingDetailsInput
	products: [ProductsInput!]
	total: TotalInput
	createdAt: AWSDateTime
	remarks: String
	billingAsShipping: Boolean
	_version: Int
}

input UpdateUserInput {
	username: AWSEmail
	owner: String
	paypalOrderId: [String]
	visitDateTime: [AWSDateTime]
	_version: Int
}

type User @aws_iam
@aws_cognito_user_pools
@aws_api_key {
	username: AWSEmail!
	owner: String!
	paypalOrderId: [String]
	visitDateTime: [AWSDateTime]
	id: ID!
	createdAt: AWSDateTime!
	updatedAt: AWSDateTime!
	_version: Int!
	_deleted: Boolean
	_lastChangedAt: AWSTimestamp!
}