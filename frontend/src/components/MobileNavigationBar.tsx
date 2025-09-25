import { useState, useRef, useEffect} from "react"
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuLink } from "@/components/ui/navigation-menu"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

export function MobileNavigationBar() {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false) // close menu
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [menuRef])

  return (
    <div ref={menuRef} className="sm:hidden relative ">
      <Button onClick={() => setOpen(!open)} className="bg-blue-500 rounded-sm">
        <Menu className="w-1/2 h-1/2 font-semibold" />
      </Button>

      {open && (
        <div className="absolute right-0 top-0 bg-blue-500 rounded-md z-50">
          <NavigationMenu>
            <NavigationMenuList className="flex flex-col p-2 ">
              <NavigationMenuItem>
                <NavigationMenuLink asChild >
                  <a href="/" className="text-white">Home</a>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <a href="/projects" className="text-white">Projects</a>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <a href="/about" className="text-white ">About</a>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <a href="/archives" className="text-white">Archive</a>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      )}
    </div>
  )
}
