var Sequelize = require('sequelize');
var _ = require('underscore');
var sequelize = new Sequelize(undefined, undefined, undefined, {
	'dialect': 'sqlite',
	'storage': __dirname + '/database.sqlite'
});


var Todo = sequelize.define('todo', {
	description: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true,
			len: [1, 250]
		}
	},
	completed: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	}
});

var User = sequelize.define('user', {
	email: Sequelize.STRING
});

Todo.belongsTo(User);
User.hasMany(Todo);

sequelize.sync({
	force: false
}).then(function() {
	console.log('Synched');

	User.findById(1).then(function(user) {
		user.getTodos({
			where: {
				completed: true
			}
		}).then(function(todos) {

			todos.forEach(function (todo) {
				console.log(todo.toJSON());
			});
		
			//usign underscore libraray
			// var filteredTodos = _.where(todos, {
			// 	completed: true
			// });

			// console.log(filteredTodos);

			// if (!filteredTodos) {
			// 	console.log('no filtered todos');
			// } else {
			// 	filteredTodos.forEach(function(todo) {
			// 		console.log(todo.toJSON());
			// 	});
			// }

			// filteredTodos.forEach(function(todo) {
			// 	if (!todo) {
			// 		console.log('no matched todo');
			// 	} else {
			// 		console.log(todo.toJSON());
			// 	}
			// });
		});
	});





	// User.create({
	// 	email: "adnan@gmail.com"
	// }).then(function(user) {
	// 	console.log(user);
	// 	return Todo.create({
	// 		description: 'hello adnan'
	// 	});
	// }).then(function(todo) {
	// 	User.findById(1).then(function(user) {
	// 		user.addTodo(todo);
	// 	});
	// });

});