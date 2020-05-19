declare namespace Launched {
  interface Child {
    name: string,
    gender: string,
    birthdate: string,
  }
    
  interface PaymentInformation {
    type: string,
    id: string | undefined,
    brand: string | undefined,
    exp_month: number | undefined,
    exp_year: number | undefined,
    last4: string | undefined,
    name: string | undefined,
  }
}
