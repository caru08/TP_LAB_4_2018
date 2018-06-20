
export class User{
  public id:number;
  public name:string;
  public email:string;
  public sex:string;
  public role:string;
  public pass:string;

  public copyData(data){
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.sex = data.sex;
    this.role = data.role;
  }

}

export class Session{
  logged: Boolean = false;
  token: string = '';
  user: User = new User();
}

