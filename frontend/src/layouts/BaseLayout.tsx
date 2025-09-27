import React from 'react'
import NavigationBar from '../components/NavigationBar'

type LayoutProps = {
    children: React.ReactNode;
  };

function BaseLayout({children}: LayoutProps) {
  return (
    <div className="w-full min-h-full bg-background-light">
        <NavigationBar />
        
        {children}
    </div>
  
  )
}

export default BaseLayout