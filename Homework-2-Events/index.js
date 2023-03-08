import { EventEmitter } from "events";
import Student from "./Student.js";
class MyEmitter extends EventEmitter {}

const emitter = new MyEmitter();

emitter.on("greet", (student) => {
  console.log(
    `Hello ${student.firstName} ${student.lastName} aged ${student.age}, welcome to the ${student.academy} academy.`
  );
});

const createAndGreetStudents = () => {
  const students = [];

  for (let i = 1; i <= 5; i++) {
    const newStudents = new Student();
    students.push(newStudents);
    emitter.emit("greet", newStudents);
  }
  return students;
};

createAndGreetStudents();
