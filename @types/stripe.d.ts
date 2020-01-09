declare namespace Stripe {
  interface Card {
    id?: string,
    brand: string,
    exp_month: number,
    exp_year: number,
    last4: string,
    name?: string,
  }

  interface PaymentMethod {
    billing_details: BillingDetails,
    id: string,
    type: string,
    card: Card,
  }

  interface BillingDetails {
    name: string,
  }

  interface InvoiceSettings {
    default_payment_method?: PaymentMethod,
  }

  interface Customer {
    default_source?: Card,
    id: string,
    invoice_settings: InvoiceSettings,
  }
}
