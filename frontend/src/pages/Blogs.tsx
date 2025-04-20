import { BlogCard } from "../components/BlogCard"
import { Appbar } from "../components/Appbar"

import { useBlogs } from "../hooks"
export  const Blogs = () => {
const {loading, blogs} = useBlogs();
if(loading){
     return <div>
        <Appbar />
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        </div>
     </div>
}
    return <div>
        <Appbar />
     <div className="flex justify-center">
        <div className="max-w-xl">

      {blogs.map(blog => <BlogCard
                    id={blog.id}
                    authorName={blog.author.name || "Anonymous"}
                    title={blog.title}
                    content={blog.content}
                    publishedDate={"2nd Feb 2024"}
                />)}
      </div>
    </div>
    </div>
}