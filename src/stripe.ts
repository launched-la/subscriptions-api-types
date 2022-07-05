export interface Card {
  id?: string
  brand: string
  exp_month: number
  exp_year: number
  last4: string
  name?: string
}

export interface PaymentMethod {
  billing_details: BillingDetails
  id: string
  type: string
  card: Card
}

export interface BillingDetails {
  name: string
}

export interface InvoiceSettings {
  default_payment_method?: PaymentMethod
}

export interface Customer {
  default_source?: Card
  id: string
  invoice_settings: InvoiceSettings
}
