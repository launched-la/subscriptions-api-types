declare namespace Stripe {
  interface Card {
    id: string,
    object: 'card',
    brand: string
    exp_month: number,
    exp_year: number,
    last4: string,
  }

  interface Customer {
    default_source: Card,
    id: string,
  }

  interface Source {
    id: string,
  }
}