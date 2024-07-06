const mongoose = require('mongoose');

// MongoDB connection
const dbURI = 'mongodb+srv://Harsh_v:Harsh@blogapp.psfe4v4.mongodb.net/BlogApp?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    seedDatabase();
  })
  .catch(err => console.log(err));

// Blog Schema and Model
const blogSchema = new mongoose.Schema({
  title: String,
  body: String,
  author: String
});

const Blog = mongoose.model('Blog', blogSchema);

const blogs = [
  {
    title: "First Blog",
    body: "This is the body of the first blog.",
    author: "Harsh"
  },
  {
    title: "Second Blog",
    body: "This is the body of the second blog.",
    author: "Harsh"
  },
  {
    title: "Third Blog",
    body: "This is the body of the third blog.",
    author: "Harsh"
  }
];

const seedDatabase = async () => {
  try {
    await Blog.deleteMany({}); // Clear existing data
    await Blog.insertMany(blogs);
    console.log('Database seeded successfully');
    mongoose.connection.close();
  } catch (err) {
    console.log(err);
  }
};
