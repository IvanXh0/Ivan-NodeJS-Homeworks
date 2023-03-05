// 5. create a function that for given username deletes the user from filesystem

const fs = require("fs");
const User = require("../user");

function deleteUser(username) {
  const data = fs.readFileSync("users.json", { encoding: "utf-8" });

  const users = JSON.parse(data);

  const index = users.findIndex((user) => user.username === username);

  if (index !== -1) {
    users.splice(index, 1);
    fs.writeFileSync("users.json", JSON.stringify(users));
    console.log("User deleted!");
  } else {
    console.log("User not found!");
  }
}

module.exports = deleteUser;
