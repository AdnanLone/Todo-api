var person = {
	name: 'Adnan',
	age: 21
};

function updatePerson (obj){

	// obj = {
	// 	name: 'Adnan Ali',
	// 	age: 26
	// };

	obj.age = 34;
};

updatePerson(person);
console.log(person);
console.log('-----------');

var grades = [10, 20];

function updateArray (obj){

	obj.push(100);
	grades.push(081203810293);
	obj = [10,10,10];

	debugger;

};

updateArray(grades);

console.log(grades);
