import { Order as ShopifyOrder } from './shopify'

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
  type: string
  id?: string
  brand?: string
  exp_month?: number
  exp_year?: number
  last4?: string
  name?: string
  email?: string
  image_url?: string
}

export interface Order extends ShopifyOrder {
  is_cancellable?: boolean
}
