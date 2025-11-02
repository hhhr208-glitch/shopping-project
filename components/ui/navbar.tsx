"use client"
import { Button } from "@/components/ui/button"
import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const { data: session, status } = useSession()
  const loading = status === "loading"
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-black border-b-2 border-red-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="font-bold text-2xl text-white hover:text-red-500 transition-colors duration-300 flex-shrink-0"
          >
            ShopApp
          </Link>
          
          {/* Desktop Navigation Links - Hidden on mobile */}
          <div className="hidden md:flex gap-8">
            <Link 
              href="/" 
              className="text-white hover:text-red-500 transition-colors duration-300 font-medium px-3 py-2"
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className="text-white hover:text-red-500 transition-colors duration-300 font-medium px-3 py-2"
            >
              About
            </Link>
            <Link 
              href="/admin" 
              className="text-white hover:text-red-500 transition-colors duration-300 font-medium px-3 py-2"
            >
              Admin Panel
            </Link>
            <Link 
              href="/userItems" 
              className="text-white hover:text-red-500 transition-colors duration-300 font-medium px-3 py-2"
            >
              Your Cart
            </Link>
          </div>
          
          {/* User Actions - Desktop */}
          <div className="hidden md:flex gap-4 items-center">
            {loading && (
              <span className="text-white animate-pulse">Loading...</span>
            )}
            
            {!loading && !session && (
              <div className="flex gap-3">
                <Button 
                  asChild
                  className="bg-red-600 text-white hover:bg-red-700 border-2 border-red-600 transition-all duration-300 hover:scale-105"
                >
                  <Link href="/auth/login">Login</Link>
                </Button>
                <Button 
                  variant="outline" 
                  asChild
                  className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 hover:scale-105"
                >
                  <Link href="/auth/register">Sign Up</Link>
                </Button>
              </div>
            )}
            
            {!loading && session && (
              <div className="flex gap-4 items-center">
                <span className="text-white font-medium hidden lg:block">
                  Welcome, {session.user?.name || session.user?.email}
                </span>
                <Button 
                  variant="outline" 
                  onClick={() => signOut()}
                  className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 hover:scale-105"
                >
                  Logout
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-red-500 transition-colors duration-300 p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-red-600">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black">
              <Link 
                href="/" 
                className="block text-white hover:text-red-500 transition-colors duration-300 font-medium px-3 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className="block text-white hover:text-red-500 transition-colors duration-300 font-medium px-3 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/admin" 
                className="block text-white hover:text-red-500 transition-colors duration-300 font-medium px-3 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin Panel
              </Link>
              <Link 
                href="/userItems" 
                className="block text-white hover:text-red-500 transition-colors duration-300 font-medium px-3 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Your Cart
              </Link>
              
              {/* Mobile User Actions */}
              <div className="border-t border-red-600 pt-3 mt-3">
                {loading && (
                  <span className="block text-white animate-pulse px-3 py-2">Loading...</span>
                )}
                
                {!loading && !session && (
                  <div className="flex flex-col gap-2 px-3">
                    <Button 
                      asChild
                      className="bg-red-600 text-white hover:bg-red-700 border-2 border-red-600 transition-all duration-300 w-full"
                    >
                      <Link href="/auth/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
                    </Button>
                    <Button 
                      variant="outline" 
                      asChild
                      className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 w-full"
                    >
                      <Link href="/auth/register" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
                    </Button>
                  </div>
                )}
                
                {!loading && session && (
                  <div className="px-3 space-y-2">
                    <span className="block text-white font-medium py-2">
                      Welcome, {session.user?.name || session.user?.email}
                    </span>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        signOut()
                        setIsMenuOpen(false)
                      }}
                      className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 w-full"
                    >
                      Logout
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}