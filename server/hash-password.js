const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const saltRounds = 10;

// Connect to MongoDB - make sure to change your connection string
mongoose.connect('mongodb+srv://root:123@abcproperty.xvtgnn3.mongodb.net/abcPropertyManagement', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Admin Model
const adminSchema = new mongoose.Schema({ username: String, password: String });
const Admin = mongoose.model('Admin', adminSchema, 'admin');

async function hashAdminPasswords() {
  try {
    const users = await Admin.find({});
    for (let user of users) {
      const hash = await bcrypt.hash(user.password, saltRounds);
      await Admin.updateOne({ _id: user._id }, { password: hash });
      console.log("Password updated for user:", user.username);
    }
    mongoose.disconnect();
    console.log('All passwords have been hashed and updated.');
  } catch (err) {
    console.error('Error during hashing process:', err);
    mongoose.disconnect();
  }
}

hashAdminPasswords();