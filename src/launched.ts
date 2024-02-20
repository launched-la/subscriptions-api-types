import { LineItem as ShopifyLineItem, Order as ShopifyOrder } from './shopify'

export interface Child {
  name: string
  gender: string
  birthdate: string
  bundle_id?: string
}

export type MonthInt = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11

export interface BundleInfo {
  name: string
  gender: string
  birthMonth: MonthInt
  birthYear?: number
}

export interface PaymentInformation {
  /** @deprecated use type_v2 instead */
  type: 'stripe' | 'paypal' | 'apple' | 'braintree' | 'todo_remove'
  /**
   * Currently one of "CREDIT_CARD", "PAYPAL", "APPLE_PAY", "GOOGLE_PAY", "SEPA_DEBIT", "STORED_VALUE",
   * but will change unexpectedly if recharge updates its available 2021-11 `PaymentMethod.payment_type`s.
   * So we type it as a string rather than as a union.
   */
  type_v2: string
  id?: string
  brand?: string
  exp_month?: number
  exp_year?: number
  last4?: string
  name?: string
  email?: string
  image_url?: string
}

export interface LineItem extends ShopifyLineItem {
  image_src?: string
}

export interface Order extends ShopifyOrder {
  is_cancellable?: boolean
  line_items: LineItem[]
}
