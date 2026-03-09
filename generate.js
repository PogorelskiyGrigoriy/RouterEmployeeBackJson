const { faker } = require('@faker-js/faker');
const fs = require('fs');

const NUMBER_OF_EMPLOYEES = 100;

const createRandomEmployees = (count = 100) => {
  const employees = [];
  
  for (let i = 1; i <= count; i++) {
    const sex = faker.person.sexType();
    const folder = sex === 'male' ? 'men' : 'women';
    
    const firstName = faker.person.firstName(sex);
    const lastName = faker.person.lastName(sex);
    
    const photoId = i % 100;

    employees.push({
      id: i.toString(),
      // ИЗМЕНЕНИЕ ТУТ: Сначала фамилия, потом имя
      fullName: `${lastName} ${firstName}`, 
      salary: Math.round(faker.number.int({ min: 5000, max: 50000 }) / 100) * 100,
      birthDate: faker.date.birthdate({ min: 20, max: 65, mode: 'age' }).toISOString().split('T')[0],
      department: faker.helpers.arrayElement(["QA", "Development", "Audit", "Accounting", "Management"]),
      avatar: `https://randomuser.me/api/portraits/${folder}/${photoId}.jpg`
    });
  }

  return { employees };
};

const data = createRandomEmployees(NUMBER_OF_EMPLOYEES);

// Записываем обновленные данные
try {
  fs.writeFileSync('db.json', JSON.stringify(data, null, 2));
  console.log('✅ db.json успешно обновлен! Теперь сотрудники идут в формате Фамилия Имя.');
} catch (err) {
  console.error('❌ Ошибка записи файла:', err);
}