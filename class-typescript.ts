class User {
  name: String;
  email: String;
  password: String;
  signUpdate: Date;

  constructor(name: string, email: String, password:String) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.signUpdate = new Date();
  }
}

const a = new User("jeong", "jeong@gmail.com", "admin123");