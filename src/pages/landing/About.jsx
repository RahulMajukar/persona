const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">About Persona Mgmt</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-600 mb-6">
            Persona Mgmt is a comprehensive workforce management platform designed to 
            streamline organizational processes, enhance productivity, and provide 
            valuable insights through data-driven analytics.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-6">
            To empower organizations with tools that simplify complex management tasks, 
            foster collaboration, and drive business growth through intelligent workforce 
            management solutions.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Core Values</h2>
          <ul className="list-disc pl-5 text-gray-600 space-y-2">
            <li><strong>Simplicity:</strong> Making complex tasks simple and intuitive</li>
            <li><strong>Security:</strong> Enterprise-grade security for your sensitive data</li>
            <li><strong>Innovation:</strong> Continuously evolving with cutting-edge features</li>
            <li><strong>Reliability:</strong> Dependable performance you can count on</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default About