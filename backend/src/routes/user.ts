import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'


export const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string
	}
}>();


//perfect
userRouter.post('/signup', async  (c) => {
  const prisma = new PrismaClient({
     datasourceUrl:c.env.DATABASE_URL,
  }).$extends(withAccelerate());

   const body=await c.req.json();
   console.log("Received body:", body);
   try{
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password
      }
    })
    const jwt=await sign({id:user.id},"1234");
    return c.json({jwt});
  }
  catch(e){
    c.status(403);
    console.log(e);
    return c.text('User already exists');
  }
});





userRouter.post('/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL,
 }).$extends(withAccelerate());
  const body=await c.req.json();
  console.log("Received body:", body);
   const user = await prisma.user.findFirst({
     where:{
       email:body.email,
       password:body.password
     }
   })
   if(!user){
     c.status(403);
     return c.json({message:"User not found"})
   }
   console.log(user.id);
   const jwt=await sign({id:user.id},"1234");
   return c.json({jwt});

})


   
