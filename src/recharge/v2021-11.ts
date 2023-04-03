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

/**
 * A bundle selection represents the contents within a Bundle linked to an individual Subscription.
 * It can represent the selection for upcoming orders or past orders.
 * A BundleSelection is associated with a corresponding Subscription and a BundleVariant
 * (the BundleVariant is used to validate contents in the selection).
 * https://developer.rechargepayments.com/2021-11/bundle_selections/bundle_selection_object
 */
export interface BundleSelection {
  /** The unique numeric identifier for the BundleSelection. */
  id: number

  /** The ID of the BundleVariant associated with the BundleSelection. */
  bundle_variant_id: number

  /** The ID of the PurchaseItem associated with the BundleSelection. */
  purchase_item_id: number

  /**
   * The date and time when the contents were selected.
   * @example "2023-02-08T15:02:24+00:00"
   */
  created_at: string

  /**
   * The product id as it appears in the external e-commerce platform. The external_product_id of the Product record in Recharge,
   * linking the BundleSelection to a Product associated with a Bundle.
   */
  external_product_id: string

  /**
   * The variant id as it appears in the external e-commerce platform. The external_variant_id of the Product record in Recharge,
   * linking the BundleSelection to a Product associated with a Bundle.
   */
  external_variant_id: string

  /** A list of item objects, each containing information about a distinct product selected as part of the Bundle. */
  items: {
    /** The unique numeric identifier for the item selection. */
    id: number

    /** The collection id as it appears in the external e-commerce platform. */
    collection_id: string

    /** The identifier of the external e-commerce platform. */
    collection_source: string

    /**
     * The date and time when this item was selected.
     * @example "2023-02-08T15:02:24+00:00"
     */
    created_at: string

    /**
     * The product id as it appears in the external e-commerce platform.
     * This is the item which is going to be extracted when the Bundle is processed.
     */
    external_product_id: string

    /**
     * The variant id as it appears in the external e-commerce platform.
     * This is the item which is going to be extracted when the Bundle is processed.
     */
    external_variant_id: string

    /** The quantity of this product. */
    quantity: number

    /** The date and time at which the item selection was most recently updated. */
    updated_at: string

    /** **WARNING: UNDOCUMENTED** */
    price: string
  }[]

  /**
   * The date and time at which the BundleSelection was most recently updated.
   * @example "2023-02-08T15:02:24+00:00"
   */
  updated_at: string
}
