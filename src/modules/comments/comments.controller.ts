import { Request, Response } from "express"
import { CommentsService } from "./comments.service"

const createComment = async(req: Request, res: Response) => {
    try {
    //    console.log(req.user)  
       const user = req.user
       if(!user){
         return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
       }
       req.body.authorId = req.user?.id
       const result = await CommentsService.createComment(req.body)
       res.status(201).json(result)
    } catch (error) {
        res.send({mes: 'error in create comments', error})
        
    }
}
const getCommentById = async(req: Request, res: Response) => {
    try {
    //    console.log(req.user)  
    const {commentId} = req.params
       const user = req.user
       if(!user){
         return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
       }
    //    req.body.authorId = req.user?.id
       const result = await CommentsService.getCommentById(commentId as string)
       res.status(201).json(result)
    } catch (error) {
        console.log(error);
        res.send({mes: 'error in create comments', error})
        
    }
}
const getCommentByIdAuthor = async(req: Request, res: Response) => {
    try {
    
    const {authorId} = req.params 
    const result = await CommentsService.getCommentByAuthor(authorId as string)
       res.status(201).json(result)
    } catch (error) {
        console.log(error);
        res.send({mes: 'error in get comments', error})
        
    }
}
const updateComment = async(req: Request, res: Response) => {
    try {
    
    const {commentId} = req.params 
    const user = req.user
    if(!user) return undefined
    const result = await CommentsService.updateComment(commentId as string,  user.id as string ,req.body)
       res.status(201).json({
        msg: "updated successfully",
        data: result
       })
    } catch (error) {
        console.log(error);
        console.log(error);
        res.send({mes: 'error in get comments', error})
        
    }
}
const deleteComment = async(req: Request, res: Response) => {
    try {
    
    const {commentId} = req.params 
    const user = req.user
    if(!user) return undefined
    const result = await CommentsService.deleteComment(commentId as string,  user.id as string)
       res.status(201).json({
        msg: "deleted successfully"
       })
    } catch (error) {
        console.log(error);
        console.log(error);
        res.send({mes: 'error in get comments', error})
        
    }
}
const moderateComment = async(req: Request, res: Response) => {
    try {
    
    const {commentId} = req.params 
    // console.log(req.body);
    const result = await CommentsService.moderateComment(commentId as string,  req.body)
       res.status(201).json({
        msg: "status updated successfully",
        data: result
       })
    } catch (error) {
        console.log(error);
        res.send({mes: 'error in get comments', error})
        
    }
}
export const CommentsController = {
    createComment,
    getCommentById,
    getCommentByIdAuthor,
    updateComment,
    deleteComment,
    moderateComment
}