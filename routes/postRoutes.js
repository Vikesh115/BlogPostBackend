/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: API for managing posts
 */

const express = require('express');
const { createPost, getAllPosts, getPostById, updatePost, deletePost } = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * /posts:
 *   get:
 *     tags:
 *       - Posts
 *     summary: Get all posts
 *     description: Retrieve a list of all posts
 *     responses:
 *       200:
 *         description: A list of posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   content:
 *                     type: string
 *                   image:
 *                     type: string
 *                   author:
 *                     type: object
 *                     properties:
 *                       email:
 *                         type: string
 *                       name:
 *                         type: string
 */

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     tags:
 *       - Posts
 *     summary: Get post by ID
 *     description: Retrieve a single post by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The post ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A post object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                 content:
 *                   type: string
 *                 image:
 *                   type: string
 *                 author:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                     name:
 *                       type: string
 *       404:
 *         description: Post not found
 */

router.get('/', getAllPosts);           // Get all posts
router.get('/:id', getPostById);        // Get post by ID

// Protected routes (authentication required)
router.post('/', authMiddleware, createPost);  // Create a new post
router.put('/:id', authMiddleware, updatePost); // Update a post
router.delete('/:id', authMiddleware, deletePost); // Delete a post

module.exports = router;




// const express = require('express');
// const { createPost, getAllPosts, getPostById, updatePost, deletePost } = require('../controllers/postController');
// const authMiddleware = require('../middleware/authMiddleware');
// const router = express.Router();

// // Public routes
// router.get('/', getAllPosts);           // Get all posts
// router.get('/:id', getPostById);        // Get post by ID

// // Protected routes (authentication required)
// router.post('/', authMiddleware, createPost);  // Create a new post
// router.put('/:id', authMiddleware, updatePost); // Update a post
// router.delete('/:id', authMiddleware, deletePost); // Delete a post

// module.exports = router;