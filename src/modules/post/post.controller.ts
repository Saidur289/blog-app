import { Request, Response } from "express";
import { postService } from "./post.service";
import { boolean, date, string } from "better-auth/*";
import { PostStatus } from "../../../generated/prisma/enums";
import paginationSortHelper from "../../helpers/paginationSortHelper";

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
    // const page = Number(req.query.page as string ?? 1) 
    // const limit = Number(req.query.limit as string?? 10) 
    // const skip = (page - 1) * limit as number
    // const sortBy = req.query.sort as string || "createdAt";
    // const sortByOrder = req.query.sortByOrder as string || 'desc'
    const {page, limit, skip, sortBy, sortByOrder} = paginationSortHelper(req.query)
    // console.log(page, limit, skip, sortBy, sortByOrder, "all query");
    const result = await postService.getAllPost({search: searchText, tags, isFeatured, status, authorId, page, limit, skip, sortBy , sortByOrder})
    res.status(200).json({
        msg: 'get all post',
        data: result,
        length: result
    })
    }catch (error) {
        res.send({mes: 'error in create post', error})
        console.log(error);
    }

}
const getPostById = async(req: Request, res: Response) => {
    const {id} = req.params
    if(!id){
        throw new Error("id is not provided")
    }
    const result = await postService.getPostById(id as string)
    console.log(result);
    res.status(200).json({
        success: true,
        data: result
    })
}
export const postController = {
    createPost,
    getAllPost,
    getPostById
}