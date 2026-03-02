const fs = require('fs');
const { faker } = require('@faker-js/faker'); // Используем стандартный (English) импорт

const generateData = () => {
  const employees = [];
  // Названия отделов на английском
  const departments = ['Engineering', 'Product', 'Marketing', 'Sales', 'Operations', 'Finance'];

  for (let i = 1; i <= 100; i++) {
    // 1. Определяем пол
    const sex = faker.person.sexType(); 
    
    // 2. Генерируем ФИО (теперь English по умолчанию)
    const firstName = faker.person.firstName(sex);
    const lastName = faker.person.lastName();
    const fullName = `${firstName} ${lastName}`;

    // 3. Дата рождения (те же 20-60 лет)
    const birthDate = faker.date.birthdate({ min: 20, max: 60, mode: 'age' })
      .toISOString()
      .split('T')[0];

    // 4. Зарплаты в долларах (например, от $4,000 до $15,000 в месяц)
    const salary = faker.number.int({ min: 4000, max: 15000 });

    // 5. Аватары (используем качественный сервис randomuser.me)
    const genderId = sex === 'male' ? 'men' : 'women';
    const avatar = `https://randomuser.me/api/portraits/${genderId}/${i}.jpg`;

    employees.push({
      id: i.toString(),
      fullName: fullName,
      salary: salary,
      birthDate: birthDate,
      department: faker.helpers.arrayElement(departments),
      avatar: avatar
    });
  }

  return { employees };
};

const data = generateData();

try {
  fs.writeFileSync('db.json', JSON.stringify(data, null, 2));
  console.log('🌎 Database updated! Generated 50 English profiles with USD salaries.');
} catch (err) {
  console.error('Error writing file:', err);
}