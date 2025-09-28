import { NavLink, useLocation } from "react-router"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { MobileNavigationBar } from "./MobileNavigationBar"
import { User } from 'lucide-react';
import { Folder } from 'lucide-react';
import { Briefcase } from 'lucide-react';
import { House } from 'lucide-react';




function NavigationBar() {
  const location = useLocation()

  // Check active route
  const isActive = (path: string) => location.pathname === path

  return (
    <div className="w-full p-2">
      {/* Desktop Menu */}
      <div className="hidden sm:grid grid-cols-3 items-center">
        <div className="ml-2">
          <h1 className="text-text text-2xl font-alan font-normal">
            Braxton
          </h1>
        </div>
        <div className="flex justify-center">
          <NavigationMenu>
            <NavigationMenuList className="flex items-center justify-center p-2 space-x-6">
              <NavigationMenuItem>
                <NavLink
                  to="/"
                  className={`flex flex-row items-center justify-center rounded-md p-1 ${
                    isActive("/") ? "link-active" : "link"
                  }`}
                >
                  <House className="w-5 h-5" />
                  <h2 className="font-alan text-lg ml-2">Home</h2>
                </NavLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavLink
                  to="/projects"
                  className={`flex flex-row items-center justify-center rounded-md p-1 ${
                    isActive("/projects") ? "link-active" : "link"
                  }`}
                >
                  <Briefcase className="w-5 h-5" />
                  <h2 className="font-alan text-lg ml-2">Projects</h2>
                </NavLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavLink
                  to="/about"
                  className={`flex flex-row items-center justify-center rounded-md p-1 ${
                    isActive("/about") ? "link-active" : "link"
                  }`}
                >
                  <User className="w-5 h-5" />
                  <h2 className="font-alan text-lg ml-2">About</h2>
                </NavLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavLink
                  to="/archives"
                  className={`flex flex-row items-center justify-center rounded-md p-1 ${
                    isActive("/archives") ? "link-active" : "link"
                  }`}
                >
                  <Folder className="w-5 h-5" />
                  <h2 className="font-alan text-lg ml-2">Archive</h2>
                </NavLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="sm:hidden flex justify-end items-end w-full top-0 left-0">
        <MobileNavigationBar />
      </div>
    </div>
  )
}

export default NavigationBar
