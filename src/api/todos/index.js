import Router from 'koa-router';
import checkLoggedIn from '../../lib/checkLoggedin';
import * as todosCtrl from './todos.ctrl';

const todos = new Router();

todos.get('/', todosCtrl.list);
todos.post('/', checkLoggedIn, todosCtrl.write);
todos.get('/:id', todosCtrl.getTodoById, todosCtrl.read);
todos.delete(
  '/:id',
  checkLoggedIn,
  todosCtrl.getTodoById,
  todosCtrl.checkOwnTodo,
  todosCtrl.remove,
);
todos.patch(
  '/:id',
  checkLoggedIn,
  todosCtrl.getTodoById,
  todosCtrl.checkOwnTodo,
  todosCtrl.update,
);

export default todos;
