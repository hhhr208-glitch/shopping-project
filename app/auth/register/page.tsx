"use client"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Github, Shield, Zap, UserPlus, Mail } from "lucide-react"
import { useState, FormEvent } from "react"

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [step, setStep] = useState(1) // 1: email input, 2: code verification
  const [verificationCode, setVerificationCode] = useState("")
  const router = useRouter()

  const handleGitHubSignIn = async () => {
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

  const handleEmailSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const response = await fetch("/api/auth/send-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })
      
      const data = await response.json()
      
      if (data.success) {
        setStep(2) // Move to code verification
      } else {
        alert(data.message || "Failed to send verification code")
      }
    } catch (error) {
      alert("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

const handleCodeVerification = async (e: React.FormEvent) => {
  e.preventDefault()
  console.log("🔄 Verification started...")
  setIsLoading(true)
  
  try {
    console.log("📧 Email:", email)
    console.log("🔢 Code entered:", verificationCode)
    console.log("🔢 Code length:", verificationCode.length)

    console.log("🚀 Calling signIn('email')...")
    
    const result = await signIn("email", {
      email: email,
      code: verificationCode,
      redirect: false,
    })

    console.log("✅ signIn completed, result:", result)

    if (result?.error) {
      console.log("❌ signIn error:", result.error)
      alert("Invalid verification code: " + result.error)
    } else {
      console.log("🎉 Success! Redirecting...")
      router.push("/")
    }
  } catch (error) {
    console.error("💥 CATCH BLOCK - Error details:", error)
    alert("Verification failed: " + error)
  } finally {
    console.log("🏁 Verification finished")
    setIsLoading(false)
  }
}
  return (
    <div className="min-h-screen bg-white">
      <div className="relative flex justify-center items-center min-h-screen p-4">
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
                {step === 1 ? "Create Account" : "Verify Email"}
              </CardTitle>
              <CardDescription className="text-base text-gray-600">
                {step === 1 
                  ? "Sign up with email or GitHub to get started" 
                  : `Enter the code sent to ${email}`}
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Step 1: Email Input */}
            {step === 1 && (
              <>
                {/* Email Form */}
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-12"
                    />
                  </div>
                  <Button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 gap-3 bg-red-600 hover:bg-red-700 text-white border-0 transition-all duration-200"
                    size="lg"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Mail className="w-5 h-5" />
                    )}
                    <span className="text-base font-semibold">
                      {isLoading ? "Sending code..." : "Continue with Email"}
                    </span>
                  </Button>
                </form>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">or continue with</span>
                  </div>
                </div>

                {/* GitHub Button */}
                <Button 
                  onClick={handleGitHubSignIn}
                  disabled={isLoading}
                  className="w-full h-12 gap-3 bg-gray-900 hover:bg-gray-800 text-white border-0 transition-all duration-200"
                  size="lg"
                >
                  <Github className="w-5 h-5" />
                  <span className="text-base font-semibold">
                    GitHub
                  </span>
                </Button>
              </>
            )}

            {/* Step 2: Code Verification */}
            {step === 2 && (
              <form onSubmit={handleCodeVerification} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    maxLength={6}
                    required
                    className="h-12 text-center text-lg font-mono tracking-widest"
                  />
                  <p className="text-sm text-gray-500 text-center">
                    We sent a code to {email}
                  </p>
                </div>
                
                <Button 
                  type="submit"
                  disabled={isLoading || verificationCode.length !== 6}
                  className="w-full h-12 bg-red-600 hover:bg-red-700 text-white"
                  size="lg"
                >
                  {isLoading ? "Verifying..." : "Verify Code"}
                </Button>

                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="w-full h-12"
                >
                  Back to Email
                </Button>
              </form>
            )}

            {/* Features List */}
            <div className="space-y-3 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Shield className="w-4 h-4 text-red-600" />
                <span>Secure authentication</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Zap className="w-4 h-4 text-red-600" />
                <span>No password required with GitHub</span>
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