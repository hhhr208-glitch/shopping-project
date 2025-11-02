"use client"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Shield, Zap, UserPlus } from "lucide-react"
import { useState } from "react"

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignIn = async () => {
    setIsLoading(true)
    try {
      const result = await signIn("github", {
        redirect: false,
        callbackUrl: "/"
      })
      
      if (result?.url) {
        router.push(result.url)
      }
    } catch (error) {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="relative flex justify-center items-center min-h-screen p-4">
        {/* Main Card */}
        <Card className="w-full max-w-md border-gray-200 shadow-lg">
          <CardHeader className="text-center space-y-4 pb-6">
            {/* Logo/Icon */}
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-red-600 to-red-800 rounded-2xl flex items-center justify-center shadow-lg">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <UserPlus className="w-5 h-5 text-red-600" />
              </div>
            </div>
            
            <div className="space-y-2">
              <CardTitle className="text-3xl font-bold text-gray-900">
                Create Account
              </CardTitle>
              <CardDescription className="text-base text-gray-600">
                Sign up with GitHub to get started
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* GitHub Button */}
            <Button 
              onClick={handleSignIn}
              disabled={isLoading}
              className="w-full h-12 gap-3 bg-gray-900 hover:bg-gray-800 text-white border-0 transition-all duration-200"
              size="lg"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Github className="w-5 h-5" />
              )}
              <span className="text-base font-semibold">
                {isLoading ? "Creating account..." : "Sign up with GitHub"}
              </span>
            </Button>

            {/* Features List */}
            <div className="space-y-3 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Shield className="w-4 h-4 text-red-600" />
                <span>Secure authentication</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Zap className="w-4 h-4 text-red-600" />
                <span>No password required</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <UserPlus className="w-4 h-4 text-red-600" />
                <span>Instant account creation</span>
              </div>
            </div>

            {/* Footer Text */}
            <div className="text-center pt-2">
              <p className="text-xs text-gray-500 leading-relaxed">
                By signing up, you agree to our Terms of Service 
                and Privacy Policy
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}