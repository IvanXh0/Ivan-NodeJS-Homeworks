// 4. create a function that sets to inactive all users that are registered for more than one day and writes the data on the filesystem

const fs = require("fs");
const User = require("../user");

function setToInactive() {
  const data = fs.readFileSync("users.json", { encoding: "utf-8" });

  const users = JSON.parse(data);

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  users.forEach((user) => {
    const oneDayAgo = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000);
    const registeredDate = new Date(user.dateCreated);

    if (registeredDate < oneDayAgo && user.isActive) {
      user.isActive = false;
    }
  });

  fs.writeFileSync("users.json", JSON.stringify(users));
  console.log("User status updated");
}

module.exports = setToInactive;
