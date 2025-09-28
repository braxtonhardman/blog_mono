import { EmailSignUp } from "@/features/emailsubscribe/components/EmailSignUp"
import { useEffect, useState } from "react"
// import { NavLink } from "react-router"
import { Linkedin } from 'lucide-react';
import { Github } from 'lucide-react';
import { SquareArrowOutUpRight } from 'lucide-react';
import { ArrowDown } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

type Project = { 
  ID: number; 
	Title: string; 
	Description: string; 
	Image: string;
  Repository: string; 
  Site: string; 
  Status: string; 
}

function Home() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => { 
    fetch(`http://${import.meta.env.VITE_ADDRESS}/projects`)
    .then((res) => { 
      if(!res.ok) { 
        console.log("Error retrieving projects")
      }
      return res.json();
    })
    .then((data: Project[]) => { 
      setProjects(data);
    })
    .catch((err) => { 
      console.log(err)
    })
  }, []);

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <div className="flex flex-col items-center justify-start w-full h-screen">
        <h1 className="font-lexend font-bold text-4xl sm:text-6xl mt-50">
          Building the Future
        </h1>

        <h3 className="font-alan text-center mt-3 text-lg sm:text-lg">
          Developing invative products to better the world.
        </h3>
        
        <div className="flex flex-row items-center justify-between mt-3">
          <a href="https://github.com/braxtonhardman" target="_blank" className="hover:text-blue-500">
            <Github className="h-5 w-5"/>
          </a>

          <a href="https://www.linkedin.com/in/braxton-hardman-620367293/" target="_blank" className="hover:text-blue-500">
            <Linkedin className="h-5 w-5 ml-3" />
          </a>
        </div>

        <div className="bg-background-dark rounded-full p-2 mt-8 animate-bounce">
          <ArrowDown className=""/>
        </div>
      </div>


      <div className="flex flex-col items-center justify-center mt-40">
        <h1 className="flex-lexend font-bold text-2xl sm:text-5xl">
          Featured Projects & Ventures
        </h1>
        <div className="flex flex-col sm:grid sm:grid-cols-2 mt-0 w-full gap-10 p-4 sm:p-20">
          {projects.length > 0 ? (
            projects.slice(0, 4).map((project) => {
              // Determine badge classes based on status
              let badgeClasses = "";
              switch (project.Status) {
                case "Live":
                  badgeClasses = "bg-green-100 text-green-800";
                  break;
                case "Development":
                  badgeClasses = "bg-yellow-100 text-yellow-800";
                  break;
                case "Coming_soon":
                  badgeClasses = "bg-blue-100 text-blue-800";
                  break;
                default:
                  badgeClasses = "bg-gray-100 text-gray-800";
              }

              return (
                <div
                  key={project.ID}
                  className="card relative bg-background-light rounded-xl shadow-md overflow-hidden
                            transform transition duration-300 hover:scale-105 hover:shadow-lg hover:text-secondary"
                >
                  {/* Badge in top-right */}
                  <div className="absolute top-3 right-3">
                    <Badge className={`${badgeClasses} px-2 py-1 rounded-full text-sm font-semibold`}>
                      {project.Status.replace("_", " ")}
                    </Badge>
                  </div>

                  {/* Image */}
                  <img
                    src={project.Image}
                    alt={project.Title}
                    className="w-full h-48 object-cover"
                  />

                  {/* Content */}
                  <div className="p-5">
                    <h2 className="font-lexend font-bold text-xl">{project.Title}</h2>
                    <p className="text-sm mt-2">{project.Description}</p>
                  </div>

                  {/* Footer */}
                  <div className="p-2 flex flex-row w-full">
                    {project.Status === "Live" ? (
                      <a
                        href={project.Site} // replace with your live project URL
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-row sm:w-1/5 p-2 mr-2 hover:bg-neutral-100 bg-background-light border border-solid text-black rounded-md items-center justify-center"
                      >
                        <SquareArrowOutUpRight className="w-5 h-5 mr-2"/>
                        <h1 className="font-lexend">
                          View Live
                        </h1>
                      </a>
                    ) : (
                      <div></div>
                    )}

                    <a
                      href={project.Repository} // replace with your GitHub repo URL
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-row p-2 text-white button rounded-md items-center justify-center "
                    >
                      <Github className="w-5 h-5 mr-2"/>
                      <h1 className="font-lexend">
                        Code
                      </h1>
                    </a>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-gray-500">No projects available</p>
          )}
        </div>
      </div>
      

            

      {/* Subscribe Section */}
      <div className="flex flex-col align-middle justify-center items-center row-start-3 col-span-6 mt-10 p-2">
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