import mongoose from 'mongoose'
import PostMessage from '../models/postMessage.js'

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find()
    res.status(200).json(postMessages)
    
  } catch (error) {
    res.status(404).json({ message: error })
  }
}

export const createPost = async (req, res) => {
  console.log('creating the post')
  const post = req.body
  const newPost = new PostMessage(post)
  try {
    await newPost.save()
    res.status(201).json(newPost)
  } catch (error) {
    res.status(409).json({ message: error })
  }
}

export const updatePost = async (req, res) => {
  const {id} = req.params
  const post = req.body
  const updatePost = {...post, _id: id}
  if(!mongoose.Types.ObjectId.isValid(id)) res.status(404).json('This post does not exist')
  await PostMessage.findByIdAndUpdate(id, post, { new: true })
  res.json(updatePost)
}

export const deletePost = async (req, res) => {
  const { id } = req.params
  if(!mongoose.Types.ObjectId.isValid(id)) res.status(404).json('This post does not exist')
  await PostMessage.findByIdAndRemove(id)
  res.json( {message: 'Post deleeted successfully'} )
}

export const getLikePost = async (req, res) => {
  const {id} = req.params
  if(!mongoose.Types.ObjectId.isValid(id)) res.status(404).json('This post does not exist')
  const post = await PostMessage.findById(id)
  const updatedPosst = await PostMessage.findByIdAndUpdate(id, {likeCount: post.likeCount + 1}, { new: true })
  res.json(updatedPosst)
}