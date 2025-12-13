import { useState } from 'react'
import { Shield, Database, Eye, Share2, Lock, CheckCircle, AlertCircle } from 'lucide-react'

const PrivacyPolicy = () => {
  const [activeTab, setActiveTab] = useState('collection')

  const tabs = [
    { id: 'collection', label: 'Data Collection', icon: Database },
    { id: 'usage', label: 'Usage', icon: Eye },
    { id: 'sharing', label: 'Sharing', icon: Share2 },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'rights', label: 'Your Rights', icon: CheckCircle }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
              <Shield className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl text-blue-100">
              Protecting your privacy is our top priority
            </p>
            <p className="text-blue-200 mt-2">
              Last Updated: December 13, 2024
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Summary Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-10">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">
                  <Shield className="w-12 h-12 text-blue-600" />
                </div>
              </div>
              <div className="flex-grow">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Commitment to Your Privacy</h2>
                <p className="text-gray-600 text-lg">
                  We are committed to protecting your personal information and your right to privacy. This policy explains what information we collect, how we use it, and what rights you have in relation to it.
                </p>
                <div className="flex items-center mt-6 text-blue-600">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  <span className="font-medium">This policy applies to all information collected through our platform.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mb-10">
            <div className="flex flex-wrap gap-2 justify-center">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-6 py-3 rounded-full transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-2" />
                    {tab.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Data Collection */}
            {activeTab === 'collection' && (
              <div className="p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Information We Collect</h2>
                
                <div className="grid md:grid-cols-2 gap-8 mb-10">
                  <div className="bg-blue-50 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-blue-800 mb-4 flex items-center">
                      <Database className="w-6 h-6 mr-3" />
                      Personal Information
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                          <span className="text-blue-600 text-sm">•</span>
                        </div>
                        <span>Name and contact information</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                          <span className="text-blue-600 text-sm">•</span>
                        </div>
                        <span>Email address and phone number</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                          <span className="text-blue-600 text-sm">•</span>
                        </div>
                        <span>Professional details and job title</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-green-800 mb-4 flex items-center">
                      <Eye className="w-6 h-6 mr-3" />
                      Usage Information
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                          <span className="text-green-600 text-sm">•</span>
                        </div>
                        <span>Platform interaction data</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                          <span className="text-green-600 text-sm">•</span>
                        </div>
                        <span>Device and browser information</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                          <span className="text-green-600 text-sm">•</span>
                        </div>
                        <span>IP address and location data</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
                  <h4 className="text-lg font-semibold text-yellow-800 mb-2">Transparency Promise</h4>
                  <p className="text-yellow-700">
                    We only collect information that is necessary for providing our services and improving your experience. We never sell your personal information to third parties.
                  </p>
                </div>
              </div>
            )}

            {/* Usage */}
            {activeTab === 'usage' && (
              <div className="p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">How We Use Your Information</h2>
                
                <div className="space-y-8">
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-6 flex-shrink-0">
                      <span className="text-2xl">🚀</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">Service Delivery</h3>
                      <p className="text-gray-600">
                        To provide, maintain, and improve our platform services, authenticate users, and process transactions.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-6 flex-shrink-0">
                      <span className="text-2xl">📈</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">Platform Improvement</h3>
                      <p className="text-gray-600">
                        To analyze usage patterns, develop new features, and enhance user experience.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-6 flex-shrink-0">
                      <span className="text-2xl">🔒</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">Security & Protection</h3>
                      <p className="text-gray-600">
                        To detect, prevent, and address technical issues, fraud, or illegal activities.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Add other tabs similarly... */}
          </div>

          {/* GDPR & CCPA Compliance */}
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <span className="text-2xl">🇪🇺</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">GDPR Compliance</h3>
              </div>
              <p className="text-gray-600 mb-6">
                For users in the European Union, we comply with the General Data Protection Regulation (GDPR).
              </p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Right to access your data</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Right to data portability</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Right to erasure (right to be forgotten)</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center mr-4">
                  <span className="text-2xl">🇺🇸</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">CCPA Compliance</h3>
              </div>
              <p className="text-gray-600 mb-6">
                For California residents, we comply with the California Consumer Privacy Act (CCPA).
              </p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Right to know what data is collected</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Right to delete personal information</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Right to opt-out of data sales</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-10 text-white">
            <div className="text-center max-w-3xl mx-auto">
              <h3 className="text-3xl font-bold mb-4">Questions About Privacy?</h3>
              <p className="text-blue-100 text-lg mb-8">
                Our dedicated privacy team is here to help you understand our practices and your rights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium">
                  Contact Privacy Officer
                </button>
                <button className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors font-medium">
                  Request Data Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy