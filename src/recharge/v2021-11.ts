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
  payment_type: 'CREDIT_CARD' | 'PAYPAL' | 'APPLE_PAY' | 'GOOGLE_PAY' | 'SEPA_DEBIT'
  /** @example "cus_AbCDEjfmtusVtJ" (stripe customer id) */
  processor_customer_token: string
  processor_name: 'stripe' | 'braintree' | 'authorize' | 'shopify_payments' | 'mollie'
  processor_payment_method_token: string
  status: 'not_validated' | 'valid' | 'invalid' | null
  status_reason: string | null
  /**
   * A bizarre non-standard timestamp format without a timezone, but probably in UTC.
   * @example "2022-10-25T16:21:14"
   */
  updated_at: string
}
