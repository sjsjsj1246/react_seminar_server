import mongoose from 'mongoose';

const { Schema } = mongoose;

const TodoSchema = new Schema({
  content: String,
  isCompleted: Boolean,
  publishedDate: {
    type: Date,
    default: Date.now,
  },
  user: {
    _id: mongoose.Types.ObjectId,
    username: String,
  },
});

const Todo = mongoose.model('Todo', TodoSchema);
export default Todo;
