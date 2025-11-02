import Chatbot from '@/components/Chatbot'
import Link from 'next/link'

export default function About() {
  const features = [
    "Modern Technology Stack",
    "Responsive Design", 
    "Fast Performance",
    "User Friendly",
    "Secure & Reliable",
    "Regular Updates"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
       <Chatbot />
      <section className="bg-black py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 className="text-5xl font-bold text-white mb-6 transition-all hover:scale-105 animate-fade-in">
            About Me
          </h1>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            I am a passionate developer dedicated to creating amazing web experiences 
            using the latest technologies and best practices.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-4xl font-bold text-gray-900 mb-6 transition-all hover:text-red-600">
                My Mission
              </h2>
              <p className="text-lg text-gray-700 mb-6 transition-all hover:scale-105">
                To build innovative solutions that make people's lives easier and 
                more productive through technology.
              </p>
              <p className="text-lg text-gray-700 transition-all hover:scale-105">
                I believe in clean code, user-centered design, and continuous learning. 
                I'm committed to delivering high-quality products that exceed expectations.
              </p>
            </div>
            <div className="bg-gradient-to-br from-red-500 to-red-600 p-8 rounded-2xl shadow-2xl transition-transform hover:scale-105">
              <h3 className="text-2xl font-bold text-white mb-4">What I Do</h3>
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li 
                    key={index} 
                    className="flex items-center text-white transition-all hover:translate-x-2"
                  >
                    <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Section */}
      <section className="py-16 bg-black">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            About Me
          </h2>
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl shadow-2xl p-8 text-center max-w-2xl mx-auto border border-red-600">
            <div className="w-32 h-32 bg-red-600 rounded-full mx-auto mb-6 flex items-center justify-center">
              <span className="text-4xl text-white font-bold">
                ME
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 transition-all hover:text-red-500">
              rasool hashemi
            </h3>
            <p className="text-red-500 font-semibold mb-4">Full Stack Developer</p>
            <p className="text-gray-300 mb-6 transition-all hover:scale-105">
              Passionate about building amazing user experiences and solving complex problems 
              through code. I love creating beautiful, functional applications that make a difference.
            </p>
            <div className="flex justify-center space-x-4">
              <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm transition-all hover:scale-110">
                typescript
              </span>
              <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm transition-all hover:scale-110">
                React
              </span>
              <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm transition-all hover:scale-110">
                Next.js
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-6 transition-all hover:scale-105">
            Ready to Work Together?
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Let's create something amazing together.
          </p>
          <div className="space-x-4">
            <Link 
              href="t.me//rslid" 
              className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-all transform hover:scale-110 shadow-lg inline-block"
            >
              Contact Me
            </Link>
            <Link 
              href="/" 
              className="border border-red-600 text-red-600 px-8 py-3 rounded-lg hover:bg-red-50 transition-all transform hover:scale-110 inline-block"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}