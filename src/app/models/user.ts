
export class User{
  public id:number;
  public name:string;
  public email:string;
  public sex:string;
  public role:string;
  public pass:string;

}

export class Session{
  logged: Boolean = false;
  token: string = '';
  user: User = new User();
}

