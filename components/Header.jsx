import React from 'react'
import Link from 'next/link'
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

const Header = () => {
  return (
    
      <div className="navbar px-4 sm:px-10 lg:px-14 bg-tuna-900 h-16 flex items-center pt-8">
        <ClerkProvider>

        <div className="flex-1">
          <Link href={"/"} className="btn btn-ghost text-xl sm:text-2xl lg:text-3xl font-inter font-bold text-anakiwa-500">AquaWise</Link>
        </div>


        <SignedOut>
          <SignInButton className="btn btn-sm text-sm text-black-haze-100 bg-anakiwa-600 hover:bg-anakiwa-700 border-transparent focus:border-transparent focus:ring-0 hover:border-transparent hover:ring-0" />
        </SignedOut>
        
        <SignedIn>

          
        <ul className="menu menu-horizontal bg-transparent text-black-haze-100 mx-2 sm:mx-5">
          <li><Link href={"/tracker"}>Tracker</Link></li>
          <li><Link href={"/leaderboard"}>Leaderboard</Link></li>
        </ul>


          <div className="flex-none gap-2">
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">

                <div className="w-10 sm:w-12 rounded-full overflow-hidden">
                <UserButton appearance={{ 
                    elements: { 
                      userButtonAvatarBox: { 
                        width: '100%', 
                        height: '100%' 
                      } 
                    } 
                  }} />
                </div>

              </div>
            </div>
          </div>

        </SignedIn>

      </ClerkProvider>
      
      </div>
  )
}

export default Header