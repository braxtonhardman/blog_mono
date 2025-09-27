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
	BlockType: string
	Content: string 
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
  
    function updateBlock(id: number, value: string) {
      setBlocks((prev) =>
        prev.map((b) => (b.ID === id ? { ...b, Content: value } : b))
      )
    }
  
    async function createPost(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
  
      const payload = {
        Title: formData.get("title"),
        Description: formData.get("description"),
        Blocks: blocks,
      }
      console.log(JSON.stringify(payload))
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
              <Button
                type="button"
                className="button"
                onClick={() => addBlock("text")}
              >
                <Type />
              </Button>

              <Button
                type="button"
                className="button ml-2"
                onClick={() => addBlock("image")}
              >
                <ImageIcon />
              </Button>
            </div>
          </CardHeader>
  
          <CardContent className="flex flex-col">

            {/* Static Title + Description */}
            <div className="grid w-full items-center gap-3">
              <Label>Title</Label>
              <Input type="text" name="title" placeholder="Title" />
            </div>
  
            <div className="grid w-full gap-3 mt-4">
              <Label htmlFor="description">Initial Text</Label>
              <Textarea placeholder="Post Content" name="description" />
            </div>
  
            {/* Dynamic Blocks */}
            <div className="mt-6 space-y-4">
              {blocks.map((block) => (
                <div key={block.ID} className="grid gap-2">
                  {block.BlockType === "text" && (
                    <>
                      <Label className="font-alan">Text</Label>
                      <Textarea
                        value={block.Content}
                        onChange={(e) =>
                          updateBlock(block.ID, e.target.value)
                        }
                      />
                    </>
                  )}
                  {block.BlockType === "image" && (
                    <>
                      <Label className="font-alan">Image</Label>
                      <Input
                        type="text"
                        placeholder="https://example.com/image.png"
                        value={block.Content}
                        onChange={(e) =>
                          updateBlock(block.ID, e.target.value)
                        }
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
  