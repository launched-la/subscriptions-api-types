declare namespace Shopify {
  interface Address {
    address1: string,
    address2: string,
    city: string,
    company: string,
    country: string,
    first_name: string,
    last_name: string,
    latitude: string,
    longitude: string,
    phone: string,
    province: string,
    zip: string,
    name: string,
    country_code: string,
    province_code: string,
  }

  interface Bundle {
    addOns?: Product[],
    allocationLength: number,
    autoAddOns?: Product[],
    discountAddOns?: Product[],
    mainProduct?: Product,
    numAddOns: number,
    numDiscountAddOns: number,
    possibleChoices?: Variant[],
    shippingIntervalFrequencies: number[],
    shippingIntervalUnitType: string,
    subscriptionId: string,
  }

  interface Cart {
    items: Item[],
  }

  interface Collection {
    id: number,
    handle: string,
    title: string,
    updated_at: string,
    body_html: string,
    published_at: string,
    sort_order: 'best-selling',
    template_suffix: string,
    published_scope: 'web',
    admin_graphql_api_id: string,
  }

  interface Customer {
    id: number,
    email: string,
    accepts_marketing: boolean,
    created_at: string,
    updated_at: string,
    first_name: string,
    last_name: string,
    orders_count: string,
    state: string,
    total_spent: string,
    last_order_id: number,
    note: string,
    verified_email: boolean,
    multipass_identifier: string,
    tax_exempt: boolean,
    phone: string,
    tags: string,
    last_order_name: string,
    currency: string,
    addresses: Address[],
    admin_graphql_api_id: string,
    default_address: Address,
  }

  interface Fulfillment {
    created_at: string,
    id: number,
    order_id: number,
    status: string,
    tracking_company: string,
    tracking_number: string,
    updated_at: string,
  }

  interface GroupedItem {
    children?: Item[],
    item: Item,
  }

  interface Item {
    id: number,
    key: string,
    price: number,
    properties?: {
      bundle_id?: string,
      parent_bundle_id?: string,
    },
    quantity: number,
    variant_options: string[],
    variant_title: string,
    title: string,
  }

  interface LineItem {
    id: number,
  }

  interface Metafield {
    id: number,
    key: string,
    namespace: string,
    value: string | number,
  }

  interface Product {
    id: number,
    title: string,
    body_html: string,
    vendor: string,
    product_type: string,
    created_at: string,
    handle: string,
    updated_at: string,
    published_at: string,
    template_suffix: string,
    tags: string,
    published_scope: string,
    admin_graphql_api_id: string,
    variants: Variant[],
    options: object[],
    images: ProductImage[],
    image: ProductImage,
  }

  interface ProductImage {
    id: number,
  }

  interface Order {
    id: number,
    email: string,
    closed_at: string,
    created_at: string,
    updated_at: string,
    number: number,
    note: string,
    token: string,
    gateway: string,
    test: boolean,
    total_price: string,
    subtotal_price: string,
    total_weight: number,
    total_tax: string,
    taxes_included: boolean,
    currency: string,
    financial_status: string,
    confirmed: boolean,
    total_discounts: string,
    total_line_items_price: string,
    cart_token: string,
    buyer_accepts_marketing: boolean,
    name: string,
    referring_site: string,
    landing_site: string,
    cancelled_at: string,
    cancel_reason: string,
    total_price_usd: string,
    checkout_token: string,
    reference: string,
    user_id: number,
    location_id: number,
    source_identifier: string,
    source_url: string,
    processed_at: string,
    device_id: number,
    phone: string,
    customer_locale: string,
    app_id: number,
    browser_ip: string,
    landing_site_ref: string,
    order_number: number,
    discount_applications: any,
    discount_codes: any,
    note_attributes: {name: string, value: string}[],
    payment_gateway_names: string[],
    processing_method: string,
    checkout_id: number,
    source_name: string,
    fulfillment_status: string,
    tax_lines: any,
    tags: string,
    contact_email: string,
    order_status_url: string,
    presentment_currency: string,
    total_line_items_price_set: any,
    total_discounts_set: any,
    total_shipping_price_set: any,
    subtotal_price_set: any,
    total_price_set: any,
    total_tax_set: any,
    total_tip_received: string,
    admin_graphql_api_id: string,
    line_items: LineItem[],
    shipping_lines: ShippingLine[],
    billing_address: Address[],
    shipping_address: Address[],
    fulfillments: Fulfillment[],
    refunds: Refund[],
    customer: Customer,
  }

  interface Refund {
    id: number,
    order_id: number,
    created_at: string,
    note: string,
    user_id: number,
    processed_at: string,
    refund_line_items: LineItem[],
    transactions: any[],
    order_adjustments: any[],
  }

  interface ShippingLine {
    code: string,
  }

  interface Variant {
    id: number,
    option1: string,
    price: number,
    title: string,
  }
}