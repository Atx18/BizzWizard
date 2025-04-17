import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { useId } from 'hono/jsx';
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';
// Create the main Hono app
const app = new Hono<{
	Bindings: {
		DATABASE_URL: string
	}
}>();
// app.get('/', (c) => {
//   return c.text('Hello Hono! This is the backend of the blog app.')
// });

app.route('/api/v1/user', userRouter);
app.route('/api/v1/blog', blogRouter);



// app.use('/api/v1/blog/*', async (c, next) => {
//     const jwt=c.req.header('Authorization');
//     if(!jwt){
//         return c.json({message:"No token provided"},401)
//     }
//     const token=jwt.split(' ')[1];
//     const payload =await verify(token,"1234");
//     if(!payload.id){
//         return c.json({message:"Invalid token"},401)
//     }
//   await next()
// })


// //perfect
// app.post('/api/v1/user/signup', async  (c) => {
//   const prisma = new PrismaClient({
//      datasourceUrl:c.env.DATABASE_URL,
//   }).$extends(withAccelerate());

//    const body=await c.req.json();
//    console.log("Received body:", body);
//    try{
//     const user = await prisma.user.create({
//       data: {
//         email: body.email,
//         password: body.password
//       }
//     })
//     const jwt=await sign({id:user.id},"1234");
//     return c.json({jwt});
//   }
//   catch(e){
//     c.status(403);
//     console.log(e);
//     return c.text('User already exists');
//   }
// });





// app.post('/api/v1/user/signin', async (c) => {
//   const prisma = new PrismaClient({
//     datasourceUrl:c.env.DATABASE_URL,
//  }).$extends(withAccelerate());
//   const body=await c.req.json();
//   console.log("Received body:", body);
//    const user = await prisma.user.findFirst({
//      where:{
//        email:body.email,
//        password:body.password
//      }
//    })
//    if(!user){
//      c.status(403);
//      return c.json({message:"User not found"})
//    }
//    const jwt=await sign({id:user.id},"1234");
//    return c.json({jwt});

// })


// // app.get('/api/v1/blog/:id', (c) => {
// // 	const id = c.req.param('id')
// // 	console.log(id);
// // 	return c.text('get blog route')
// // })

// app.post('/api/v1/blog', (c) => {
// 	return c.text('signin route')
// })

// app.put('/api/v1/blog', (c) => {
// 	return c.text('signin route')
// })

export default app;
