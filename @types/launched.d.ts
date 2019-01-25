declare namespace Launched {
  interface Child {
    name: string,
    gender: string,
    birthdate: string,
    size: string,
  }

  interface ChildEditInput {
    name?: string,
    gender?: string,
    birthdate?: string,
    size?: string,
  }
}
