// 3. create a function that creates a new user from the class and appends it to the users in the filesystem

const fs = require("fs");
const User = require("../user");

function createUser(username, password, age, isActive) {
  const newUser = new User(username, password, age, isActive);

  const data = fs.readFileSync("users.json", { encoding: "utf-8" });

  const users = JSON.parse(data);

  users.push(newUser);

  fs.writeFileSync("users.json", JSON.stringify(users));
  console.log(`New user ${username} added to the file!`);
}

module.exports = createUser;
