import type * as Recharge from './index'

/**
 * This version of Recharge's API has a much better DateTime type which specifies the timezone.
 * @example "2018-11-14T09:00:01+00:00"
 */
type DateTime = string

type Int = number
type Float = number

/** Helper type inferred from various uses of addresses in Recharge's docs. */
export interface PhysicalAddress {
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
 * @see https://developer.rechargepayments.com/2021-11/addresses/address_object
 */
export interface Address {
  /** Unique numeric identifier for the address. */
  id: Int
  /** Unique numeric identifier for the Payment Method associated to the Address. */
  payment_method_id: number
  /** First line of the customer's address. */
  address1: string
  /** Second line of the customer's address. */
  address2?: string
  /** City of the customer's address. */
  city: string
  /** The company associated with the address. */
  company?: string
  /** 2-letter country code. */
  country_code: string
  /** Unique numeric identifier for the customer the address is associated with. */
  customer_id: Int
  /** A list of discounts applied on the address. These discounts will apply to future recurring charges associated with this address. */
  discounts: {
    id: Int
  }[]
  /** First name of the customer. */
  first_name: string
  /** Last name of the customer. */
  last_name: string
  /** Replaces cart_attributes. Extra information that is added to the order. */
  order_attributes: {
    /** The name for the attribute. */
    name: string
    /** The value for the associated attribute. */
    value: string
  }[]
  /** Notes to be added to all orders associated with the address. */
  order_note: string
  /** Phone number of the customer. */
  phone: string
  /** The presentment currency of the address. SCI only. */
  // presentment_currency?: string;
  /** Province of the customer's address. */
  province: string
  /** Shipping rates that have previously been overridden via shipping_lines_override but are currently inactive. */
  shipping_lines_conserved: {
    /** The code of the associated shipping line. */
    code: string
    /** The price (in store’s currency) of the associated shipping line. */
    price: string
    /** The title of the associated shipping line. */
    title: string
  }[]
  shipping_lines_override: {
    /** The code of the associated shipping line. */
    code: string
    /** The price (in store’s currency) of the associated shipping line. */
    price: string
    /** The title of the associated shipping line. */
    title: string
  }[]
  /** The zip or postal code associated with the address. */
  zip: string
  /** The date and time when the address was created. */
  created_at: DateTime
  /** The date and time when the address was last updated. */
  updated_at: DateTime
}

/**
 * @see https://developer.rechargepayments.com/2021-11/orders/orders_object
 */
export interface Order {
  /** The unique numeric identifier for the order. */
  id: Int
  /** The id of the associated Address within Recharge. */
  address_id: Int
  billing_address: PhysicalAddress
  charge: {
    id: Int
    /** An object containing external transaction ids associated with this charge, as they appear in external platforms. */
    external_transaction_id: {
      /** The ID of the associated transaction in a payment processor system (like Stripe). */
      payment_processor: Int
    }
  }
  /** Details of the access method used by the purchase. */
  client_details: {
    /** The IP address of the buyer as detected in Checkout. */
    browser_ip: string
    /** The user agent detected during Checkout. */
    user_agent: string
  }
  created_at: DateTime
  currency: string
  customer: {
    id: Int
    email: string
    /** An object containing customer information associated with this charge. */
    external_customer_id: {
      /** The customer ID as it appears in the external e-commerce platform. */
      ecommerce: string
    }
    /** The hash of the Customer associated with the Charge. */
    hash: string
  }
  discounts: {
    id: Int
    value: Float
    value_type: 'percentage' | 'fixed_amount'
  }[]
  /** The cart token as it appears in an external system. */
  external_cart_token: string
  external_order_id: {
    /** The order ID as it appears in the external e-commerce platform. */
    ecommerce: string
  }
  /** An object containing the external order numbers. */
  external_order_number: {
    /** The product id as it appears in the external e-commerce platform. The external_product_id of the Product record in Recharge, linking a Plan to a Product. */
    ecommerce: string
  }
  /** A boolean representing if this Order is generated from a prepaid purchase. */
  is_prepaid: boolean
  line_items: {
    purchase_item_id: Int
    external_product_id: {
      ecommerce: string
    }
    external_variant_id: {
      ecommerce: string
    }
    grams: Int
    handle: string
    images: {
      large: string
      medium: string
      small: string
      original: string
      /** The sort order in which the x image from the array should appear when displayed. */
      // sort_order: Int
    }
    original_price: string
    properties: {
      name: string
      value: string
    }[]
    purchase_item_type: 'subscription' | 'onetime'
    quantity: Int
    sku: string
    tax_due: string
    tax_lines: {
      price: string
      rate: string
      title: string
    }[]
    taxable: boolean
    taxable_amount: string
    title: string
    total_price: string
    unit_price: string
    unit_price_includes_tax: boolean
    variant_title: string
  }[]
  note: string
  order_attributes: {
    name: string
    value: string
  }[]
  processed_at: DateTime
  scheduled_at: DateTime
  shipping_address: PhysicalAddress
  shipping_lines: {
    code: string
    price: string
    source: string
    title: string
    taxable: string
    tax_lines: {
      price: string
      rate: string
      title: string
    }[]
  }[]
  status: 'success' | 'error' | 'queued' | 'cancelled'
  subtotal_price: string
  /** A comma separated list of tags on the Order. */
  tags: string
  tax_lines: {
    price: string
    rate: string
    title: string
  }[]
  taxable: boolean
  total_discounts: string
  total_duties: string
  total_line_items_price: Int
  total_price: string
  total_refunds: string
  total_tax: string
  total_weight_grams: Int
  type: 'checkout' | 'recurring'
  updated_at: DateTime
}

/**
 * https://developer.rechargepayments.com/2021-11/payment_methods/payment_methods_object
 */
export interface PaymentMethod {
  id: number
  customer_id: number
  billing_address: PhysicalAddress
  created_at: DateTime
  default: boolean
  payment_details: {
    /** valid for payment_type "CREDIT_CARD" only. */
    brand?: string
    /** valid for payment_type "CREDIT_CARD" only. */
    exp_month?: number
    /** valid for payment_type "CREDIT_CARD" only. */
    exp_year?: number
    /** valid for payment_type "CREDIT_CARD" only. */
    last4?: string
    /** valid for payment_type "PAYPAL" only. */
    paypal_email?: string
    /** valid for payment_type "PAYPAL" only. */
    paypal_payer_id?: string
    /** if a digital wallet. */
    wallet_type?: string
    funding_type?: string
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
    transactions?: Recharge.ChargeTransaction[]
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

interface BundleProduct {
  created_at: string
  custom_prices: boolean
  customization_window_disabled_message: string | null
  customization_window: number | null
  default_bundle_variant_id: number
  description: string | null
  external_product_id: string
  id: number
  is_customizable: boolean
  max_quantity_per_variant: number | null
  reset_box_contents: boolean
  title: string
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
  include?: {
    bundle_selections?: BundleSelection
    address?: Address
    bundle_product?: BundleProduct
  }
}

export interface Customer {
  /** Unique numeric identifier for the Customer. */
  id: number
  /** An object containing analytics data associated with the customer. */
  analytics_data?: {
    utm_params: {
      utm_source: string
      utm_medium: string
    }[]
  }
  /** A boolean that indicates whether Recharge credits will be applied to the next recurring charge. */
  apply_credit_to_next_recurring_charge?: boolean
  /**
   * The date and time when the customer was created.
   * @example "2020-07-10T10:30:51+00:00"
   */
  created_at: string
  /** The email address of the customer. */
  email: string
  /** An object containing external ids for the customer record. */
  external_customer_id: {
    /** The customer ID as it appears in the external e-commerce platform. */
    ecommerce: string
  } | null
  /**
   * Date when first charge was processed for the customer.
   * @example "2020-07-10T10:30:51+00:00"
   */
  first_charge_processed_at: string | null
  /** The customer’s first name. */
  first_name: string
  /** A boolean that indicates if the customer has a payment method that is in dunning (failed charge). */
  has_payment_method_in_dunning: boolean
  /** Is the payment method valid or not. */
  has_valid_payment_method: boolean
  /** The unique string identifier used in a customers portal link. */
  hash: string
  /** The customer’s last name. */
  last_name: string
  /** The customer’s phone number. */
  phone: string | null
  /** The number of active subscriptions on addresses associated with the customer. */
  subscriptions_active_count: number
  /** The total number of subscriptions created on addresses associated with the customer. */
  subscriptions_total_count: number
  /** Whether the customer tax exempt or not. */
  tax_exempt: boolean
  /**
   * The date and time when the customer was updated.
   * @example "2020-07-10T10:30:51+00:00"
   */
  updated_at: string
}
