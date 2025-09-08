import React from 'react'
import Feed from '../components/feed/Feed'
import LeftSidebar from '../components/sidebar/LeftSidebar';
// import { RightSidebar } from '../components/sidebars/RightSidebar'

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero section with subtle pattern */}
      <div className="relative overflow-hidden">
          {/* Background Effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50" />
        <div className="absolute top-0 left-0 rounded-full w-96 h-96 bg-gradient-to-br from-blue-400/30 to-purple-400/30 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 delay-1000 rounded-full w-96 h-96 bg-gradient-to-br from-indigo-400/30 to-pink-400/30 blur-3xl animate-pulse" />
        <div className="absolute w-64 h-64 delay-500 transform -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 blur-2xl animate-pulse" />
      </div>
        
        <div className="container relative z-10 px-4 py-8 mx-auto">
          <div className="flex gap-8">
            {/* Left Sidebar */}
            <aside className="flex-shrink-0 hidden lg:block w-80">
              <div className="sticky top-28">
                <LeftSidebar />
              </div>
            </aside>
            
            {/* Main Content */}
            <main className="flex-1 max-w-2xl mx-auto">
              <div className="space-y-6">
                <Feed />
              </div>
            </main>
            
            {/* Right Sidebar */}
            <aside className="flex-shrink-0 hidden xl:block w-80">
              <div className="sticky top-28">
                {/* <RightSidebar /> */}
              </div>
            </aside>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute w-64 h-64 rounded-full top-20 left-10 bg-gradient-to-br from-blue-100/50 to-purple-100/50 blur-3xl opacity-60 animate-pulse" />
        <div className="absolute w-48 h-48 delay-1000 rounded-full bottom-20 right-10 bg-gradient-to-br from-indigo-100/50 to-pink-100/50 blur-2xl opacity-60 animate-pulse" />
      </div>
    </div>
  )
}

export default HomePage;