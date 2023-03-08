class Student {
  constructor() {
    this.firstName = this.getRandomFirstName();
    this.lastName = this.getRandomLastName();
    this.age = this.getRandomAge();
    this.academy = this.getRandomAcademy();
  }

  getRandomFirstName() {
    const firstNames = ["Ivan", "Bojan", "Marko", "Darko", "David"];
    return firstNames[Math.floor(Math.random() * firstNames.length)];
  }

  getRandomLastName() {
    const lastNames = [
      "Apostolovski",
      "Davidovski",
      "Jovanovski",
      "Gocevski",
      "Markovski",
    ];
    return lastNames[Math.floor(Math.random() * lastNames.length)];
  }

  getRandomAge() {
    return Math.floor(Math.random() * (50 - 18 + 1)) + 18;
  }

  getRandomAcademy() {
    const academies = [
      "Web Development",
      "DevOps",
      "Digital Marketing",
      "Data Science",
    ];

    return academies[Math.floor(Math.random() * academies.length)];
  }
}

export default Student;
