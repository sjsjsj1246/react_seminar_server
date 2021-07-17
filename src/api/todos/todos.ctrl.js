import Todo from '../../models/todo';
import mongoose from 'mongoose';
import Joi from 'joi';

const { ObjectId } = mongoose.Types;

export const getTodoById = async (ctx, next) => {
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400;
    return;
  }
  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      ctx.status = 404;
      return;
    }
    ctx.state.todo = todo;
    return next();
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const checkOwnTodo = (ctx, next) => {
  const { user, todo } = ctx.state;
  if (todo.user._id.toString() !== user._id) {
    ctx.status = 403;
    return;
  }
  return next();
};

/*
  POST /api/todos
  {
    content: '내용',
  }
*/
export const write = async (ctx) => {
  const schema = Joi.object().keys({
    content: Joi.string().required(),
  });

  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }
  const { content } = ctx.request.body;
  const todo = new Todo({
    content,
    isCompleted: false,
    user: ctx.state.user,
  });
  try {
    await todo.save();
    ctx.body = {
      id: todo._id,
      content: todo.content,
      publishedDate: todo.publishedDate,
    };
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
  GET /api/todos
*/
export const list = async (ctx) => {
  try {
    const todos = await Todo.find();
    ctx.body = todos
      .filter((todo) => todo.user._id == ctx.state.user._id)
      .map((todo) => {
        return {
          id: todo._id,
          content: todo.content,
          isCompleted: todo.isCompleted,
          publishedDate: todo.publishedDate,
        };
      });
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
  GET /api/todos/:id
*/
export const read = async (ctx) => {
  ctx.body = {
    id: ctx.state.todo._id,
    content: ctx.state.todo.content,
    isCompleted: ctx.state.todo.isCompleted,
    publishedDate: ctx.state.todo.publishedDate,
  };
};

/*
  DELETE /api/todos/:id
*/
export const remove = async (ctx) => {
  const { id } = ctx.params;
  try {
    await Todo.findByIdAndRemove(id).exec();
    ctx.status = 204;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
  PATCH /api/todos/:id
  {
    content: '수정',
  }
*/
export const update = async (ctx) => {
  const { id } = ctx.params;
  const schema = Joi.object().keys({
    content: Joi.string(),
  });

  // 검증 후, 검증 실패시 에러처리
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const nextData = { ...ctx.request.body };

  try {
    const todo = await Todo.findByIdAndUpdate(id, nextData, {
      new: true,
    }).exec();
    if (!todo) {
      ctx.status = 404;
      return;
    }
    ctx.body = {
      id: todo._id,
      content: todo.content,
      isCompleted: todo.isCompleted,
      publishedDate: todo.publishedDate,
    };
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
  PATCH /api/todos/complete/:id
*/
export const toggle = async (ctx) => {
  const { id } = ctx.params;

  const todo = await Todo.findById(id);

  try {
    const next = await Todo.findByIdAndUpdate(
      id,
      { isCompleted: !todo.isCompleted },
      {
        new: true,
      },
    ).exec();
    if (!next) {
      ctx.status = 404;
      return;
    }
    ctx.body = {
      id: next._id,
      content: next.content,
      isCompleted: next.isCompleted,
      publishedDate: todo.publishedDate,
    };
  } catch (e) {
    ctx.throw(500, e);
  }
};
