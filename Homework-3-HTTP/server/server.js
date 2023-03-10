/* 
    Create server using HTTP module;
    When the default url is hit return HTML content to the user, the content of your choice.
    When the url /student is hit, return HTML with the informations:
        Student name: "your name";
        Student lastname: "your lastname";
        Academy: "the academy you are at";
        Subject: "the current subject we are learning";

BONUS:

    Instead of console.log the value from the form, use the FS module to write in a file named: students.txt

    */

import http from "http";
import url from "url";
import querystring from "querystring";
import fs from "fs";

const server = http.createServer((req, res) => {
  const urlObj = url.parse(req.url, true);
  const pathname = urlObj.pathname;
  const method = req.method;

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, PUT, PATCH, OPTIONS"
  );
  res.setHeader("Access-Control-Max-Age", 2592000);

  if (pathname === "/") {
    if (method === "GET") {
      res.setHeader("Content-Type", "text/html");
      res.write(`
          <h1>Welcome to my third homework based on HTTP requests</h1>
          <div>
            <a href="/student">Continue to /student</a>
          </div>
        `);
      res.end();
    }
  }

  if (pathname === "/student") {
    if (method === "GET") {
      res.setHeader("Content-Type", "text/html");
      res.write(`
          <form id="student-form" method="POST">
            <label for="firstName">Enter your first name</label>
            <input type="text" name="firstName" id="firstName" required/><br>
            <label for="lastName">Enter your last name</label>
            <input type="text" name="lastName" id="lastName" required/><br>
            <label for="academy">Enter your academy</label>
            <input type="text" name="academy" id="academy" required/><br>
            <label for="subject">Enter the current subject</label>
            <input type="text" name="subject" id="subject" required/><br>
            <button type="submit" value="Submit">Submit</button>
          </form>
        `);
      res.end();
    } else if (method === "POST") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        const formData = querystring.parse(body);

        const { firstName, lastName, academy, subject } = formData;

        const response = `
            <div>
              <p>
                Hello <b>${firstName} ${lastName}</b>. You're currently in the <b>${academy}</b> academy listening to the <b>${subject}</b> subject. You better be learning instead of just listening!
              </p>
              <p>
              Submit another form <a href="/student">here</a>.
              </p>
            </div>
          `;
        res.setHeader("Content-Type", "text/html");
        res.write(response);
        res.end();

        const data = `Name: ${firstName}, Last Name: ${lastName}, Academy: ${academy}, Subject: ${subject}, Registered Date: ${new Date().toLocaleDateString()}\n`;
        fs.appendFileSync("registeredStudents.txt", data);
        console.log("User succesfully saved to the database.");
      });
    }
  }
});

server.listen(3000, () => {
  console.log("View my homework at http://localhost:3000");
});
