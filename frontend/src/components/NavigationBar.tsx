import { NavLink, useLocation } from "react-router"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { MobileNavigationBar } from "./MobileNavigationBar"

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
            <NavigationMenuList className="flex items-center space-x-6">
              <NavigationMenuItem>
                <NavLink to="/">
                  <h2
                    className={`font-alan text-xl px-3 py-1 rounded ${
                      isActive("/") ? "link-active" : "link"
                    }`}
                  >
                    Home
                  </h2>
                </NavLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavLink to="/projects">
                  <h2
                    className={`font-alan text-xl px-3 py-1 rounded ${
                      isActive("/projects") ? "link-active" : "link"
                    }`}
                  >
                    Projects
                  </h2>
                </NavLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavLink to="/about">
                  <h2
                    className={`font-alan text-xl px-3 py-1 rounded ${
                      isActive("/about") ? "link-active" : "link"
                    }`}
                  >
                    About
                  </h2>
                </NavLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavLink to="/archives">
                  <h2
                    className={`font-alan text-xl px-3 py-1 rounded ${
                      isActive("/archives") ? "link-active" : "link"
                    }`}
                  >
                    Archive
                  </h2>
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
