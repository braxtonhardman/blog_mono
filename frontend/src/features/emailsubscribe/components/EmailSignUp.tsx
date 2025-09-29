import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function EmailSignUp() {
  return (
    <div className="flex justify-center w-full max-w-sm gap-4 items-center">
      <Input type="email" placeholder="Email" className="focus:ring-secondary" />
      <Button type="submit" className="button ">
        Subscribe
      </Button>
    </div>
  )
}
