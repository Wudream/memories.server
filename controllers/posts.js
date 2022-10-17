import mongoose from 'mongoose'
import PostMessage from '../models/postMessage.js'


//查找一个帖子
export const getPosts = async (req, res) => {
    try {
        const postMessage = await PostMessage.find()
        res.status(200).json(postMessage)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getPost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);

        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

//创建一个帖子
export const createPost = async (req, res) => {
    const post = req.body

    try {
        const newPost = new PostMessage({ ...post, creator: req.userId, creatAt: new Date().toUTCString() })
        await newPost.save()
        res.status(200).json(newPost)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

//更新帖子 
export const updatePost = async (req, res) => {
    const { id: _id } = req.params
    const post = req.body
    // 判断id与mongoes的id一样
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('没有这个id的帖子')
    // 更新
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true })
    res.json(updatedPost)
}

//删除
export const deletePost = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('没有这个id的帖子')
    //删除id
    await PostMessage.findByIdAndRemove(id)
    res.json({ message: '帖子删除成功' })
}

//喜欢
export const likePost = async (req, res) => {
    const { id } = req.params
    if (!req.userId) return res.json({ message: '未经身份验证' })
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('没有这个id的帖子')

    const post = await PostMessage.findById(id)
    // 用户是否是喜欢这个帖子
    const index = post.likes.findIndex((id) => id === String(req.userId))

    if (index === -1) {
        // 添加喜欢
        post.likes.push(req.userId)
    } else {
        // 删除喜欢
        post.likes = post.likes.filter((id) => id !== String(req.userId))
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    res.json(updatedPost)
} 
