import { Request, Response } from "express";
import { postService } from "./post.service";
import { boolean, date, string } from "better-auth/*";
import { PostStatus } from "../../../generated/prisma/enums";

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
    // console.log({search});
    const searchText = typeof search === 'string'? search : undefined
    const tags = req.query.tags? (req.query.tags as string).split(',') : []
    const isFeatured = req.query.isFeatured ? req.query.isFeatured === 'true'? true : req.query.isFeatured === 'false'? false : undefined: undefined
    // console.log(isFeatured);
    const status = req.query.status as PostStatus 
    // console.log(status);
    const authorId = req.query.authorId as string
    // console.log(authorId);
    const result = await postService.getAllPost({search: searchText, tags, isFeatured, status, authorId})
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