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
} from "@/components/ui/card"

import { EmailSignUp } from "@/features/emailsubscribe/components/EmailSignUp"
import { useEffect, useState } from "react"
import { NavLink } from "react-router"
import type { LetterCardProps } from "@/features/letters/types"
import { SquareArrowOutUpRight } from 'lucide-react';

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
    <div className="grid grid-cols-6 gap-1 mt-5">

      {/* About Section */}
      <div className="flex flex-col align-middle justify-center items-center col-span-6 sm:col-span-5 gap-2 col-start-1 p-2">
        <h1 className="lg:text-7xl md:text-5xl text-5xl text-center text-d4a373 font-bold md:font-semibold">
          Braxton Hardman 
        </h1>
        <h3 className="text-lg sm:text-xl mt-3 row-start-2 font-light text-center w-5/6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam non sint vero alias, expedita aperiam id, maiores doloribus accusamus in adipisci quasi dolor? Laboriosam, tempore.
        </h3>
      </div>

      {/* Projects */}
      <div className="flex flex-col justify-center items-center w-full h-full row-start-2 col-span-6 sm:col-span-5 mb-2 mt-2">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full max-w-1/2 max-h-full sm:max-w-5/6 mt-5"
          >
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index} className="sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
                  <div className="min-w-full">
                  <Card className="bg-white p-3 h-48 sm:h-56 md:h-64 lg:h-72">
                    <CardContent className="flex items-center justify-center p-6 h-full">
                      <span className="text-3xl font-semibold">Coming Soon...</span>
                    </CardContent>
                  </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="flex lg:hidden"/>
            <CarouselNext className="flex lg:hidden"/>
        </Carousel>
      </div>

      {/* Letters Side Bar */}
      <ul className="flex-col col-start-6 row-span-2 row-start-1 hidden sm:flex mt-2"> 
        <h1 className="font-semibold text-2xl underline underline-offset-10">
          From the Archive
        </h1>
        {letters.slice(0, 6).map((letter, index) => (
          <li key={index} className="mt-2 p-2">
            <NavLink to={`/letters/${letter.Title}`}>
              <div className="flex flex-row items-center p-2 hover:text-blue-700">
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
        <h1 className="font-semibold text-5xl">
              Subscribe
        </h1>
        <h3 className="font-light text-2xl mt-2 text-center">
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