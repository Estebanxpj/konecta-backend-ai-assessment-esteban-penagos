import { Header } from "./Header";

export class ResponseData<T> {
    constructor(public header: Header, public body: T) {}
  }
  