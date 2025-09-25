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
    <div className="w-full min-h-full flex flex-col mt-6">
      {/* Top Header */}
      <div className="w-full flex flex-col items-start p-4 relative">
        <h1 className="text-4xl font-semibold">
          {post.Title}
        </h1>

        <h4 className="lg:text-xl sm:text-lg">
          {date}
        </h4>


      </div>

      <hr className="w-3/4 ml-3 border-t-2 sm:w-1/3"/>

      {/* Body - centered plain text */}
      <h3 className="p-5 font-light text-black">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, doloribus. Error harum vero adipisci reprehenderit mollitia ipsum eligendi corporis in, veniam deserunt non, hic possimus perferendis iste provident quibusdam ea cupiditate? Voluptatem eius, at tempora quia dolores officiis rem aperiam, voluptates libero iste a eaque optio in tempore ipsam, fugiat harum voluptas quas exercitationem illo. Quidem eum, ad nisi ullam animi doloribus atque nostrum accusantium. Eveniet, autem. Voluptatem magni amet earum porro nam? Nulla, non! Placeat, doloribus minima molestias recusandae voluptatum cupiditate harum dolorem necessitatibus temporibus dolor modi rerum quasi pariatur saepe in sequi iste deleniti, nobis deserunt repellendus aperiam maxime soluta. Esse possimus animi, eius voluptas commodi corporis harum hic ut quos quibusdam fugiat sed quam pariatur, tempore at in, aut eos blanditiis. Cupiditate in dolorum vero minima rerum placeat expedita! Molestias, rerum ratione? Eligendi, tempore quasi numquam eaque dolores ipsum! Ex error explicabo aliquid corrupti, id dolore totam quas mollitia, doloremque dolorum facere assumenda omnis dicta perferendis eos quasi, illum at incidunt quaerat. Sequi assumenda officiis ipsum ipsam enim aliquid exercitationem quasi voluptas numquam recusandae illum, a, molestiae nobis voluptatum. Cum aspernatur libero reprehenderit quaerat temporibus magni iure sunt tenetur saepe. Commodi repellendus ea, ipsum quod voluptatem ullam impedit sunt et est itaque nulla amet quisquam voluptatibus sed optio deserunt accusantium id iste corporis, tempora, doloribus velit quaerat sequi. Nobis, est aut! Repellendus, praesentium sint deleniti consequatur a reiciendis unde, architecto ea ipsum sit harum perferendis fuga soluta dolores modi deserunt quis voluptatem sequi? Quae ab architecto iusto quibusdam temporibus minus deserunt et. Excepturi magni animi possimus quae consequuntur eius recusandae tempore voluptates nulla totam nobis voluptatibus facilis, inventore dignissimos nesciunt corporis quibusdam sint, accusantium at suscipit maxime natus nisi temporibus incidunt. Sit labore ad repudiandae aliquam deserunt neque laborum fuga, veritatis odit quia error in explicabo a.
      </h3>
    </div>
  )
}

export default LettersDetail