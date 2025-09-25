import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function EmailSignUp() {
  return (
    <div className="flex justify-center w-full max-w-sm gap-4 items-center">
      <Input type="email" placeholder="Email" />
      <Button type="submit" variant="outline" className="bg-blue-500 text-white">
        Subscribe
      </Button>
    </div>
  )
}
