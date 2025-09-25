// Detail that appear on more information about the letter
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import type { LetterCardProps } from "../types"

// Add information to fetch details about specific posts.
function LettersDetail() {

  const { title } = useParams(); // Get :title from route
  const [post, setPost] = useState<LetterCardProps>(); // post type is null or object
  const [date, setDate] = useState<string>("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPost() {
      try {
        if(title) { 
          console.log(title);
          const res = await fetch(`http://localhost:8080/posts/${encodeURIComponent(title)}`);
          if (!res.ok) throw new Error("Post not found");
          const data: LetterCardProps = await res.json();
          console.log(data)
          setPost(data);
         
          const splitDate: string[] = data.CreatedAt.split("T")
          console.log(splitDate)
          setDate(splitDate[0])
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
    <div className="w-full min-h-full flex flex-col mt-6">
      {/* Top Header */}
      <div className="w-full flex flex-col items-center relative mb-4">
        <h1 className="lg:text-5xl md:text-4xl sm:text-3xl font-semibold">
          {post.Title}
        </h1>

        <h4 className="lg:text-xl sm:text-lg">
          {date}
        </h4>


      </div>

      {/* Body - centered plain text */}
      <div className="w-full mt-3">
        <div className="mx-auto max-w-2xl md:max-w-3xl lg:max-w-4xl px-4">
          <div className="prose prose-neutral max-w-none leading-loose">
            <p>
            {post.Description ? post.Description : ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LettersDetail