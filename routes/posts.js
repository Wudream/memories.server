import express from "express";
import { getPosts, createPost, updatePost, deletePost, likePost } from "../controllers/posts.js";

import auth from '../middleware/auth.js'

const router = express.Router()

router.get('/', getPosts)
//发送
router.post('/', auth,createPost)
//更新
router.patch('/:id', auth, updatePost)
//删除
router.delete('/:id', auth, deletePost)
//喜欢
router.patch('/:id/likePost', auth, likePost)


export default router;