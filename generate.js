const { faker } = require('@faker-js/faker');

function createRandomEmployees(count) {
  const employees = [];
  const departments = ["QA", "Development", "Audit", "Accounting", "Management"];

  for (let i = 1; i <= count; i++) {
    const gender = faker.person.sexType(); 
    const fullName = faker.person.fullName({ sex: gender });

    const birthDate = faker.date.birthdate({ min: 20, max: 75, mode: 'age' })
      .toISOString()
      .split('T')[0];

    
    const rawSalary = faker.number.int({ min: 5000, max: 50000 });
    const salary = Math.floor(rawSalary / 100) * 100;

    const genderId = gender === 'male' ? 'men' : 'women';

    const photoId = i; 
    const avatar = `https://randomuser.me/api/portraits/${genderId}/${photoId}.jpg`;

    employees.push({
      id: i.toString(),
      fullName: fullName,
      salary: salary,
      birthDate: birthDate,
      department: faker.helpers.arrayElement(departments),
      avatar: avatar
    });
  }

  return employees;
}

const jsonRes = {
  "employees": createRandomEmployees(100)
};

console.log(JSON.stringify(jsonRes, null, 2));