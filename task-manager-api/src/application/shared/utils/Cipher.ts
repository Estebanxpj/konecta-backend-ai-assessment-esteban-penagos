import { pbkdf2Sync } from "crypto";
import * as crypto from "crypto-ts";

export default class Cipher {

   private static keySecret;
    static init(keySecret: string): void {
        this.keySecret = keySecret;
      }

    static encrypt(password: string, keySecret?: string): string {
        return crypto.AES.encrypt(password, keySecret || this.keySecret).toString();
      }
    
      static decrypt(base64String: string, keySecret?: string): string {
        const bytes = crypto.AES.decrypt(base64String, keySecret || this.keySecret);
        return bytes.toString(crypto.enc.Utf8);
      }

      static cypher(password: string): string {
        return pbkdf2Sync(password, this.keySecret, 1e1, 64, "sha512").toString("base64");
      }
}