import { Request, Response } from "express";
import { postService } from "./post.service";
import { date, string } from "better-auth/*";

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
const getAllPost = async(req: Request, res: Response) => {
    try{
    const {search} = req.query
    console.log({search});
    const searchText = typeof search === 'string'? search : undefined
    const tags = req.query.tags? (req.query.tags as string).split(',') : []
    
    const result = await postService.getAllPost({search: searchText, tags})
    res.status(200).json({
        msg: 'get all post',
        data: result,
        length: result.length
    })
    }catch (error) {
        res.send({mes: 'error in create post', error})
        console.log(error);
    }

}
export const postController = {
    createPost,
    getAllPost
}