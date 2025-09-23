import { NavLink } from "react-router";
import { Separator } from "@/components/ui/separator";
import { TypographyH1} from './ui/typography/TypographyH1';
import { TypographyH3} from './ui/typography/TypographyH3';
import { TypographyH4 } from "./ui/typography/TypographyH4";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu" 
import { EmailSignUp } from "@/features/emailsubscribe/components/EmailSignUp";

function NavigationBar() {
  return (
    <div className="flex flex-row p-2 m-2 justify-between">
      <div className="flex flex-row items-center justify-center">
        <TypographyH1 text="Braxton" />
        <Separator orientation="vertical" decorative={true} className="ml-2 mr-2 bg-foreground p-0.25" />
        <TypographyH3 text="Blog" />
      </div>
      

      <NavigationMenu>
        <NavigationMenuList>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              {/* NavLink makes it easy to show active states */}
              <NavLink
                to="/">
                <TypographyH4 text="Home" />
              </NavLink>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              {/* NavLink makes it easy to show active states */}
              <NavLink to="/currentprojects">
                <TypographyH4 text="Projects" />
              </NavLink>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              {/* NavLink makes it easy to show active states */}
              <NavLink to="/about">
              <TypographyH4 text="About" />
              </NavLink>
            </NavigationMenuLink>
          </NavigationMenuItem>


          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              {/* NavLink makes it easy to show active states */}
              <NavLink to="/letters">
              <TypographyH4 text="Letters" />
              </NavLink>
            </NavigationMenuLink>
          </NavigationMenuItem>


        </NavigationMenuList>
      </NavigationMenu>

      <EmailSignUp />

    </div>
  )
}

export default NavigationBar