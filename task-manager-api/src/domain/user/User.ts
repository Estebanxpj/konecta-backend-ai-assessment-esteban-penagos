export class User {
    private _id: string;
    private readonly _userName: string;
    private readonly _password: string;
  
    constructor(_userName: string, _password: string) {
      this._userName = _userName;
      this._password = _password;
    }
  
    public get id(): string {
      return this._id;
    }
  
    public get userName(): string {
      return this._userName;
    }
  
    public get password(): string {
      return this._password;
    }

    public setId(id: string): void {
      if (this._id) {
        throw new ReferenceError();
      }
      this._id = id;
    }
}