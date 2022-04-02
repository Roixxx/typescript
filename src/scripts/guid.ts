/* eslint-disable */
export {}

// vars
const oranges: number = 5;
const name: string = 'max';
const hasDog: boolean = true;
const nothing: null = null;
const und: undefined = undefined;

// built-in objects
const time: Date = new Date();

// Array
const colors: string[] = ['red'];
const nums: number[] = [1, 2];
const numsColors: (number | string)[] = [1, 2, 'red'];

// Class
class Car {
	constructor(
		public name: string,
		private age: number,
		readonly pass: string,
		protected nickname: string,
	) {}
}

const car: Car = new Car('Макс', 12, 'awtfrqwtg', 'Roixxx');
console.log(car);

// Класс + интерфейс
interface FilterI {
	name: string,
}

// Иожнол перечислять несколько интерфейсов через запятую
class Filter implements FilterI {
	name: 'MyFilter'
}

// Абстрактый класс, от него нельзя создавать объекты, но можно наследоваться.
// Он может показывть, как буду выглядить его наследники
abstract class User {
	constructor() {
	}
}

// object literal
const point: { x: number; y: number; } = {
	x: 10,
	y: 20,
}

// Функция. ? - опциональный аргумент

function sum(a: number, b?: number): number {
	return a + (b || 1);
}

function error(): never {
	throw Error('err');
}

//деструктуризайия в функции
const whether = {
	today: 'good',
	temp: 13
}

function logWhether({today, temp}: {today: string, temp: number}) {
	console.log(today);
	console.log(temp);
}
logWhether(whether)

// Tuple type + alias
type Drink = [string, boolean, number];
const cola: Drink = ['black', true, 40];


// Оbj interface
interface IUser {
	id: number;
	name: string;
}

interface IAdmin extends IUser {
// наследование
}

function buildUser(userId: number, userName: string): IUser {
	return { id: userId, name: userName };
}

let newUser = buildUser(2, "Bill");
console.log("id: ", newUser.id);
console.log("name: ", newUser.name);

// Enum type
// Массив + объект
enum Directions {
	Up,
	Down,
	Left,
	Right,
}
// const enum - минифицированный вариант
console.log(Directions);
console.log(Directions.Up);
console.log(Directions[1]);

// Namespace - пространстов имён инкапсулирует код внутри
// НО лучше использовать es6 модули
namespace Utils {
	export const SECRET: string = '32twge2w3t';
	const PI: number = 3.14;
}

console.log("Utils.SECRET: " + Utils.SECRET);
// console.log(Utils.PI); < без экспорта не доступен

// Generic type
// T - сокращение слова type ()
// какой тип получем, такой и возвращаем
function getter<T>(data: T): T {
	return data;
}

