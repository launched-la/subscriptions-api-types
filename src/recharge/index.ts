import type * as Launched from '../launched'
import type * as Shopify from '../shopify'
import type * as V2021_11 from './v2021-11'

export interface Address {
  address1: string
  address2: string
  city: string
  company: string
  country: string
  customer_id?: number
  discount: Discount
  discount_id: number
  first_name: string
  id: number
  last_name: string
  phone: string
  province: string
  zip: string
}

export interface AddressUpdateInput {
  address1?: string
  address2?: string
  city?: string
  company?: string
  country?: string
  first_name?: string
  last_name?: string
  phone?: string
  province?: string
  zip?: string
  /** This is undocumented on API version 2021-01, but it seems to work anyway. */
  payment_method_id?: number
}

export interface AsyncBatch {
  batch_type?:
    | 'address_discount_apply'
    | 'address_discount_remove'
    | 'discount_create'
    | 'discount_delete'
    | 'discount_update'
    | 'product_create'
    | 'product_delete'
    | 'product_update'
    | 'bulk_subscriptions_create'
    | 'bulk_subscriptions_delete'
    | 'bulk_subscriptions_update'
    | 'onetime_create'
  closed_at?: string
  created_at?: string
  fail_task_count?: number
  id?: number
  status?: 'started' | 'processing' | 'completed' | 'failed'
  submitted_at?: string
  success_task_count?: number
  total_task_count?: number
  updated_at?: string
}

export interface Charge {
  address_id: number
  billing_address: Address
  browser_ip: string
  client_details: {
    browser_ip: string
    user_agent: string
  }
  created_at: string
  customer_hash: string
  customer_id: number
  discount_codes: {
    amount: string
    code: string
    type: string
  }[]
  email: string
  error: string
  error_type: string
  first_name: string
  has_uncommited_changes: boolean
  id: number
  last_name: string
  line_items: (LineItem & { type?: string })[]
  note: string
  note_attributes: string[]
  number_times_tried: number
  processed_at: string
  retry_date: string
  scheduled_at: string
  shipments_count: number
  shipping_address: Address
  shipping_lines: ShippingLine[]
  shopify_order_id: string
  status: 'SUCCESS' | 'ERROR' | 'QUEUED' | 'SKIPPED' | 'REFUNDED' | 'PARTIALLY_REFUNDED'
  sub_total: string
  subtotal_price: string
  tags: string
  tax_lines: number
  total_discounts: string
  total_line_items_price: string
  total_price: string
  total_refunds: string
  total_tax: number
  total_weight: number
  type: 'CHECKOUT' | 'RECURRING'
  updated_at: string
}

export interface Customer {
  children?: Launched.Child[]
  id: number
  hash: string
  shopify_customer_id: string
  email: string
  created_at: string
  updated_at: string
  first_name: string
  last_name: string
  metafields?: Metafield[]
  billing_address1: string
  billing_address2: string
  billing_zip: string
  billing_city: string
  billing_company: string
  billing_province: string
  billing_country: string
  billing_phone: string
  processor_type: 'stripe' | 'braintree'
  status: 'ACTIVE'
  stripe_customer_token: string
  paypal_customer_token?: string
  braintree_customer_token?: string
  has_valid_payment_method: boolean
  number_active_subscriptions: number
  number_subscriptions: number
  payment_failure?: boolean
  payment_information: Launched.PaymentInformation
}

export interface CustomerUpdatePayment {
  stripe_customer_token?: string
  paypal_customer_token?: string
  braintree_customer_token?: string
}

export interface CustomerUpdateInput {
  billing_phone: string
  email: string
  first_name: string
  last_name: string
}

export interface Discount {
  id: number
  code: string
  value: number
  ends_at: string
  starts_at: string
  status: 'enabled' | 'disabled'
  usage_limit: number
  applies_to_id: number
  discount_type: 'percentage' | 'fixed_amount'
  applies_to: number
  applies_to_resource: string
  times_used: number
  duration: 'forever' | 'usage_limit' | 'single_use'
  duration_usage_limit: number
  applies_to_product_type?: 'ALL' | 'ONETIME' | 'SUBSCRIPTION'
  first_time_customer_restriction: 'customer_must_not_exist_in_recharge'
  created_at: string
  updated_at: string
  once_per_customer: boolean
}

export interface GroupedSubscriptionBase {
  address?: Address
  charges?: Charge[]
  subscription: Subscription
  onetimes?: OneTimeProduct[]
  snacktimeActions?: Partial<import('@launchedla/snacktime').Types.Action>[]
  bundleInfo?: Launched.BundleInfo
  bundleSavings?: string
  lastCharge?: Charge
  futureCharge?: Charge
}

// we omit the id property and provide it as bundle_selection_id instead so that it's not interpreted as a subscription id
export type RcGroupedSubscriptionChild = Omit<V2021_11.BundleSelection['items'][number], 'id' | 'external_product_id' | 'external_variant_id'> &
  Pick<
    Subscription,
    'shopify_product_id' | 'shopify_variant_id' | 'product_title' | 'variant_title' | 'sku' | 'product' | 'variant'
    // we have these from the bundle selection item already: | 'created_at' | 'updated_at' | 'price' | 'quantity'
  > & {
    bundle_selection_item_id: number
  }

export interface HbGroupedSubscription extends GroupedSubscriptionBase {
  manager: 'hellobello'
  bundleId?: number
  children: Subscription[]
}

export interface RcGroupedSubscription extends GroupedSubscriptionBase {
  manager: 'recharge'
  children: RcGroupedSubscriptionChild[]
}

export type GroupedSubscription = HbGroupedSubscription | RcGroupedSubscription

export interface LineItem {
  id: number
  price: number
  product_title: string
  properties: { name: string; value: string }[]
  quantity: number
  shopify_product_id: string
  shopify_variant_id: string
  sku: string
  subscription_id: number
  title: string
  variant_title: string
}

export interface OneTimeProduct {
  address_id: number
  created_at: string
  customer_id: number
  id: number
  next_charge_scheduled_at?: string
  price: number
  product_title: string
  properties?: { name: string; value: string }[]
  quantity: number
  recharge_product_id: number
  shopify_product_id: number
  shopify_variant_id: number
  sku: string
  status: string
  updated_at: string
  variant_title: string
  product?: Shopify.Product
  variant?: Shopify.Variant
}

export interface Order {
  address_id: number
  address_is_active: number
  billing_address: Address
  charge_id: number
  charge_status: string
  created_at: string
  customer_id: number
  discount_codes: { amount: string; code: string; type: string }[]
  email: string
  first_name: string
  hash: string
  id: number
  is_prepaid: number
  last_name: string
  line_items: LineItem[]
  payment_processor: string
  processed_at: string
  scheduled_at: string
  shipped_date: string
  shipping_address: Address
  shipping_date: string
  shopify_cart_token: string
  shopify_customer_id: string
  shopify_id: string
  shopify_order_id: string
  shopify_order_number: number
  status: 'SUCCESS'
  total_discounts: string
  total_price: string
  transaction_id: string
  type: 'CHECKOUT'
  updated_at: string
}

export interface ShippingLine {
  code: string
  description: string
  price: string
  source: string
  title: string
}

export interface Subscription {
  address_id: number
  cancellation_reason: string
  cancellation_reason_comments: string
  cancelled_at: string
  charge_interval_frequency: string
  created_at: string
  customer_id: number
  expire_after_specific_number_of_charges: number
  has_queued_charges: number
  id: number
  max_retries_reached: number
  next_charge_scheduled_at: string
  order_day_of_month: number
  order_day_of_week: number
  order_interval_frequency: string
  order_interval_unit: string
  price: number
  product?: Shopify.Product
  product_title: string
  properties: { name: string; value: string }[]
  quantity: number
  shopify_product_id: number
  shopify_variant_id: number
  sku: string
  status: 'ACTIVE'
  updated_at: string
  variant?: Shopify.Variant
  variant_title: string
}

export interface SubscriptionFrequencies {
  frequencies: number[]
  unit: string
}

export interface SubscriptionItemUpdateInput {
  properties?: string // JSON
  quantity: number
  variantId: number
}

export interface SubscriptionUpdateInput {
  shopify_variant_id?: number | string
  quantity?: number | string
  charge_interval_frequency?: string
  order_interval_frequency?: string
  order_interval_unit?: string
}

export interface Webhook {
  address: string
  id: number
  topic: string
}

export interface Metafield {
  id?: number
  key: string
  namespace: string
  owner_resource: 'store' | 'customer' | 'subscription' | 'order' | 'charge'
  owner_id: number
  value: string
  value_type: 'string' | 'json_string' | 'integer'
  description?: string
}

export * as V2021_11 from './v2021-11'
