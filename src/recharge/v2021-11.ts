import type * as Recharge from './index'

/**
 * https://developer.rechargepayments.com/2021-11/payment_methods/payment_methods_object
 */
export interface PaymentMethod {
  id: number
  customer_id: number
  billing_address: {
    address1?: string
    address2?: string
    city?: string
    company?: string
    /** @example "United States" */
    country?: string
    /** @example "US" */
    country_code?: string
    first_name?: string
    last_name?: string
    phone?: string
    province?: string
    zip?: string
  }
  /**
   * A bizarre non-standard timestamp format without a timezone, but probably in UTC.
   * @example "2022-10-25T16:21:14"
   */
  created_at: string
  default: boolean
  payment_details: {
    brand: string
    exp_month: number
    exp_year: number
    last4: string
  }
  payment_type: 'CREDIT_CARD' | 'PAYPAL' | 'APPLE_PAY' | 'GOOGLE_PAY' | 'SEPA_DEBIT' | 'STORED_VALUE'
  /** @example "cus_AbCDEjfmtusVtJ" (stripe customer id) */
  processor_customer_token: string
  processor_name: 'stripe' | 'braintree' | 'authorize' | 'shopify_payments' | 'mollie' | 'recharge_credits'
  processor_payment_method_token: string
  status: 'not_validated' | 'valid' | 'invalid' | null
  status_reason: string | null
  /**
   * A bizarre non-standard timestamp format without a timezone, but probably in UTC.
   * @example "2022-10-25T16:21:14"
   */
  updated_at: string
}

export interface Charge extends Recharge.Charge {
  include: {
    payment_methods?: PaymentMethod[]
  }
}

export interface CreditAdjustment {
  id: number

  credit_account_id: number

  /** @example "10.27" */
  amount: string

  /** @example "2023-02-08T15:02:24+00:00" */
  created_at: string

  /** @example "USD" */
  currency_code: string

  /** @example "35.27" */
  ending_balance: string

  /** @example "Made the customer happy" */
  note?: string

  type: 'credit' | 'debit'

  /** @example "2023-02-08T15:02:24+00:00" */
  updated_at: string
}

export interface CreditAccount {
  id: number

  customer_id: number
  /**
   * In dollars.
   * @example "0.00"
   */
  available_balance: string

  /** @example "2023-02-08T15:02:24+00:00" */
  created_at: string

  /** @example "Store Credits" */
  name: string

  /** @example "2023-02-08T15:02:24+00:00" */
  updated_at: string
}
