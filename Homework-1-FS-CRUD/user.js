// 1. Create a file with class "User" that has username, password, age, isActive, and date created properties

class User {
  constructor(username, password, age, isActive) {
    this.username = username;
    this.password = password;
    this.age = age;
    this.isActive = isActive;
    this.dateCreated = new Date();
  }
}

module.exports = User;
