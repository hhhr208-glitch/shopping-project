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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">About Me</h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            I am a passionate developer dedicated to creating amazing web experiences 
            using the latest technologies and best practices.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">My Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                To build innovative solutions that make people's lives easier and 
                more productive through technology.
              </p>
              <p className="text-lg text-gray-600">
                I believe in clean code, user-centered design, and continuous learning. 
                I'm committed to delivering high-quality products that exceed expectations.
              </p>
            </div>
            <div className=" p-8 rounded-2xl bg-gradient-to-r from-blue-50 to-blue-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">What I Do</h3>
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">About Me</h2>
          <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-2xl mx-auto">
            <div className="w-32 h-32 bg-indigo-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <span className="text-4xl text-indigo-600 font-bold">
                
                ME
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">rasool hashemi</h3>
            <p className="text-indigo-600 font-semibold mb-4">Full Stack Developer</p>
            <p className="text-gray-600 mb-6">
              Passionate about building amazing user experiences and solving complex problems 
              through code. I love creating beautiful, functional applications that make a difference.
            </p>
            <div className="flex justify-center space-x-4">
              <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                typescript
              </span>
              <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                React
              </span>
              <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                Next.js
              </span>
            </div>
          </div>
        </div>
      </section>

     
      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Ready to Work Together?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Let's create something amazing together.
          </p>
          <div className="space-x-4">
            <Link 
              href="t.me//rslid" 
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition inline-block"
            >
              Contact Me
            </Link>
            <Link 
              href="/" 
              className="border border-indigo-600 text-indigo-600 px-8 py-3 rounded-lg hover:bg-indigo-50 transition inline-block"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}