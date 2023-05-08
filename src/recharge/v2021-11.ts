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

export interface Subscription {
  /** Unique numeric identifier for the subscription. */
  id: number
  /** Unique numeric identifier for the address the subscription is associated with. */
  address_id: number
  /** Unique numeric identifier for the customer the subscription is tied to. */
  customer_id: number
  /** An object used to contain analytics data such as utm parameters. */
  analytics_data: {
    utm_params: {
      utm_source: string
      utm_medium: string
    }[]
  }
  /** Reason provided for cancellation. */
  cancellation_reason: string | null
  /** Additional comment for cancellation. Maximum length is 1024 characters. */
  cancellation_reason_comments: string | null
  /**
   * The time the subscription was cancelled.
   * @example "2021-02-25T21:27:19+00:00"
   */
  cancelled_at: string | null
  /**
   * The number of units (specified in `order_interval_unit`) between each Charge.
   * For example, `order_interval_unit`=month and `charge_interval_frequency`=3, indicate charge every 3 months.
   */
  charge_interval_frequency: number
  /** The time the subscription was created. */
  created_at: string
  /** Set the number of charges until subscription expires. */
  expire_after_specific_number_of_charges: number | null
  /** An object containing the product id as it appears in external platforms. */
  external_product_id: {
    /** The product id as it appears in the external e-commerce platform. The `external_product_id` of the Product record in Recharge, linking a Plan to a Product. */
    ecommerce: string
  }
  /** An object containing the variant id as it appears in external platforms. */
  external_variant_id: {
    /** The variant id as it appears in the external e-commerce platform. The `external_variant_id` of the Product record in Recharge, linking a Plan to a Product. */
    ecommerce: string
  }
  /** Retrieves `true` if there is queued charge. Otherwise, retrieves `false`. */
  has_queued_charges: boolean
  /** Value is set to `true` if it is a prepaid item. */
  is_prepaid: boolean
  /** Value is set to `true` if it is not a prepaid item */
  is_skippable: boolean
  /** Value is set to `true` if it is not a prepaid item and if in Customer portal settings swap is allowed for customers. */
  is_swappable: boolean
  /** Retrieves `true` if charge has an error max retries reached. Otherwise, retrieves `false`. */
  max_retries_reached: boolean
  /**
   * Date of the next charge for the subscription.
   * @example "2023-07-15"
   */
  next_charge_scheduled_at: string | null
  /**
   * The set day of the month order is created. Default is that there isn’t a strict day of the month when the order is created.
   * This is only applicable to subscriptions with order_interval_unit:“month”.
   */
  order_day_of_month: number | null
  /**
   * The set day of the week order is created. Default is that there isn’t a strict day of the week order is created.
   * This is only applicable to subscriptions with order_interval_unit = “week”.
   * Value of 0 equals to Monday, 1 to Tuesday etc.
   */
  order_day_of_week: number | null
  /**
   * The number of units (specified in order_interval_unit) between each order.
   * For example, order_interval_unit=month and order_interval_frequency=3, indicate order every 3 months.
   * Max value: 1000
   */
  order_interval_frequency: number
  /** The frequency unit used to determine when a subscription’s order is created. */
  order_interval_unit: 'day' | 'week' | 'month'
  /** The presentment currency of the subscription. */
  presentment_currency: string
  /** The price of the item before discounts, taxes, or shipping have been applied. */
  price: string
  /** The name of the product in a store’s catalog. */
  product_title: string
  /**
   * A list of line item objects, each one containing information about the subscription.
   * Custom key-value pairs can be installed here, they will appear on the connected queued charge
   * and after it is processed on the order itself.
   */
  properties: {
    /** The name of the property. */
    name: string
    /** The value of the property. */
    value: string
  }[]
  /** The number of items in the subscription. */
  quantity: number
  /** A unique identifier of the item in the fulfillment. In cases where SKU is blank, it will be dynamically pulled whenever it is used. */
  sku: string | null
  /**
   * Flag that is automatically updated to true when SKU is passed on create or update. When sku_override is true,
   * the SKU on the subscription will be used to generate charges and orders. When sku_override is false, Recharge
   * will dynamically fetch the SKU from the corresponding external platform variant.
   */
  sku_override: boolean
  /**
   * The status of the subscription.
   * EXPIRED - This status occurs when the maximum number of charges for a product has been reached.
   */
  status: 'active' | 'cancelled' | 'expired'
  /**
   * The date time at which the purchase_item record was last updated.
   * @example "2020-07-10T10:30:51+00:00"
   */
  updated_at: string
  /** The name of the variant in a shop’s catalog. */
  variant_title: string
}
