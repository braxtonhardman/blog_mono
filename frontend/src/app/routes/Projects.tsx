import { useEffect, useState} from "react"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { SquareArrowOutUpRight } from 'lucide-react';


type Project = { 
  ID: number; 
	Title: string; 
	Description: string; 
	Image: string;
  Repository: string; 
  Site: string; 
  Status: string; 
}

function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => { 
    fetch(`${import.meta.env.VITE_ADDRESS}/projects`)
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
    <div className="flex flex-col sm:grid sm:grid-cols-3 mt-0 w-full gap-10 p-2 sm:p-20">
      {projects.length > 0 ? (
        projects.map((project) => {
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
                        transform transition duration-300 hover:scale-105 hover:shadow-lg hover:text-primary"
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
                <p className="mt-1 text-md text-text-muted font-alan">{project.Description}</p>
              </div>

              {/* Spacer */}
              <div className="mt-4 h-8"></div>

             {/* Footer */}
             <div className="p-2 flex flex-row w-full">
                {project.Status === "Live" ? (
                  <div className="flex flex-row w-full">
                    <a
                    href={project.Site} // replace with your live project URL
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-row sm:w-1/3 p-2 mr-2 hover:bg-neutral-100 bg-background-light border border-solid text-black rounded-md items-center justify-center"
                    >
                      <SquareArrowOutUpRight className="w-5 h-5 mr-2"/>
                      <h1 className="font-lexend">
                        View Live
                      </h1>
                    </a>

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
                  
                ) : (
                  null
                )}

          
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-gray-500">No projects available</p>
      )}
    </div>
  )
}

export default Projects