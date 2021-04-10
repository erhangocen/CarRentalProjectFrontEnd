export interface CreditCardModel{
  id: number,
  customerId: number,
  cardNumber: string,
  cardHolder: string,
  expMonth: number,
  expYear: number,
  cvc: string
}