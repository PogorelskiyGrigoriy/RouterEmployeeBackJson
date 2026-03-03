const { faker } = require('@faker-js/faker');
const fs = require('fs');

const createRandomEmployees = (count = 100) => {
  const employees = [];
  
  for (let i = 1; i <= count; i++) {
    // выбираем пол
    const sex = faker.person.sexType(); // 'male' или 'female'
    const folder = sex === 'male' ? 'men' : 'women';
    
    // Генерируем имя согласно полу
    const firstName = faker.person.firstName(sex);
    const lastName = faker.person.lastName(sex);
    
    // индекс для фото (0-99)
    const photoId = i % 100;

    employees.push({
      id: i.toString(),
      fullName: `${firstName} ${lastName}`,
      salary: Math.round(faker.number.int({ min: 5000, max: 50000 }) / 100) * 100,
      birthDate: faker.date.birthdate({ min: 20, max: 75, mode: 'age' }).toISOString().split('T')[0],
      department: faker.helpers.arrayElement(["QA", "Development", "Audit", "Accounting", "Management"]),
      avatar: `https://randomuser.me/api/portraits/${folder}/${photoId}.jpg`
    });
  }

  return { employees };
};

const data = createRandomEmployees(100);
fs.writeFileSync('db.json', JSON.stringify(data, null, 2));
console.log("✅ База обновлена: пол соответствует аватару!");