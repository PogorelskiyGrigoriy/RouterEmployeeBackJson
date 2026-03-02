const fs = require('fs');

const departments = ['IT', 'Design', 'Sales', 'Management', 'HR'];
const names = ['Иван Иванов', 'Анна Сидорова', 'Петр Петров', 'Елена Кузнецова', 'Алексей Смирнов', 'Мария Резник'];

const generateData = () => {
  const employees = [];

  for (let i = 1; i <= 40; i++) {
    // Генерируем случайную дату рождения (от 1970 до 2005)
    const year = Math.floor(Math.random() * (2005 - 1970 + 1)) + 1970;
    const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
    const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
    
    employees.push({
      id: i.toString(),
      fullName: names[Math.floor(Math.random() * names.length)],
      salary: Math.floor(Math.random() * (200000 - 50000 + 1)) + 50000,
      birthDate: `${year}-${month}-${day}`, // Формат YYYY-MM-DD
      department: departments[Math.floor(Math.random() * departments.length)],
      avatar: `https://i.pravatar.cc/150?u=${i}` // Случайная аватарка
    });
  }

  return { employees };
};

const data = generateData();
fs.writeFileSync('db.json', JSON.stringify(data, null, 2));
console.log('✅ db.json создан с 40 сотрудниками!');