export class CredentialsDto {
  constructor(public userName: string, public password: string){
  }

  static userNameToLowerCase(credentials: CredentialsDto): void {
    if (credentials.userName) {
      credentials.userName = credentials.userName.toLowerCase();
    }
  }
}
