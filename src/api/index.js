import Router from 'koa-router';
import auth from './auth';
import todos from './todos';

const api = new Router();

api.use('/todos', todos.routes());
api.use('/auth', auth.routes());

export default api;
