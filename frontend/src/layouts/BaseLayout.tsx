import React from 'react'
import NavigationBar from '../components/NavigationBar'

type LayoutProps = {
    children: React.ReactNode;
  };

function BaseLayout({children}: LayoutProps) {
  return (
    <div className="flex flex-col">
        <NavigationBar />
        
        {children}
    </div>
  
  )
}

export default BaseLayout