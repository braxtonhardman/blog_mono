import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { useState } from 'react'

import React from 'react'

function ProjectForm() {
    const [uploadSuccess, setuploadSuccess] = useState<boolean>(false);
    async function createProject(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const file = formData.get("image") as File | null
        if (!file) { 
          setuploadSuccess(false);
          return 
        }

        // Get Presigned URL For S3 Bucket 

        fetch(`http://${import.meta.env.VITE_ADDRESS}/projects/signedkey`, { 
          method: "POST",
          body: JSON.stringify(file.name)
        })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch letters");
          }
          return res.json();
        })
        .then((data) => {
          fetch(data.URL, {
            method: "PUT",
            body: file,
            headers: { "Content-Type": file.type },
          })
          .then((response) => { 
            if(!response.ok) { 
              setuploadSuccess(false);
            }
            const imageUrl: string = `${import.meta.env.VITE_PUBLIC_URL}/${file.name}`
            console.log(imageUrl)
            const payload = {
              Title: formData.get("title"),
              Description: formData.get("description") ,
              Image: imageUrl,
            }

            console.log(JSON.stringify(payload))

            const url = `http://${import.meta.env.VITE_ADDRESS}/projects/create`
            fetch(url, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            })
            .then((res) => { 
              if(!res.ok) { 
                console.log("Error")
              }
              setuploadSuccess(true);
            })
            .catch((err) => { 
              console.log(err)
            })

            
            fetch(`http://${import.meta.env.VITE_ADDRESS}/projects/public`, { 
              method: "POST",
              body: JSON.stringify(file.name),
            })
            
          })
          .catch((error) => { 
            console.log(error);
            setuploadSuccess(false); 
          })
        })
        .catch((err) => { 
          console.log(err)
        })



      }

    return (
        <form onSubmit={createProject} className="flex flex-col justify-center items-center mt-5">
          {/* Alert */}
          {uploadSuccess && (
            <div className={`w-3/4 ${uploadSuccess ? "bg-green-100 border border-green-400 text-green-700" : 
            ""} px-4 py-3 rounded mb-4`}>
              {uploadSuccess ? "Upload Sucessful" : "Upload Failed"}
            </div>
          )}
          {!uploadSuccess && (
            <div className="w-3/4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              Upload successful!
            </div>
          )}
            <div className="w-3/4 card">
                <h1 className="font-alan font-semibold text-xl mb-2">
                    Create Project
                </h1>
                <Label className="font-alan mt-6">Title</Label>
                <Input name="title" />

                <Label className="font-alan mt-6">Description</Label>
                <Input name="description" />

                <Label className="font-alan mt-6">Image</Label>
                <Input name="image" type="file" />

                <div className="w-full flex items-center justify-center mt-3">
                    <Button className="button w-1/3" type="submit">Submit</Button>

                </div>
            </div>
           


        </form>
    )
}

export default ProjectForm