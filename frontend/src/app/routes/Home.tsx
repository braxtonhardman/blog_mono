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

function Home() {
  const [letters, setLetters] = useState<LetterCardProps[]>([]);

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
  }, []);

  return (
    <div className="grid grid-cols-6 gap-1 mt-5">

      {/* About Section */}
      <div className="flex flex-col col-span-6 sm:col-span-5  col-start-1 border border-solid">
        <h1 className="lg:text-7xl md:text-5xl text-4xl text-d4a373 font-bold md:font-semibold ">
          Braxton Hardman 
        </h1>
        <h3 className="text-lg sm:text-xl mt-3 row-start-2 font-light">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam non sint vero alias, expedita aperiam id, maiores doloribus accusamus in adipisci quasi dolor? Laboriosam, tempore.
        </h3>
      </div>

      {/* Projects */}
      <div className="flex flex-col justify-center items-center w-full row-start-2 col-span-6 sm:col-span-5 border border-solid">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full max-w-1/2 mt-15"
          >
            <CarouselContent className="p-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div>
                    <Card className="bg-white">
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <span className="text-3xl font-semibold">Coming Soon...</span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
      </div>

      {/* Letters Side Bar */}
      <ul className="flex-col col-start-6 row-span-2 row-start-1 border border-solid hidden sm:flex">
        {letters.slice(0, 6).map((letter, index) => (
          <li key={index} className="mt-2">
            <NavLink to={`/letters/${letter.Title}`}>
              <Card className="hover:bg-neutral-200 hover:font-semibold">
                <CardContent className="flex flex-row justify-center items-center">
                  <h1 className="font-semibold text-xl">{letter.Title}</h1>
                </CardContent>
              </Card>
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Subscribe Section */}
      <div className="flex flex-col justify-center items-center row-start-3 col-span-6 mt-10">
        {/* Title */}
        <h1 className="font-semibold text-5xl">
              Subscribe
        </h1>
        <h3 className="font-light text-2xl mt-2">
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