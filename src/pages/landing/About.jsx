import { Users, Target, Award, Globe, Rocket, Heart } from 'lucide-react'

const AboutUs = () => {
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop',
      description: '15+ years in enterprise software'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w-400&h=400&fit=crop',
      description: 'Former Google Tech Lead'
    },
    {
      name: 'Emma Rodriguez',
      role: 'Product Director',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
      description: 'Product strategy expert'
    },
    {
      name: 'David Kim',
      role: 'Head of Design',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      description: 'Award-winning UX designer'
    }
  ]

  const milestones = [
    { year: '2020', title: 'Company Founded', description: 'Started with a vision to revolutionize team management' },
    { year: '2021', title: 'First Product Launch', description: 'Released MVP to early adopters' },
    { year: '2022', title: 'Series A Funding', description: 'Raised $10M to accelerate growth' },
    { year: '2023', title: 'Enterprise Launch', description: 'Expanded to enterprise clients' },
    { year: '2024', title: 'Global Expansion', description: 'Serving customers in 50+ countries' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 py-24 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Revolutionizing Team Management
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8">
              Empowering organizations to build better teams, foster collaboration, and drive success.
            </p>
            <button className="px-8 py-3 bg-white text-primary-600 rounded-full font-semibold hover:bg-gray-100 transition-all transform hover:scale-105">
              Meet Our Team
            </button>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="bg-white rounded-2xl shadow-xl p-10">
            <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mb-6">
              <Target className="w-8 h-8 text-primary-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-600 text-lg">
              To empower every organization with intuitive tools that transform how teams collaborate, communicate, and achieve their goals together.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-10">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-6">
              <Globe className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Vision</h2>
            <p className="text-gray-600 text-lg">
              A world where every team, regardless of size or industry, has access to powerful yet simple tools that foster innovation and drive collective success.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Core Values</h2>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto mb-12">
            These principles guide everything we do, from product development to customer support.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-8 shadow-lg">
              <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">People First</h3>
              <p className="text-gray-600">
                We believe that technology should serve people, not the other way around.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 shadow-lg">
              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-6">
                <Rocket className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Innovation</h3>
              <p className="text-gray-600">
                Constantly pushing boundaries to deliver cutting-edge solutions.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-8 shadow-lg">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Integrity</h3>
              <p className="text-gray-600">
                Building trust through transparency, honesty, and ethical practices.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">Meet Our Leadership</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl">
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                    <p className="text-primary-600 font-medium mb-2">{member.role}</p>
                    <p className="text-gray-600 text-sm">{member.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">Our Journey</h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary-200"></div>
            {milestones.map((milestone, index) => (
              <div key={index} className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                  <div className="bg-white rounded-xl shadow-lg p-6 inline-block">
                    <div className="text-3xl font-bold text-primary-600 mb-2">{milestone.year}</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-primary-600 border-4 border-white shadow-lg z-10"></div>
                <div className="w-1/2"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-primary-600 to-blue-600 rounded-3xl p-12 text-white text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">50K+</div>
              <div className="text-primary-100">Active Users</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">100+</div>
              <div className="text-primary-100">Countries</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">99.9%</div>
              <div className="text-primary-100">Uptime</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">4.8/5</div>
              <div className="text-primary-100">Customer Rating</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Join Our Mission</h2>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto mb-10">
            We're always looking for passionate people to join our team and help shape the future of work.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-primary-600 text-white rounded-full font-semibold hover:bg-primary-700 transition-colors">
              View Open Positions
            </button>
            <button className="px-8 py-3 bg-white text-primary-600 border-2 border-primary-600 rounded-full font-semibold hover:bg-primary-50 transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs