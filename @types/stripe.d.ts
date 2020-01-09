declare namespace Stripe {
  interface Card {
    brand: string,
    exp_month: number,
    exp_year: number,
    last4: string,
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
    id: string,
    invoice_settings: InvoiceSettings,
  }
}
