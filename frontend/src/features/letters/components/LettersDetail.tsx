// Detail that appear on more information about the letter
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { Calendar } from "lucide-react"

type Block = { 
  ID: number; 
  BlockType: string; 
  Content: string; 
  AssignmentOrder: number;  
  PostID: number;  
}

type PostProp = { 
  ID?: number;
  Title: string; 
  Description?: string; 
  CreatedAt: string;
  UpdatedAt: string; 
  DeletedAt: string | null; 
  Blocks: Block[]
}
// Add information to fetch details about specific posts.
function LettersDetail() {

  const { title } = useParams(); // Get :title from route
  const [post, setPost] = useState<PostProp>(); // post type is null or object
  const [date, setDate] = useState<string>("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPost() {
      try {
        if(title) { 
          console.log(title);
          const res = await fetch(`${import.meta.env.VITE_ADDRESS}/posts/${encodeURIComponent(title)}`);
          if (!res.ok) throw new Error("Post not found");
          const data: PostProp = await res.json();
          console.log(data)
          setPost(data);
         
          const newDate: string = new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(new Date(data.CreatedAt))
          setDate(newDate)
        }
          
        
      } catch (err) {
        setError("Error");
      }
    }

    fetchPost();
  }, [title]);

  if (error) return <div>Error: {error}</div>;
  if (!post) return <div>Loading...</div>;

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start mt-6">
      {/* Top Header */}
      <div className="flex flex-col items-center justify-center w-full p-4 relative text-center">
        <h1 className="text-5xl">
          {post.Title}
        </h1>

        <h4 className="font-alan text-nuetral-400 text-md flex flex-row items-center justify-center mt-2">
          <Calendar className="w-4 h-4 mr-2" />
          {date}
        </h4>


      </div>

      {/* Body - centered plain text */}
      <h3 className="p-5 font-alan text-xl text-text w-full sm:w-3/4 text-center">
        {post.Description}
      </h3>
      {post.Blocks.map((block, index) => {
        if(block.BlockType == "image") { 
          return (
            <img 
              src={block.Content} 
              key={index} 
              className="w-5/6 sm:w-1/2 md:w-1/3 h-auto my-4"
            />
          )

        } else { 
          return (
            <h3 className="p-5 font-alan text-xl font-text w-full sm:w-3/4 text-center" key={index}>
              {block.Content} 
            </h3>
          ) 
        }
      })}
      
    </div>
  )
}

export default LettersDetail