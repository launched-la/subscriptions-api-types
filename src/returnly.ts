export interface Return {
  rma: string
  ext_store_id: string
  shopper_email: string
  currency: string
  status: 'authorized' | 'in_transit' | 'delivered' | 'pending_refund' | 'refunded'
  order_shipping_refund: string
  return_shipping_quote_amount: string
  return_shipping_refund_amount: string
  return_shipping_paid_amount: string
  subtotal_amount: string
  estimated_refund_amount: string
  refund_amount: string
  restocking_fee_amount: string
  tax_amount: string
  discount_amount: string
  shopper_message: string
  merchant_notes: string
  is_exchange: boolean
  is_gift: boolean
  is_exempt_from_shipping: boolean
  return_label_amount: string
  created_at: string
  updated_at: string
  refunded_at: string
}

export interface ReturnLineItem {
  ext_order_line_item_id: string
  ext_order_id: string
  ext_order_number: string
  sku: string
  product_name: string
  product_id: string
  variant_id: string
  shipping_label_id: null
  return_cause: string
  original_amount: string
  discount_amount: string
  estimated_refund_amount: string
  restocking_fee_amount: string
  order_shipping_refund_amount: string
  return_label_cost_amount: string
  return_shipping_paid_amount: string
  total_refund_amount: string
  tax_amount: string
  units: number
}
