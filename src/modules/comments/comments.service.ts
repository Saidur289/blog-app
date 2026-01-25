import { CommentStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma"

const createComment = async(payload: {postId: string, parentId?: string, content: string, authorId: string}) => {
    console.log(payload);
    await prisma.post.findUniqueOrThrow({
        where: {
           id: payload.postId 
        },
    })
    if(payload.parentId){
        await prisma.comment.findFirstOrThrow({
            where: {
                id: payload.parentId
            }
        })
    }
    return await prisma.comment.create({
        data: payload
    })
}
const getCommentById = async(commentId: string) => {
    // console.log({commentId});
    const result = await prisma.comment.findUnique({
        where: {
            id: commentId
        },
        include:{
            post:{
                select:{
                    id:true,
                    title:true
                }
            }
        }
    })
    return result
}
const getCommentByAuthor = async( authorId: string) => {
    // console.log({commentId, authorId});
    const commentData = await prisma.comment.findMany({
        where: {
            authorId
        },
        include: {
            post: {
                select: {
                    id: true,
                    title: true
                }
            }
        }
    })
    console.log(commentData);
    return commentData
}
const updateComment = async(commentId: string, authorId: string, data:{status?: CommentStatus, content?: string}) => {
    console.log({commentId, authorId, data});
    const commentData = await prisma.comment.findFirst({
        where: {
            id: commentId,
            authorId
           
        },
        select:{
            id: true
        }
    })
    // console.log(commentData);
    if(!commentData){
        throw new Error("invalid input")
    }
    return await prisma.comment.update({
        where: {
            id: commentData.id,
            authorId
        },
        data
    })
    
}
const deleteComment = async(commentId: string, authorId: string) => {
     console.log({commentId, authorId});
    const commentData = await prisma.comment.findFirst({
        where: {
            id: commentId,
            authorId
           
        },
        select: {
            id: true
        }
    })
    // console.log(commentData);
    if(!commentData){
        throw new Error("invalid input")
    }
    return await prisma.comment.delete({
        where: {
            id: commentData.id,
            authorId
        },
        
    })
    
}
const moderateComment = async(commentId: string, data: {status: CommentStatus}) => {
    const commentData = await prisma.comment.findUniqueOrThrow({
        where: {
            id: commentId
        },
        select: {
            id: true,
            status: true
        }
    })
    if(commentData.status === data.status){
        throw new Error(`Your comments status is ${data.status} upto date`)
    }
    return await prisma.comment.update({
        where: {
            id: commentData.id
        },
        data
    })
}
export const CommentsService = {
    createComment,
    getCommentById,
    getCommentByAuthor,
    updateComment,
    deleteComment,
    moderateComment
}