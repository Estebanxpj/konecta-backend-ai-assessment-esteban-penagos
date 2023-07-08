export interface IEntityBuilder<T> {
  reset(): T;
  build(): T;
}
