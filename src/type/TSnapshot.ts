export type TSnapshot<T> = {
  val: () => T
  key: string
}
