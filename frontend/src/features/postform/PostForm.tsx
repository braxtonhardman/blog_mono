import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Type, Image as ImageIcon } from "lucide-react"
import { useState } from "react"

type Block = {
  ID: number
  BlockType: "text" | "image"
  Content: string | File
  AssignmentOrder?: number
  PostID?: number
}

function PostForm() {
  const [blocks, setBlocks] = useState<Block[]>([])

  function addBlock(type: "text" | "image") {
    setBlocks((prev) => [
      ...prev,
      { ID: Date.now(), BlockType: type, Content: "" },
    ])
  }

  function updateBlock(id: number, value: string | File) {
    setBlocks((prev) =>
      prev.map((b) => (b.ID === id ? { ...b, Content: value } : b))
    )
  }

  async function createPost(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    // Prepare blocks
  const processedBlocks = await Promise.all(
    blocks.map(async (b) => {
      if (b.BlockType === "image" && b.Content instanceof File) {
        const file = b.Content

        // Get signed URL from backend
        const res = await fetch(`http://${import.meta.env.VITE_ADDRESS}/posts/signedkey`, {
          method: "POST",
          body: JSON.stringify(file.name),
          headers: { "Content-Type": "application/json" },
        })

        if (!res.ok) throw new Error("Failed to get signed URL")
        const data = await res.json()

        // Upload file to S3
        await fetch(data.URL, {
          method: "PUT",
          body: file,
          headers: { "Content-Type": file.type },
        })

        await fetch(`http://${import.meta.env.VITE_ADDRESS}/posts/public`, { 
          method: "POST",
          body: JSON.stringify(file.name),
        })

        // Return block with public URL
        return { ...b, Content: `${import.meta.env.VITE_PUBLIC_URL}/${file.name}` }
      } else {
        return b
      }
    })
  )

  const payload = {
    Title: formData.get("title"),
    Description: formData.get("description"),
    ReadTime: formData.get("read_time"),
    Blocks: processedBlocks,
  }
    const url = `http://${import.meta.env.VITE_ADDRESS}/posts/create`
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
    <form
      onSubmit={createPost}
      className="flex justify-center mt-20 h-full w-full"
    >
      <Card className="w-3/4 card border-background-dark">
        <CardHeader className="flex flex-row items-center justify-between text-2xl">
          <CardTitle className="font-alan">Create a Post</CardTitle>

          <div className="flex flex-row">
            <Button type="button" className="button" onClick={() => addBlock("text")}>
              <Type />
            </Button>

            <Button type="button" className="button ml-2" onClick={() => addBlock("image")}>
              <ImageIcon />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col">
          {/* Title */}
          <div className="grid w-full items-center gap-3">
            <Label>Title</Label>
            <Input type="text" name="title" placeholder="Title" />
          </div>

          {/* Description */}
          <div className="grid w-full gap-3 mt-4">
            <Label>Description</Label>
            <Textarea placeholder="Description" name="description" />
          </div>

          {/* Read Time */}
          <div className="grid w-full gap-3 mt-4">
            <Label>Read Time</Label>
            <Input type="text" name="read_time" />
          </div>

          {/* Dynamic Blocks */}
          <div className="mt-6 space-y-4">
            {blocks.map((block) => (
              <div key={block.ID} className="grid gap-2">
                {block.BlockType === "text" && (
                  <>
                    <Label className="font-alan">Text</Label>
                    <Textarea
                      value={block.Content as string}
                      onChange={(e) => updateBlock(block.ID, e.target.value)}
                    />
                  </>
                )}
                {block.BlockType === "image" && (
                  <>
                    <Label className="font-alan">Image</Label>
                    <Input
                      name="image"
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) updateBlock(block.ID, file)
                      }}
                    />
                  </>
                )}
              </div>
            ))}
          </div>
        </CardContent>

        <CardFooter className="flex justify-center">
          <Button type="submit" className="w-1/4 button">
            Submit
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}

export default PostForm
