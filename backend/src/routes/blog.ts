import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { createBlogInput } from '@atriavo/medium-common';
import { updateBlogInput } from '@atriavo/medium-common';

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
    }
    Variables: {
        userId: string
    }
}>();


blogRouter.use('/*', async (c, next) => {
    const jwt=c.req.header('Authorization');
    if(!jwt){
        return c.json({message:"No token provided"},401)
    }
    const token=jwt.split(' ')[1];
    try{
    const payload =await verify(token,"1234");
    if(!payload.id){
        return c.json({message:"Invalid token"},401)
    }
    c.set('userId',payload.id as string);
    console.log("User ID:", payload.id);
    console.log("User ID from context:", c.get('userId'));
  await next()
}catch(e){
    console.log(e);
    return c.json({message:"You are logged out"});
}
})







blogRouter.post('/',async (c)=>{
    const authorId=c.get('userId');
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
     }).$extends(withAccelerate());
     
     const body=await c.req.json();
        const {success} = createBlogInput.safeParse(body);
        if(!success){
            c.status(403);
           return c.json({message:"Invalid input"})
        }
        
     
     const blog=await prisma.post.create({
        data:{
            title:body.title,
            content:body.content,
            authorId:authorId as string,
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
     const {success} = updateBlogInput.safeParse(body);
     if(!success){
         c.status(403);
        return c.json({message:"Invalid input"})
     }
     
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
     
     const blogs=await prisma.post.findMany({
       select:{
         title:true,
         content:true,
          id:true,
          author:{
            select:{
                name:true,
            }
          }
       }
     })
     return c.json({blogs});

})



blogRouter.get('/:id',async (c)=>{
  const id=c.req.param('id') as string ;
  const prisma = new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL,
 }).$extends(withAccelerate());
 console.log("Requested Blog ID:", id);

  const blog=await prisma.post.findFirst({
    where:{
        id:id as string
    }
  })
    if(!blog){
        return c.json({message:"Blog not found"},404)
    }
    return c.json({
        blog
    })  
   
})




