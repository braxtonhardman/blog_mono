import type { LetterCardProps } from "../types";
import { NavLink } from "react-router";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator";

// Renders the list of avaliable cards 
function LettersList() {

  const [letters, setLetters] = useState<LetterCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    // Replace with your actual backend endpoint
    fetch(`http://${import.meta.env.VITE_ADDRESS}/posts`) 
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch letters");
        }
        return res.json();
      })
      .then((data: LetterCardProps[]) => {
        setLetters(data);
      })
      .catch((err) => {
        console.error("Error fetching letters:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center mt-4">Loading...</p>
  }

  return (

    <ul className="flex flex-col mt-2 justify-center items-center w-full h-full">
      <div className="mt-5 w-full flex flex-col justify-between items-center">
        <ScrollArea className="w-3/4">

          <h1 className="leading-none font-bold text-xl sm:xl underline underline-offset-8">Archive</h1>

          {letters.map((letter, index) => (
                <NavLink key={index} to={`/letters/${letter.Title}`} className="m-3 hover:text-blue-500">
                  <div key={letter.ID} className="flex flex-row justify-between items-center text-semibold text-lg">
                    <h1>
                      {letter.Title}
                    </h1>
                    <h3 className="hidden sm:flex">
                      {new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }).format(new Date(letter.CreatedAt))
                      }
                    </h3>
                  </div>
                  <Separator className="my-2" />
                </ NavLink>
            ))}
        </ScrollArea>
        
      </div>
        
    </ul>

  )
}

export default LettersList