/* eslint-disable */
export {}

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

// Class
class Car {

}

const car: Car = new Car();

// object literal
const point: { x: number; y: number; } = {
	x: 10,
	y: 20,
}

// функция

function sum(a: number, b: number): number {
	return a + b;
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

