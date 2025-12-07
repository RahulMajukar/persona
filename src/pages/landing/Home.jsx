import { ArrowRight, Shield, Users, BarChart, Lock } from 'lucide-react'
import { Link } from 'react-router-dom'

const Home = () => {
  const features = [
    {
      icon: Shield,
      title: 'Role-Based Access Control',
      description: 'Granular permissions for admin, managers, and users.'
    },
    {
      icon: Users,
      title: 'Team Management',
      description: 'Create teams, assign managers, and manage members efficiently.'
    },
    {
      icon: BarChart,
      title: 'Salary Analytics',
      description: 'Visualize salary data with interactive charts and reports.'
    },
    {
      icon: Lock,
      title: 'Secure & Private',
      description: 'Enterprise-grade security with JWT authentication.'
    }
  ]

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Modern Workforce
              <span className="text-primary-600"> Management</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
              Streamline your organization with powerful tools for team management, 
              salary administration, and role-based access control.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/pricing"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg text-primary-700 bg-primary-100 hover:bg-primary-200"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything you need to manage your team
            </h2>
            <p className="text-lg text-gray-600">
              Comprehensive features for modern organizations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card hover:shadow-lg transition-shadow">
                <div className="p-3 bg-primary-100 rounded-lg w-fit mb-4">
                  <feature.icon className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to transform your organization?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Join thousands of companies using Persona Mgmt to streamline their workforce management.
          </p>
          <Link
            to="/pricing"
            className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg text-gray-900 bg-white hover:bg-gray-100"
          >
            View Pricing Plans
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home