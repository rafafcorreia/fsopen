const Note = require('../models/note');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const initialNotes = [
  {
    content: 'HTML is easy',
    important: false,
  },
  {
    content: 'Browser can execute only JavaScript',
    important: true,
  },
];

const nonExistingId = async () => {
  const note = new Note({ content: 'Lorem Ipsum Test' });
  await note.save();
  await note.deleteOne();
  return note._id.toString();
};

const notesInDb = async () => {
  const notes = await Note.find({});
  return notes.map((n) => n.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

const createUser = async (username, password) => {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User({
    username,
    passwordHash,
  });

  return await user.save();
};

const createToken = (user, expiresIn = 60 * 60) => {
  const userForToken = {
    username: user.username,
    id: user.id,
  };

  return jwt.sign(userForToken, process.env.SECRET, {
    expiresIn,
  });
};

module.exports = {
  initialNotes,
  nonExistingId,
  notesInDb,
  usersInDb,
  createUser,
  createToken,
};
