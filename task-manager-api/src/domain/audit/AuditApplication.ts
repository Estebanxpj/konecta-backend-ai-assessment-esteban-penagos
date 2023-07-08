import { AuditActions } from "../enums/AuditActions";

export class AuditApplication {
    private _id: string;
    private _date: string;
    private readonly _ip: string;
    private readonly _userAgent: string;
    private _userId: string;
    private readonly _description: string;
    private _data: string;
    private readonly _action: AuditActions;
    private _success = false;
  
    constructor(
      ip: string,
      userAgent: string,
      userId: string,
      action: AuditActions,
      description?: string,
      date?: string,
    ) {
      this._ip = ip;
      this._userAgent = userAgent;
      this._userId = userId;
      this._action = action;
      this._description = description ?? "";
      this.setDate(date);
    }
  
    public get id(): string {
      return this._id;
    }
    public set id(value: string) {
      this._id = value;
    }

    public get date(): string {
      return this._date;
    }

    public get ip(): string {
      return this._ip;
    }

    public get userAgent(): string {
      return this._userAgent;
    }

    public get userId(): string {
      return this._userId;
    }

    public get action(): AuditActions {
      return this._action;
    }

    public get data(): string {
      return this._data;
    }

    public get success(): boolean {
      return this._success;
    }

    public get description(): string {
      return this._description;
    }
  
    public setDate(date?: string): void {
      this._date = date ?? new Date().toISOString();
    }
  
    setResponse(response: unknown ): void {
      this._data = response ? JSON.stringify(response).toString() : "";
    }
  
    public setSuccess(): void {
      this._success = true;
    }
  }