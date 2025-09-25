import { NavLink } from "react-router"
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
    <div className="w-full p-2">
      {/* Desktop Menu */}
      <div className="hidden sm:grid grid-cols-3 items-center">
        
        {/* Left spacer */}
        <div></div>

        {/* Center nav links */}
        <div className="flex justify-center">
          <NavigationMenu>
            <NavigationMenuList className="flex items-center space-x-6">
              <NavigationMenuItem>
                <NavigationMenuLink className="hover:bg-blue-500 hover:text-white" asChild>
                  <NavLink to="/"><h2 className="font-semibold text-xl">Home</h2></NavLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className="hover:bg-blue-500 hover:text-white">
                  <NavLink to="/currentprojects"><h2 className="font-semibold text-xl">Projects</h2></NavLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className="hover:bg-blue-500 hover:text-white">
                  <NavLink to="/about"><h2 className="font-semibold text-xl">About</h2></NavLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className="hover:bg-blue-500 hover:text-white">
                  <NavLink to="/archives"><h2 className="font-semibold text-xl">Archive</h2></NavLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right side subscribe */}
        {/* <div className="flex justify-end">
          <EmailSignUp />
        </div> */}
      </div>

      {/* Mobile Menu */}
      <div className="sm:hidden flex justify-end items-end w-full top-0 left-0">
        <MobileNavigationBar />
      </div>
    </div>
  )
}

export default NavigationBar
