import express, { Request, Response } from 'express'
import { auth } from './lib/auth'
import { toNodeHandler } from "better-auth/node";
import { postRoutes } from './modules/post/post.route';
import { CommentsRouter } from './modules/comments/comments.router';

const app = express()

app.all("/api/auth/*splat", toNodeHandler(auth))
app.use(express.json())
app.use('/posts', postRoutes )
app.use('/comments', CommentsRouter)
app.get('/' , (req: Request, res: Response) => {
    res.send("Hello world from prisma blog")
})
export default app