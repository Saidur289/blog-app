import { Request, Response } from "express";
import { postService } from "./post.service";

const createPost = async(req: Request, res: Response) => {
    try {
       console.log(req.user)  
       const user = req.user
       if(!user){
         return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
       }
       const result = await postService.createPost(req.body, user.id)
       res.status(201).json(result)
    } catch (error) {
        res.send({mes: 'error in create post', error})
    }
}
export const postController = {
    createPost
}