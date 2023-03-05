// homework
const fs = require("fs");
const User = require("./user");
const createUser = require("./bonus/createUser");
const setToInactive = require("./bonus/setToInactive");
const deleteUser = require("./bonus/deleteUser");
const deleteInactiveUsers = require("./bonus/deleteInactiveUsers");

// 1. Create a file with class "User" that has username, password, age, isActive, and date created properties
// 2. create 10 users and write them to json file with filesystem

function createUsers() {
  const users = [];

  for (let i = 1; i <= 10; i++) {
    const newUser = new User(
      `user${i}`,
      `password${i}`,
      `${Math.floor(Math.random() * 50) + 1}`,
      true
    );
    users.push(newUser);
  }

  fs.writeFileSync("users.json", JSON.stringify(users));
  console.log("Users succesfully saved to file");
}

createUsers();
// 3. create a function that creates a new user from the class and appends it to the users in the filesystem
createUser("Ivan", "password", "25", true);

// 4. create a function that sets to inactive all users that are registered for more than one day and writes the data on the filesystem
setToInactive();

// 5. create a function that for given username deletes the user from filesystem
deleteUser("user10");

// 6. create a function that deletes all inactive users from filesystem
deleteInactiveUsers();
