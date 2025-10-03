import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { useState, useEffect} from 'react'

import React from 'react'

function ProjectForm() {
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    async function getAuthentication() {
      const response = await fetch(`${import.meta.env.VITE_ADDRESS}/user/me`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      if (data.authenticated) {
        setLoggedIn(true);
      }
    }
    getAuthentication();
  }, []);

  async function createProject(e: React.FormEvent<HTMLFormElement>) {
    // ...existing code
  }

  // Don't render form if not logged in
  if (!loggedIn) return null;

  return (
    <form onSubmit={createProject} className="flex flex-col justify-center items-center mt-5">
      {/* Alert */}
      {uploadSuccess && (
        <div
          className={`w-3/4 ${
            uploadSuccess ? "bg-green-100 border border-green-400 text-green-700" : ""
          } px-4 py-3 rounded mb-4`}
        >
          {uploadSuccess ? "Upload Successful" : "Upload Failed"}
        </div>
      )}
      {!uploadSuccess && (
        <div className="w-3/4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Upload successful!
        </div>
      )}
      <div className="w-3/4 card">
        <h1 className="font-alan font-semibold text-xl mb-2">Create Project</h1>
        <Label className="font-alan mt-6">Title</Label>
        <Input name="title" />

        <Label className="font-alan mt-6">Description</Label>
        <Input name="description" />

        <Label className="font-alan mt-6">Image</Label>
        <Input name="image" type="file" />

        <Label className="font-alan mt-6">GitHub Repository</Label>
        <Input name="repo" />

        <Label className="font-alan mt-6">Live Site</Label>
        <Input name="site" />

        <Label className="font-alan mt-6">Status</Label>
        <select
          name="status"
          className="mt-1 block w-full rounded-md border px-3 py-2 text-base font-alan text-gray-900 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
          defaultValue="Coming Soon"
        >
          <option value="" disabled>
            Select status
          </option>
          <option value="Live">Live</option>
          <option value="Development">Development</option>
          <option value="Coming_soon">Coming Soon</option>
        </select>

        <div className="w-full flex items-center justify-center mt-3">
          <Button className="button w-1/3" type="submit">
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
}

export default ProjectForm;
