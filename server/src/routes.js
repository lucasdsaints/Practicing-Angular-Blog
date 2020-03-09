const PostController = require('./controllers/PostController')

module.exports = (app) => {
  // Search for all posts
  app.get('/posts', PostController.getPosts)

  // Search for an especific post
  app.get('/posts/:postId', PostController.getPost)

  // Create a new post
  app.post('/posts', PostController.createPost)

  // Update a given post
  app.put('/posts/:postId', PostController.updatePost)

  // Delete a post
  app.delete('/posts/:postId', PostController.deletePost)
}
