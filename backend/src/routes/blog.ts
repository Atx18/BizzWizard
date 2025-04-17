import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'


export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
    }
}>();


blogRouter.use('/*', async (c, next) => {
    const jwt=c.req.header('Authorization');
    if(!jwt){
        return c.json({message:"No token provided"},401)
    }
    const token=jwt.split(' ')[1];
    const payload =await verify(token,"1234");
    if(!payload.id){
        return c.json({message:"Invalid token"},401)
    }
  await next()
})




blogRouter.post('/blog', (c) => {
	return c.text('signin route')
})


blogRouter.post('/',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
     }).$extends(withAccelerate());
     
     const body=await c.req.json();
     const blog=await prisma.post.create({
        data:{
            title:body.title,
            content:body.content,
            authorId: "442709e6-7f65-4231-b625-992ec6301a81"
        }
     })

     return c.json({
      id:blog.id
})
})


blogRouter.put('/',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
     }).$extends(withAccelerate());
     
     const body=await c.req.json();
     const blog=await prisma.post.update({
        where:{
            id:body.id
        },
        data:{
            title:body.title,
            content:body.content,
        }
     })

     return c.json({
      id:blog.id    
    
})
})


blogRouter.get('/bulk',async (c)=>{ 
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
     }).$extends(withAccelerate());
     
     const blogs=await prisma.post.findMany()
     return c.json({blogs});

})




