declare namespace Shopify {
  interface Address {
    address1: string
    address2: string
    city: string
    company: string
    country: string
    first_name: string
    last_name: string
    latitude: string
    longitude: string
    phone: string
    province: string
    zip: string
    name: string
    country_code: string
    province_code: string
  }

  interface Bundle {
    addOns?: Product[]
    autoAddOnQtys: number[]
    allocationLength: number
    autoAddOns?: Product[]
    discountAddOns?: Product[]
    mainProduct?: Product
    mainTrainingPantsProduct?: Product
    numAddOns: number
    numDiscountAddOns: number
    possibleChoices?: Variant[]
    possibleNighttimeChoices?: Variant[]
    shippingIntervalFrequencies: number[]
    shippingIntervalUnitType: string
    subscriptionId: string
  }

  interface Cart {
    items: Item[]
  }

  interface Collection {
    id: number
    handle: string
    title: string
    updated_at: string
    body_html: string
    published_at: string
    sort_order: 'best-selling'
    template_suffix: string
    published_scope: 'web'
    admin_graphql_api_id: string
  }

  interface Customer {
    id: number
    email: string
    accepts_marketing: boolean
    created_at: string
    updated_at: string
    first_name: string
    last_name: string
    orders_count: string
    state: string
    total_spent: string
    last_order_id: number
    note: string
    verified_email: boolean
    multipass_identifier: string
    tax_exempt: boolean
    phone: string
    tags: string
    last_order_name: string
    currency: string
    addresses: Address[]
    admin_graphql_api_id: string
    default_address: Address
  }

  interface Fulfillment {
    created_at: string
    id: number
    order_id: number
    status: string
    tracking_company: string
    tracking_number: string
    updated_at: string
  }

  interface GroupedItem {
    children?: Item[]
    item: Item
  }

  interface Item {
    handle: string
    id: number
    image: string
    key: string
    price: number
    product_description: string
    product_title: string
    properties?: {
      [key: string]: string
    }
    quantity: number
    variant_id: number
    variant_options: string[]
    variant_title: string
    title: string
  }

  type CreateItemParams = [number, { properties?: object; quantity?: number }?]

  interface TaxLine {
    title: string
    price: string
    rate: number
    price_set: {
      shop_money: {
        amount: string
        currency_code: string
      }
      presentment_money: {
        amount: string
        currency_code: string
      }
    }
  }

  interface LineItem {
    id: number
    variant_id: number
    title: string
    quantity: number
    price: string
    pre_tax_price: string
    sku: string
    variant_title: string
    vendor: string
    fulfillment_service: string
    product_id: number
    requires_shipping: boolean
    taxable: boolean
    gift_card: boolean
    name: string
    variant_inventory_management: string
    properties: object[]
    product_exists: boolean
    fulfillable_quantity: number
    grams: number
    total_discount: string
    fulfillment_status: any
    price_set: any
    total_discount_set: any[]
    discount_allocations: any[]
    admin_graphql_api_id: string
    tax_lines: TaxLine[]
  }

  interface Metafield {
    id?: number
    key: string
    namespace: string
    value: string | number
    value_type: 'integer' | 'string' | 'json_string'
  }

  interface Product {
    available?: boolean
    description?: string
    id: number
    title: string
    body_html: string
    featured_image?: string // from JSON
    vendor: string
    product_type: string
    created_at: string
    handle: string
    updated_at: string
    published_at: string
    template_suffix: string
    tags: string
    published_scope: string
    admin_graphql_api_id: string
    variants: Variant[]
    options: string[] | { name: string }[] // the API gives name: string array, JSON gives string[]
    images: ProductImage[]
    image: ProductImage
  }

  interface ProductImage {
    id: number
    created_at: string
    height: number
    position: number
    product_id: number
    src: string
    updated_at: string
    variant_ids: number[]
    width: number
  }

  interface Order {
    id: number
    email: string
    closed_at: string
    created_at: string
    updated_at: string
    number: number
    note: string
    token: string
    gateway: string
    test: boolean
    total_price: string
    subtotal_price: string
    total_weight: number
    total_tax: string
    taxes_included: boolean
    currency: string
    financial_status: string
    confirmed: boolean
    total_discounts: string
    total_line_items_price: string
    cart_token: string
    buyer_accepts_marketing: boolean
    name: string
    referring_site: string
    landing_site: string
    cancelled_at: string
    cancel_reason: string
    total_price_usd: string
    checkout_token: string
    reference: string
    user_id: number
    location_id: number
    source_identifier: string
    source_url: string
    processed_at: string
    device_id: number
    phone: string
    customer_locale: string
    app_id: number
    browser_ip: string
    landing_site_ref: string
    order_number: number
    discount_applications: any
    discount_codes: Array<{ code: string; amount: string; type: string }>
    note_attributes: { name: string; value: string }[]
    payment_gateway_names: string[]
    processing_method: string
    checkout_id: number
    source_name: string
    fulfillment_status: string
    tax_lines: TaxLine[]
    tags: string
    contact_email: string
    order_status_url: string
    presentment_currency: string
    total_line_items_price_set: any
    total_discounts_set: any
    total_shipping_price_set: any
    subtotal_price_set: any
    total_price_set: any
    total_tax_set: any
    total_tip_received: string
    admin_graphql_api_id: string
    line_items: LineItem[]
    shipping_lines: ShippingLine[]
    billing_address: Address
    shipping_address: Address
    fulfillments: Fulfillment[]
    refunds: Refund[]
    customer: Customer
  }

  interface Refund {
    id: number
    shipping?: {
      amount: string
      tax: string
      maximum_refundable: string
    }
    order_id: number
    created_at: string
    note: string
    user_id: number
    processed_at: string
    refund_line_items: RefundLineItem[]
    transactions: Transaction[]
    order_adjustments: any[]
  }

  interface Transaction {
    order_id: number
    kind: string
    gateway: string
    parent_id: number
    amount: string
    currency: string
    maximum_refundable: string
  }

  interface RefundLineItem {
    quantity: number
    line_item_id: number
    location_id: number
    restock_type: string
    price: string
    subtotal: string
    total_tax: string
    discounted_price: string
    discounted_total_price: string
    total_cart_discount_amount: string
  }

  interface ShippingLine {
    code: string
    discounted_price: string
  }

  interface Variant {
    available?: boolean // only available via JS,
    compare_at_price: number | string
    featured_image: ProductImage | null
    id: number
    image_id: number
    inventory_management?: string // API
    inventory_quantity?: number // only available via API
    inventory_item_id?: number // API only
    name: string
    option1: string
    option2: string
    option3: string
    price: number | string // API = string, JS = number
    product_id: number
    sku: string
    title: string
  }
}
