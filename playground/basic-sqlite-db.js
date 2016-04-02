var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
	'dialect': 'sqlite',
	'storage': __dirname + '/basic-sqlite-database.sqlite'
});


var Todo = sequelize.define('todo',{
	description: {
		type:Sequelize.STRING,
		allowNull:false,
		validate: {
			notEmpty: true,
			len: [1,250]
		}
	},
	completed: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	}
});

sequelize.sync({force: false}).then(function () { 
	console.log('everything is synced');

	Todo.create({
		description: 'take the cat',
		completed: false
	}).then(function (todo) {
		return Todo.create({
			description: 'take the kitty out'
		});

	}).then(function (todo) {
		console.log(todo.toJSON());
	}).then(function (todo) {
		return Todo.create({
			description: 'Hello Addy'
		});
	}).then(function (todo) {
		if (todo){
			console.log(todo.toJSON());	
		} else {
			console.log('todo not found');
		}
		
	}).then(function () {
	return Todo.findById(21);

	}).then(function (todoId) {
		console.log(todoId.toJSON());
	}).then(function () {
		return Todo.findAll({
			where: {
				completed: false
			}
		});
	}).then(function (todos) {
		if (todos) {
			todos.forEach( function (todo) {
				console.log(todo.toJSON());
			});
		} else {
			console.log('No todos found');
		}
	})

	.catch(function (e) {
		console.log(e);
	})
});