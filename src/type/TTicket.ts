export type TTicket = {
  amount: number
  date: number
  movieId: string
  name: string
  seats: {[key: string]: boolean}
}
