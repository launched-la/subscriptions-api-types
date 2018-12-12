declare namespace Recharge {
  interface Address {
    address1: string,
    address2: string,
    city: string,
    company: string,
    country: string,
    first_name: string,
    id: number,
    last_name: string,
    phone: string,
    province: string,
    zip: string,
  }

  interface AddressUpdateInput {
    address1?: string,
    address2?: string,
    city?: string,
    company?: string,
    country?: string,
    first_name?: string,
    last_name?: string,
    phone?: string,
    province?: string,
    zip?: string,
  }

  interface Charge {
    address_id: number,
    billing_address: Address,
    browser_ip: string,
    client_details: {
      browser_ip: string,
      user_agent: string
    },
    created_at: string,
    customer_hash: string,
    customer_id: number,
    discount_codes: DiscountCode[],
    email: string,
    first_name: string,
    has_uncommited_changes: boolean,
    id: number,
    last_name: string,
    line_items: LineItem[],
    note: string,
    note_attributes: string[],
    processed_at: string,
    scheduled_at: string,
    shipments_count: number,
    shipping_address: Address,
    shipping_lines: ShippingLine[],
    shopify_order_id: string,
    status: "SUCCESS" | "ERROR" | "QUEUED" | "SKIPPED" | "REFUNDED" | "PARTIALLY_REFUNDED",
    sub_total: string,
    subtotal_price: string,
    tags: string,
    tax_lines: number,
    total_discounts: string,
    total_line_items_price: string,
    total_price: string,
    total_refunds: string,
    total_tax: number,
    total_weight: number,
    type: 'CHECKOUT' | 'RECURRING',
    updated_at: string,
  }

  interface Customer {
    id: number,
    hash: string,
    shopify_customer_id: string,
    email: string,
    created_at: string,
    updated_at: string,
    first_name: string,
    last_name: string,
    billing_address1: string,
    billing_address2: string,
    billing_zip: string,
    billing_city: string,
    billing_company: string,
    billing_province: string,
    billing_country: string,
    billing_phone: string,
    processor_type: 'stripe',
    status: 'ACTIVE',
    stripe_customer_token: string,
    has_valid_payment_method: boolean,
  }

  interface DiscountCode {
    id: number,
  }

  interface GetSubscriptionInput {
    getAddress?: boolean,
  }

  interface GroupedSubscription {
    children: Subscription[],
    subscription: Subscription,
  }

  interface LineItem {
    id: number,
  }

  interface Order {
    address_id: number,
    address_is_active: number,
    billing_address: Address[],
    charge_id: number,
    charge_status: string,
    created_at: string,
    customer_id: number,
    email: string,
    first_name: string,
    hash: string,
    id: number,
    is_prepaid: number,
    last_name: string,
    line_items: LineItem[],
    payment_processor: string,
    processed_at: string,
    scheduled_at: string,
    shipped_date: string,
    shipping_address: Address[],
    shipping_date: string,
    shopify_cart_token: string,
    shopify_id: string,
    shopify_order_id: string,
    shopify_order_number: number,
    status: 'SUCCESS',
    total_price: string,
    transaction_id: string,
    type: 'CHECKOUT',
    updated_at: string,
  }

  interface ShippingLine {
    id: number,
  }

  interface Subscription {
    address?: Address,
    address_id: number,
    cancellation_reason: string,
    cancellation_reason_comments: string,
    cancelled_at: string,
    charge_interval_frequency: string,
    created_at: string,
    customer_id: number,
    expire_after_specific_number_of_charges: number,
    has_queued_charges: number,
    id: number,
    max_retries_reached: number,
    next_charge_scheduled_at: string,
    order_day_of_month: number,
    order_day_of_week: number,
    order_interval_frequency: string,
    order_interval_unit: string,
    price: number,
    product_title: string,
    properties: {name: string, value: string}[],
    quantity: number,
    shopify_product_id: number,
    shopify_variant_id: number,
    sku: string,
    status: 'ACTIVE',
    updated_at: string,
    variant_title: string,
  }
  
  interface SubscriptionFrequencies {
    frequencies: number[],
    unit: string,
  }

  interface SubscriptionUpdateInput {
    charge_interval_frequency?: string,
    order_interval_frequency?: string,
    order_interval_unit?: string,
  }
}