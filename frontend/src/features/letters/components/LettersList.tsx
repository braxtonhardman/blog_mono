import type { LetterCardProps } from "../types";
import { NavLink } from "react-router";
import { useEffect, useState } from "react";
import { Clock } from 'lucide-react';
import { Calendar } from "lucide-react";
import { ArrowRight } from 'lucide-react';


// Renders the list of avaliable cards 
function LettersList() {

  const [letters, setLetters] = useState<LetterCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    // Replace with your actual backend endpoint
    fetch(`${import.meta.env.VITE_ADDRESS}/posts`) 
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch letters");
        }
        return res.json();
      })
      .then((data: LetterCardProps[]) => {
        console.log(data)
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
    <div className="flex w-full items-center justify-center p-4">

      {/* List Container */}
      <ul className="flex flex-col mt-2 sm:w-5/6 w-full justify-center items-center card bg-background-light shadow-lg">
        <div className="w-full">

            <h1 className="leading-none font-lexend text-3xl sm:xl p-4">
              Archive
            </h1>

            {letters.map((letter, index) => (
              <NavLink key={index} to={`/archives/${letter.Title}`} className="hover:text-secondary">
                <div key={letter.ID} className="grid grid-cols-2 items-center text-semibold hover:bg-background-dark border border-background-dark p-2">

                  <div className="flex flex-row items-center justify-start col-start-1 col-span-2 p-2">

                    {/* Title */}
                    <h1 className="col-start-1 font-lexend text-xl">
                      {letter.Title}
                    </h1>

                    <div className="hidden sm:flex flex-row items-center justify-between grow  text-neutral-400 ml-4">
                      <div className="flex flex-row items-center justify-center">
                        <Clock className="w-4 h-4"/>
                        <h3 className="ml-2 font-lexend text-sm sm:text-md">
                          {letter.ReadTime} min read
                        </h3>
                      </div>
                      
                      <div className="flex flex-row items-center justify-center">
                        <Calendar className="h-4 w-4 mr-2"/>
                        <h3 className="font-lexend text-sm sm:text-md">
                          {new Intl.DateTimeFormat("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }).format(new Date(letter.CreatedAt))}
                        </h3>
                      </div>
                      
                    </div>
                  </div>

                  {/* Description */}
                  <div className="m-0 p-2 col-start-1 row-start-2 col-span-2 sm:col-span-1 flex flex-row items-center justify-between">
                    <h1 className="font-alan text-sm sm:text-md text-neutral-400 sm:max-w-full">
                      {letter.Description}
                    </h1>
                  </div>

                  {/* Read Article */}
                  <div className="col-start-2 row-start-3 flex flex-row items-center justify-end mr-2 text-primary hover:text-secondary group cursor-pointer">
                    <h1 className="text-sm sm:text-md">
                      Read Article
                    </h1>
                    
                    <ArrowRight className="h-4 w-4 ml-1 transform transition-transform duration-200 group-hover:translate-x-2" />
                  </div>
                  
                </div>
              </ NavLink>
              ))}
          
        </div>
          
      </ul>
    </div>
    

  )
}

export default LettersList