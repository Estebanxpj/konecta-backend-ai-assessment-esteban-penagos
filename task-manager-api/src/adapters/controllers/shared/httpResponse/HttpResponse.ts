import { IResult, IResultT } from "result-tsk";
import { ResponseData } from "./ResponseData";
import { Header } from "./Header";
import { Status } from "./Status";

export default class HttpResponse {
    
    static createResponse(result: IResult): ResponseData<unknown> {
      return new ResponseData(
        new Header(new Status(result.statusCode.toString(), result.message || result.error)),
        (result as IResultT<unknown>)?.data || result.message || result.error,
      );
    }
  }