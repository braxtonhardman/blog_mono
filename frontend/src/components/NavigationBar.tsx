import { NavLink } from "react-router"
import { TypographyH4 } from "./ui/typography/TypographyH4"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { EmailSignUp } from "@/features/emailsubscribe/components/EmailSignUp"
import { MobileNavigationBar } from "./MobileNavigationBar"

function NavigationBar() {
  return (
    <div className="w-full flex flex-col sm:flex-row justify items-center">
      
      {/* Desktop Menu */}
      <div className="hidden sm:flex flex-row items-end justify-end space-x-6">
        <NavigationMenu>
          <NavigationMenuList className="flex items-center justify-center">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <NavLink to="/"><TypographyH4 text="Home" /></NavLink>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <NavLink to="/currentprojects"><TypographyH4 text="Projects" /></NavLink>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <NavLink to="/about"><TypographyH4 text="About" /></NavLink>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <NavLink to="/letters"><TypographyH4 text="Letters" /></NavLink>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <EmailSignUp />
      </div>

      {/* Mobile Menu */}
      <div className="sm:hidden w-full top-0 left-0">
        <MobileNavigationBar />
      </div>
    </div>
  )
}

export default NavigationBar
