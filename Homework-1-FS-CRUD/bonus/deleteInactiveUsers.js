// 6. create a function that deletes all inactive users from filesystem

const fs = require("fs");
const User = require("../user");

function deleteInactiveUsers() {
  const data = fs.readFileSync("users.json", { encoding: "utf-8" });

  const users = JSON.parse(data);

  const activeUsers = users.filter((user) => user.isActive);

  fs.writeFileSync("users.json", JSON.stringify(activeUsers));
  console.log("Inactive users deleted!");
}

module.exports = deleteInactiveUsers;
