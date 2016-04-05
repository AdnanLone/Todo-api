//get todos

using underscore and todo array
var queryParams = req.query; //give me completed = true or false
var filteredTodos = todos;

if (queryParams.hasOwnProperty('completed') && (queryParams.completed === 'true')) {
	filteredTodos = _.where(filteredTodos, {
		completed: true
	});
} else if (queryParams.hasOwnProperty('completed') && (queryParams.completed === 'false')) {
	filteredTodos = _.where(filteredTodos, {
		completed: false
	});
}

if (queryParams.hasOwnProperty('q') && queryParams.q.length > 0) {
	filteredTodos = _.filter(filteredTodos, function(todo) {
		return todo.description.toLowerCase().indexOf(queryParams.q.toLowerCase()) > -1;
	});
}
res.json(filteredTodos);

//get todos/:id

db.todo.findById(todoId).then(function(todo) {
	res.status(200).send(todo.toJSON());
}).catch(function(e) {
	res.status(404).send(e);
});


var matchedTodo = _.findWhere(todos, {
	id: todoId
});

if (matchedTodo) {
	res.json(matchedTodo);
} else {
	res.status(404).send();
}

//post/Todos
db.todo.create({
	description: body.description,
	completed: body.completed
}).then(function() {
	res.status(200).json(body);

}).catch(function(e) {
	res.status(400).json(e);
});

using underscore and array storage
if ((!_.isBoolean(body.completed)) || (!_.isString(body.description) || (body.description.trim().length === 0))) {
	return res.status(400).send();
}
body.description = body.description.trim();
body.id = todoNextId++;
todos.push(body);
console.log('description: ' + body.description);
res.json(body);


//delete todos/:id

var matchedTodo = _.findWhere(todos, {
	id: todoId
});

if (!matchedTodo) {
	res.status(404).json({
		"error": "no todo found with that id"
	});
} else {
	todos = _.without(todos, matchedTodo);
	res.json(matchedTodo);
}

//put todos/;id 
var matchedTodo = _.findWhere(todos, {
	id: todoId
});
var body = _.pick(req.body, 'description', 'completed');
var validAttributes = {};

if (!matchedTodo) {
	return res.sendStatus(404).send();
}

if (body.hasOwnProperty('completed') && _.isBoolean(body.completed)) {
	validAttributes.completed = body.completed;
} else if (body.hasOwnProperty('completed')) {
	return res.status(400).send();
}

if (body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0) {
	validAttributes.description = body.description;
} else if (body.hasOwnProperty('description')) {
	return res.status(400).send();
}

_.extend(matchedTodo, validAttributes);
res.json(matchedTodo);


//old sequelize delete 

db.todo.find({
		where: {
			id: todoId
		}
	})
	.then(function(matchedTodo) {
		if (!matchedTodo) {
			res.status(404).send({
				"error": "no todo found with that id"
			});
		} else {
			matchedTodo.destroy();
			res.json(matchedTodo);
		}
	}, function(e) {
		res.status(500).send();
	});

//old sequelize put 

db.todo.find({
		where: {
			id: todoId
		}
	})
	.then(function(matchedTodo) {
		if (!matchedTodo)
			return res.status(404).send();

		if (body.hasOwnProperty('completed') && _.isBoolean(body.completed)) {
			matchedTodo.update({
				completed: body.completed
			});
		} else if (body.hasOwnProperty('completed')) {
			return res.status(404).send();
		}

		if (body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0) {
			matchedTodo.update({
				description: body.description
			});
		} else if (body.hasOwnProperty('description')) {
			return res.status(404).send();
		}
		res.json(matchedTodo);
	});