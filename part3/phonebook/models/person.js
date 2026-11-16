const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URI, { family: 4 });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, 'Name must be 3+ characters long'],
    required: true,
  },
  number: {
    type: String,
    minLength: [8, 'Phone number must be 8+ characters long'],
    validate: {
      validator: function (n) {
        return /^\d{2,3}-\d+$/.test(n);
      },
      message: '{VALUE} is not a valid phone number',
    },
    required: true,
  },
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Person', personSchema);
