import { CommentStatus, Post, PostStatus } from "../../../generated/prisma/client";
import { PostWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";

const createPost = async(data: Omit<Post, 'id'|'createdAt'| 'updatedAt'| 'authorId'>, userId: string) => {
    const result = await prisma.post.create({
        data: {
            ...data,
            authorId: userId
        }
    })
    return result;
}
const getAllPost = async({search, tags, isFeatured, status, authorId, page, limit, skip, sortBy, sortByOrder}:{search?: string |undefined, tags: string[], isFeatured: boolean|undefined , status: PostStatus, authorId: string, page: number, limit: number, skip: number, sortBy: string, sortByOrder: string}) => {
    const andCondition : PostWhereInput[] = []
    if(search){
        andCondition.push({
          OR: [
            {
                title: {
                    contains: search as string,
                    mode: 'insensitive',
                },
            },
            {
                content: {
                    contains: search as string,
                    mode: 'insensitive'
                }
            },
            {
                tags: {
                    has: search as string
                }
            }
          ]
        })
    }
    if(tags.length > 0){
        andCondition.push({
            tags: {
                hasEvery: tags
            }
        })
    }
    if(typeof isFeatured === 'boolean'){
        andCondition.push({
            isFeatured
        })
    }
    if(status){
        andCondition.push({
            status
        })
    }
    if(authorId){
        andCondition.push({
            authorId
        })
    }
    const result = await prisma.post.findMany({
        take: page,
        skip,
        where: {
            AND: andCondition
        },
        orderBy:{
            [sortBy]: sortByOrder
        }
    })
    const totalPosts = await prisma.post.count({
        where: {
            AND: andCondition
        }
    })
    return {
        data: result,
        page: page,
        totalPosts: totalPosts,
        totalPage: Math.ceil(totalPosts/limit)
    }
}
const getPostById = async(id: string) => {
   
  const postData =    await prisma.$transaction(async(tx) => {
      await tx.post.update({
        where: {
            id: id
        },
        data: {
            views: {
                increment: 1
            }
        },
       
    })
    const result = await prisma.post.findUnique({
        where: {
            id: id
        },
         include: {
            comment: {
                where: {
                    parentId: null,
                    status: CommentStatus.APPROVED
                },
                orderBy: {createdAt: "desc"},
                include: {
                    replies: {
                        where: {
                            status: CommentStatus.APPROVED
                        },
                        orderBy: {createdAt: 'asc'},
                        include: {
                         replies: {
                            where: {
                                status: CommentStatus.APPROVED,
                            },
                            orderBy: {createdAt: 'asc'},
                         }
                        }
                    }
                }
            },
            _count: {
                select: {
                    comment: true
                }
            }
        }
    })
    return result
    })
    return postData
}
const getMyPost = async(authorId:string) => {
    console.log(authorId);
    return await prisma.post.findMany({
        where: {
            authorId
        }
    })
}
export const postService = {
    createPost,
    getAllPost,
    getPostById,
    getMyPost
}