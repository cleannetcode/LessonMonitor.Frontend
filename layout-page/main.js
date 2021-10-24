'use strict';

let number = 0;
let string = 'test message';
const pi = '3.14';

// +, -, *, /, %, **

// &&, ||, !

// ==, >=, <=, !=, >, <
// ===, !==

// |, &, ^, >>, <<

if (number === 2) {
	console.log('test')
}
else {

}

let status = number === 2 ? 'OK' : 'ERROR1';

switch (status) {
	case 'OK':
		console.log('ok status')
		break;
	case 'ERROR':
		console.log('error status')
		break;
	default:
		console.log('default value');
		break;
}

let numbers = [1, 2, 3, 4, 5];
let person = {
	name: 'Александр Пономарев',
	isMember: true,
};

for (let index = 0; index < person.length; index++) {
	const element = person[index];
	console.log(element);
}

for (const key in person) {
	if (Object.hasOwnProperty.call(person, key)) {
		const element = person[key];
		console.log(element);
	}
}

for (const iterator of numbers) {
	console.log(iterator);
}

let counter = 5;

while (counter > 0) {
	console.log(counter);
	counter--;
}

do {
	// number = parseInt(prompt('Введите число'));
} while (isNaN(number));
