import { useEffect, useState} from "react"


type ProjectProp = {
  ID: number,
  Title: string,
  Description: string ,
  Image: string,
}
function Projects() {
  const [projects, setProjects] = useState<ProjectProp[]>([]);

  useEffect(() => { 
    fetch(`http://${import.meta.env.VITE_ADDRESS}/projects/create`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch letters");
      }
      return res.json();
    })
    .then((data: ProjectProp[]) => {
      setProjects(data);
    })
    .catch((err) => {
      console.error("Error fetching letters:", err);
    })
  }, [projects])
  return (
    <div className="flex flex-col justify-start items-start p-2 mt-5">
      {projects.map((project) => (
        <div className="flex flex-row w-full">
          <img src={project.Image} alt="" />
          <div className="flex flex-col">
            {/* Title */}
            <h1 className="font-alan">
              {project.Title}
            </h1>

            {/* Description */}
            <h3 className="font-alan">
              {project.Description}
            </h3>
          </div>
        </div>
      ))}

    </div>
  )
}

export default Projects