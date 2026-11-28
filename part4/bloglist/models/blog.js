const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

blogSchema.set('toJSON', {
  transform: (originalDoc, returnedDoc) => {
    returnedDoc.id = returnedDoc._id.toString();
    delete returnedDoc._id;
    delete returnedDoc.__v;
    if (returnedDoc.user instanceof mongoose.Types.ObjectId) {
      returnedDoc.user = returnedDoc.user.toString()
    }
  }
});

module.exports = mongoose.model('Blog', blogSchema);
