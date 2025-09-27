// Detail that appear on more information about the letter
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import type { LetterCardProps } from "../types"

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
          const res = await fetch(`http://localhost:8080/posts/${encodeURIComponent(title)}`);
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
    <div className="w-full min-h-full flex flex-col items-center justify-center mt-6">
      {/* Top Header */}
      <div className="flex flex-col items-center justify-center w-full sm:w-3/4 p-4 relative">
        <h1 className="text-5xl text-text font-alan font-semibold">
          {post.Title}
        </h1>

        <h4 className="font-alan text-text text-md">
          {date}
        </h4>


      </div>

      {/* Body - centered plain text */}
      <h3 className="p-5 font-alan text-text w-full sm:w-3/4">
        {post.Description}
      </h3>
      {post.Blocks.map((block, index) => {
        if(block.BlockType == "image") { 
          return (
            <img src={block.Content} key={index}></img>
          )

        } else { 
          return (
            <h3 className="p-5 font-alan text-text font-text w-full sm:w-3/4" key={index}>
              {/* {block.Content} */} Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium eum iure incidunt facilis ratione. Molestias similique nemo, suscipit excepturi beatae doloremque, error ea reiciendis sint veritatis deserunt soluta. Maxime modi repellendus quidem voluptatem perferendis, veritatis distinctio nemo quia. Optio atque vitae voluptatem culpa similique possimus adipisci quis ullam suscipit animi eius, velit quibusdam dolorum ex laboriosam, delectus architecto qui! Ab, dolor voluptatum dicta quis consequuntur beatae corrupti. Necessitatibus temporibus quibusdam ab nemo, eaque consequuntur, molestiae incidunt deserunt nam expedita commodi? Pariatur sequi cupiditate porro, ex quam sed hic dicta similique. Laborum praesentium, magnam rerum rem sint tenetur, laboriosam aspernatur saepe natus earum necessitatibus ex animi dignissimos quos expedita officiis pariatur! Nihil impedit laudantium non obcaecati distinctio sunt pariatur, accusantium reprehenderit in, fugiat, laboriosam quaerat eligendi sequi? Eveniet voluptatibus neque quae eaque eius impedit aspernatur nemo quos non illum, enim eum dignissimos, minus doloremque repudiandae numquam, atque voluptatem tenetur? Explicabo itaque delectus adipisci eos? Enim incidunt dicta distinctio quis repellat in, provident ut ea sit culpa vitae, molestiae similique laudantium dolores sed assumenda soluta minus corporis? Sunt fugit ducimus debitis dolorum nihil fuga est cum iste optio illum earum consequatur, dolore neque, modi voluptatem itaque, omnis nobis obcaecati doloremque excepturi eaque?
            </h3>
          ) 
        }
      })}
      
    </div>
  )
}

export default LettersDetail