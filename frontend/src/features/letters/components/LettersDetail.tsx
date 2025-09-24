// Detail that appear on more information about the letter
import { TypographyH1 } from "@/components/ui/typography/TypographyH1"
import { TypographyH4 } from "@/components/ui/typography/TypographyH4"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import type { LetterCardProps } from "../types"

// Add information to fetch details about specific posts.
function LettersDetail() {

  const { title } = useParams(); // Get :title from route
  const [post, setPost] = useState<LetterCardProps>(); // post type is null or object
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
    <div className="flex flex-col mt-6">
      {/* Top Header */}
      <div className="w-full flex flex-col items-center relative mb-4">
        <TypographyH1 text={post.Title} />

        <TypographyH4 text={post.CreatedAt} />

      </div>

      {/* Body - centered plain text */}
      <div className="w-full mt-3">
        <div className="mx-auto max-w-2xl md:max-w-3xl lg:max-w-4xl px-4">
          <div className="prose prose-neutral max-w-none leading-loose">
            <TypographyH4 text={post.Description ? post.Description : ""} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LettersDetail