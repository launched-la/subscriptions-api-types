declare namespace Launched {
  interface Child {
    name: string
    gender: string
    birthdate: string
  }

  interface PaymentInformation {
    type: string
    id?: string
    brand?: string
    exp_month?: number
    exp_year?: number
    last4?: string
    name?: string
    email?: string
    image_url?: string
  }
}
