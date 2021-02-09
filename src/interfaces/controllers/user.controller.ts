export interface UserCreation {
  name: string,
  surname: string,
  email: string,
  age?: number,
  birthday?: Date,
  gender?: string,
  phone?: string,
  contacts?: Array<number>,
}
