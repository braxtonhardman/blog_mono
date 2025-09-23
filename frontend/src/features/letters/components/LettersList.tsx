import LetterCard from "./LetterCard"
import type { LetterCardProps } from "../types";
import { NavLink } from "react-router";
import { useEffect, useState } from "react";


// Renders the list of avaliable cards 
function LettersList() {

  const [letters, setLetters] = useState<LetterCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    // Replace with your actual backend endpoint
    fetch("http://localhost:8080/posts") 
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
        {letters.map((letter, index) => (
            <NavLink key={index} to={`/letters/${letter.Title}`} className="m-3 w-1/2">
              <LetterCard key={letter.ID} title={letter.Title} createdAt={letter.CreatedAt} />
            </ NavLink>
        ))}
    </ul>

  )
}

export default LettersList