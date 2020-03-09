const { Post } = require('../models')

module.exports = {
  async getPosts (req, res) {
    try {
      const posts = await Post.findAll({
        order: [['createdAt', 'DESC']]
      })
      res.send(posts)
    } catch (error) {
      console.log(error)
      res.status(500).send({
        message: 'An error occured when trying to retrieve the Posts.'
      })
    }
  },

  async getPost (req, res) {
    const { postId } = req.params
    try {
      const post = await Post.findByPk(postId)

      if (!post) {
        return res.status(404).send({
          message: 'There are no data for the given id.'
        })
      }

      res.send(post)
    } catch (error) {
      res.status(500).send({
        message: 'An error occured when trying to retrieve the Posts.'
      })
    }
  },

  async createPost (req, res) {
    const { title, author, content } = req.body

    if (!title || !author || !content) {
      return res.status(404).send({ message: 'Missing information.' })
    }

    try {
      const post = await Post.create({
        title,
        author,
        content
      })
      res.status(201).send(post)
    } catch (error) {
      res.status(500).send({
        message: 'An error occured when trying to create a new Post.'
      })
    }
  },

  async updatePost (req, res) {
    const { title, author, content, status } = req.body
    const { postId } = req.params

    if (!title || !author || !content) {
      return res.status(404).send({ message: 'Missing information.' })
    }

    try {
      const [update] = await Post.update({
        title,
        author,
        content,
        status
      }, {
        where: { id: postId }
      })

      if (!update) {
        return res.status(404).send({
          message: 'There are no data for the given id.'
        })
      }

      res.send({
        message: 'Post updated successfully.'
      })
    } catch (error) {
      console.log(error)
      res.status(500).send({
        message: 'An error occured when trying to update the Post.'
      })
    }
  },

  async deletePost (req, res) {
    const { postId } = req.params
    if (!postId) {
      return res.status(404).send({
        message: 'Missing information.'
      })
    }

    try {
      const deleted = await Post.destroy({
        where: { id: postId }
      })

      if (!deleted) {
        res.status(404).send({
          message: 'There are no data for the given id.'
        })
      }

      res.send({
        message: 'Post deleted successfully'
      })
    } catch (error) {
      res.status(500).send({
        message: 'An error occured when trying to create a new Post.'
      })
    }
  }
}
