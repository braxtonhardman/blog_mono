import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"

import { EmailSignUp } from "@/features/emailsubscribe/components/EmailSignUp"
import { useEffect, useState } from "react"
import { NavLink } from "react-router"
import type { LetterCardProps } from "@/features/letters/types"
import { SquareArrowOutUpRight } from 'lucide-react';
import { Button } from "@/components/ui/button"

function Home() {
  const [letters, setLetters] = useState<LetterCardProps[]>([]);

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
  }, []);

  return (
    <div className="grid grid-cols-6 gap-5 mt-7">

      {/* Header */}
      <div className="flex flex-col items-start justify-start w-full h-full sm:col-start-2 col-start-1 col-span-6 sm:col-span-4 row-start-1 m-2 p-2">
        <h1 className="font-alan text-xl sm:text-3xl">
          Projects, insights, and ideas for modern software and hardware.
        </h1>
      </div>


      <div className="flex flex-col justify-center sm:justify-between items-center w-full h-full row-start-2 col-start-1 sm:col-start-2 col-span-6 sm:col-span-4">
        <Carousel
          
          className="min-w-full w-full h-full sm:max-w-5/6 mt-5"
          >
            <CarouselContent className="p-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem
                  key={index}
                  className="sm:basis-1/2 lg:basis-1/3 flex justify-center"
                >
                  {/* Card */}
                  <div className="flex flex-col items-start justify-start w-5/6 h-11/12 m-2 card text-text rounded-lg shadow-md overflow-hidden">
                    
                  
                    {/* Image / Placeholder */}
                    <div className="w-full h-32 bg-gradient-to-b from-bg-light to-bg-dark flex items-center justify-center text-text-muted font-semibold">
                      Image
                    </div>

                    {/* Content */}
                    <div className="p-4 flex flex-col gap-2">
                      {/* Title */}
                      <h2 className="font-alan text-lg font-semibold">
                        Title
                      </h2>

                      {/* Description */}
                      <p className="text-text-muted text-sm">
                        A brief description goes here. Keep it concise and clear.
                      </p>

                      <div className="w-full flex justify-start mt-2">
                        <button className="button rounded-md font-alan text-sm px-4 py-2 whitespace-nowrap">
                          Learn More
                        </button>
                      </div>
                      
                    </div>

                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
        </Carousel>
      </div>      

      {/* Letters Side Bar */}
      <ul className="flex-col m-0 p-0 items-start justify-start col-start-6 row-span-2 row-start-1 hidden lg:flex mt-2"> 
        <h1 className="font-alan text-2xl">
          From the Archive
        </h1>

        <hr className="w-5/6 h-1"/>
        
        <div>

        </div>
        {letters.slice(0, 6).map((letter, index) => (
          <li key={index} className="mt-2">
            <NavLink to={`/archives/${letter.Title}`}>
              <div className="flex flex-row items-center hover:text-secondary">
                <div className="flex justify-center items-center rounded-full p-2 bg-neutral-200">
                  <SquareArrowOutUpRight className="w-4 h-4"/>
                </div>
                <h1 className="font-light ml-3 text-xl">{letter.Title}</h1>
              </div>
              
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Subscribe Section */}
      <div className="flex flex-col align-middle justify-center items-center row-start-3 col-span-6 mt-20 p-2">
        {/* Title */}
        <h1 className="font-alan font-semibold text-4xl">
              Subscribe
        </h1>
        <h3 className="font-alan text-md mt-2 text-center">
          Keep up to date on current ventures
        </h3>

        <div className="mt-3">
          <EmailSignUp />
        </div>
        
      </div>

    </div>
   
  )
}

export default Home