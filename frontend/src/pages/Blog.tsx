import { useBlog } from "../hooks"
import { Appbar } from "../components/Appbar";
import { FullBlog } from "../components/FullBlog";
import {useParams} from "react-router-dom";

export const Blog = () => {
    const { id } = useParams();
     const {loading,blog}=useBlog(id || "");
     if(loading ||!blog){
       return <div>
          <Appbar/>
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        </div>
       </div>
     }

    return <div>
        <FullBlog blog={blog} />
    </div>
}