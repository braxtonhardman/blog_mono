import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'

import React from 'react'

function ProjectForm() {

    async function createProject(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
    
        const payload = {
            Title: formData.get("title"),
            Description: formData.get("description") ,
            Image: formData.get("image"), // This should be a url to the bucket 
        }

        const url = `http://${import.meta.env.VITE_ADDRESS}/projects/create`
        try {
          const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          })
          console.log("Status:", res.status)
        } catch (err) {
          console.error(err)
        }
      }

    return (
        <form onSubmit={createProject} className="flex flex-col justify-center items-center mt-5">
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