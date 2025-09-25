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

function PostForm() {

    function createPost(formData: FormData) { 
        const url: string = `http://${import.meta.env.VITE_ADDRESS}/posts/create`;
        console.log(url)
        fetch(url, {
            method: 'POST',
            headers: { 
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"Title": formData.get("title"), "Description": formData.get("description")})
        })
        .then((response) => {
            console.log(response.status)
        })
        .catch((err) => {
            console.log(err)
        }) 
    }

  return (
    <form action={createPost} className="flex justify-center mt-20 h-full">
        <Card className="w-1/2 h-1/2 shadow-md">
            <CardHeader>
                <CardTitle>Create a Post</CardTitle>
            </CardHeader>
            
            <CardContent className="flex flex-col">
                <div className="grid w-full items-center gap-3">
                    <Label>Title</Label>
                    <Input type="text" name="title" placeholder="Title" />
                </div>
                <div className="grid w-full gap-3 mt-4">
                    <Label htmlFor="description">Description</Label>
                    <Textarea placeholder="Post Content" name="description" />
                </div>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button type="submit">
                    Submit
                </Button>
            </CardFooter>
        </Card>
    </form>
  )
}

export default PostForm