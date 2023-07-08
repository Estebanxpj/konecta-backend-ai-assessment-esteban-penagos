export class Task {
  private _id: string;
  private readonly _userId: string;
  private readonly _tittle: string;
  private readonly _description: string;
  private readonly _completed: boolean;

  constructor(
    userId: string,
    tittle: string,
    description: string,
    completed: boolean
  ) {
    this._userId = userId;
    this._tittle = tittle;
    this._description = description;
    this._completed = completed;
  }

  public get id(): string {
    return this._id;
  }
  public get userId(): string {
    return this._userId;
  }
  public get tittle(): string {
    return this._tittle;
  }
  public get description(): string {
    return this._description;
  }
  public get completed(): boolean {
    return this._completed;
  }

  public setId(id: string): void {
    if (this._id) {
      throw new ReferenceError();
    }
    this._id = id;
  }
}
