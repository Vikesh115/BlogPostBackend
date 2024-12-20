const express = require('express');
const connectDB = require('./config/db.js');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const cors = require('cors');
const errorMiddleware = require('./middleware/errorMiddleware');
const config = require('./config/config');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: "3.0.0", // OpenAPI version
    info: {
      title: "Post API",
      version: "1.0.0",
      description: "API for managing posts and user authentication"
    },
    servers: [
      {
        url: `http://localhost:${config.PORT}/api`, // Localhost URL
        description: "Local Development Environment"
      },
      {
        url: `https://blogpostbackend-e1f0.onrender.com`, // Deployed URL (replace with your actual deployed URL)
        description: "Production Environment"
      }
    ],
  },
  apis: ["./routes/postRoutes.js", "./controllers/postController.js"], // Path to the route and controller files for documentation
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

// Middlewares
app.use(express.json());
app.use(cors());

// Connect to the database
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/', (req, res) => {
  console.log("Server is running!!!");
  res.status(200).json("Server started...");
});

// Error handling middleware (must be placed after routes)
app.use(errorMiddleware);

// Start the server
app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});






// const express = require('express');
// const connectDB = require('./config/db.js');
// const authRoutes = require('./routes/authRoutes');
// const postRoutes = require('./routes/postRoutes');
// const cors = require('cors');
// const errorMiddleware = require('./middleware/errorMiddleware');
// const config = require('./config/config');

// const app = express();

// // Middlewares
// app.use(express.json());
// app.use(cors())

// // Connect to the database
// connectDB();

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/posts', postRoutes);

// app.get('/',(req,res)=>{
//   console.log("Server is running!!!");
//   res.status(200).json("Server started...")
// })

// // Error handling middleware (must be placed after routes)
// app.use(errorMiddleware);

// // Start the server
// app.listen(config.PORT, () => {
//   console.log(`Server running on port ${config.PORT}`);
// });
