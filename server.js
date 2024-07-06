const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid'); // Import uuid

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

const dbURI = 'mongodb+srv://harsh_v:harsh123@mern.jspkf5g.mongodb.net/?retryWrites=true&w=majority&appName=MERN';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    seedDatabase(); // Call the seed function
    app.listen(9000, () => console.log('Server is running on port 9000'));
  })
  .catch(err => console.log(err));

// Blog Schema and Model
const blogSchema = new mongoose.Schema({
  id: { type: String, unique: true, default: uuidv4 }, // Generate unique ID
  title: String,
  body: String,
  author: String
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);

const blogs = [
  {
    id: "8955",
    title: "1st Blog",
    body: "Here are our first blog.....",
    author: "Harsh"
  }
];

// Function to seed the database
const seedDatabase = async () => {
  try {
    await Blog.deleteMany({}); // Clear existing data
    await Blog.insertMany(blogs);
    console.log('Database seeded successfully');
  } catch (err) {
    console.log(err);
  }
};

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Blog API');
});

// Routes
app.get('/blogs', (req, res) => {
  Blog.find()
    .then(result => res.json(result))
    .catch(err => res.status(500).json({ error: err.message }));
});

// New route to get a blog by ID
app.get('/blogs/:id', (req, res) => {
  Blog.findOne({ id: req.params.id })
    .then(result => res.json(result))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.post('/blogs', (req, res) => {
  const blog = new Blog({
    ...req.body,
    id: uuidv4() // Generate unique ID for new blog
  });
  blog.save()
    .then(result => res.status(201).json(result))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.delete('/blogs/:id', (req, res) => {
  Blog.findOneAndDelete({ id: req.params.id })
    .then(result => res.json({ message: 'Blog deleted' }))
    .catch(err => res.status(500).json({ error: err.message }));
});

