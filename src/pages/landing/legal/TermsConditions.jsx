import { useState } from 'react'
import { ChevronDown, ChevronUp, FileText, Shield, Lock, Globe } from 'lucide-react'

const TermsConditions = () => {
  const [openSections, setOpenSections] = useState({
    acceptance: true,
    userAccounts: false,
    content: false,
    privacy: false,
    limitations: false,
    termination: false,
    changes: false
  })

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
              <FileText className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms & Conditions</h1>
            <p className="text-xl text-primary-100">
              Last Updated: December 13, 2024
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Quick Navigation */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <Globe className="w-6 h-6 mr-2 text-primary-600" />
              Quick Navigation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { id: 'acceptance', label: 'Acceptance of Terms', icon: '✓' },
                { id: 'userAccounts', label: 'User Accounts', icon: '👤' },
                { id: 'content', label: 'Content Guidelines', icon: '📝' },
                { id: 'privacy', label: 'Privacy', icon: '🔒' },
                { id: 'limitations', label: 'Limitations', icon: '⚖️' },
                { id: 'termination', label: 'Termination', icon: '⏹️' },
                { id: 'changes', label: 'Changes to Terms', icon: '🔄' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })
                    toggleSection(item.id)
                  }}
                  className="flex items-center p-4 rounded-lg bg-gray-50 hover:bg-primary-50 hover:text-primary-700 transition-all duration-200 group"
                >
                  <span className="text-2xl mr-3">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Terms Content */}
          <div className="space-y-6">
            {/* Acceptance of Terms */}
            <div id="acceptance" className="bg-white rounded-xl shadow-lg overflow-hidden">
              <button
                onClick={() => toggleSection('acceptance')}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mr-4">
                    <span className="text-2xl">✓</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Acceptance of Terms</h2>
                    <p className="text-gray-600">By accessing and using Persona Management, you agree to these terms</p>
                  </div>
                </div>
                {openSections.acceptance ? (
                  <ChevronUp className="w-6 h-6 text-gray-400" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-400" />
                )}
              </button>
              
              {openSections.acceptance && (
                <div className="px-6 pb-6">
                  <div className="border-t pt-6">
                    <div className="prose prose-lg max-w-none">
                      <p className="text-gray-700 mb-4">
                        Welcome to Persona Management. By accessing our platform, you agree to be bound by these Terms and Conditions, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
                      </p>
                      
                      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
                        <p className="text-blue-800 font-medium">
                          <strong>Important:</strong> If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                        </p>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Key Points:</h3>
                      <ul className="space-y-2 mb-6">
                        <li className="flex items-start">
                          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                            <span className="text-green-600 text-sm">✓</span>
                          </div>
                          <span>You must be at least 18 years old to use our services</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                            <span className="text-green-600 text-sm">✓</span>
                          </div>
                          <span>All activities on this platform must comply with applicable laws</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                            <span className="text-green-600 text-sm">✓</span>
                          </div>
                          <span>You are responsible for maintaining the confidentiality of your account</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User Accounts */}
            <div id="userAccounts" className="bg-white rounded-xl shadow-lg overflow-hidden">
              <button
                onClick={() => toggleSection('userAccounts')}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    <span className="text-2xl">👤</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">User Accounts & Responsibilities</h2>
                    <p className="text-gray-600">Your account, security, and user obligations</p>
                  </div>
                </div>
                {openSections.userAccounts ? (
                  <ChevronUp className="w-6 h-6 text-gray-400" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-400" />
                )}
              </button>
              
              {openSections.userAccounts && (
                <div className="px-6 pb-6">
                  <div className="border-t pt-6">
                    <div className="prose prose-lg max-w-none">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">Account Registration</h3>
                      <p className="text-gray-700 mb-4">
                        To access certain features, you may be required to register for an account. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate.
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-6 my-8">
                        <div className="bg-gray-50 p-5 rounded-lg">
                          <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                            <Shield className="w-5 h-5 mr-2 text-green-600" />
                            Account Security
                          </h4>
                          <p className="text-gray-600 text-sm">
                            You are responsible for safeguarding your password and for all activities that occur under your account.
                          </p>
                        </div>
                        <div className="bg-gray-50 p-5 rounded-lg">
                          <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                            <Lock className="w-5 h-5 mr-2 text-blue-600" />
                            Data Accuracy
                          </h4>
                          <p className="text-gray-600 text-sm">
                            Maintain accurate and up-to-date profile information for effective platform usage.
                          </p>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-3">Prohibited Activities</h3>
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                        <p className="text-red-800 font-medium">You must not:</p>
                        <ul className="mt-2 space-y-1">
                          <li className="flex items-start">
                            <span className="text-red-500 mr-2">•</span>
                            <span>Use another user's account without permission</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-red-500 mr-2">•</span>
                            <span>Interfere with or disrupt the platform's functionality</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-red-500 mr-2">•</span>
                            <span>Attempt to gain unauthorized access to any part of the platform</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-red-500 mr-2">•</span>
                            <span>Use automated systems or scripts to access the platform</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Content Guidelines */}
            <div id="content" className="bg-white rounded-xl shadow-lg overflow-hidden">
              <button
                onClick={() => toggleSection('content')}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                    <span className="text-2xl">📝</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Content Guidelines & Ownership</h2>
                    <p className="text-gray-600">Intellectual property and user-generated content</p>
                  </div>
                </div>
                {openSections.content ? (
                  <ChevronUp className="w-6 h-6 text-gray-400" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-400" />
                )}
              </button>
              
              {openSections.content && (
                <div className="px-6 pb-6">
                  <div className="border-t pt-6">
                    <div className="prose prose-lg max-w-none">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">Intellectual Property</h3>
                      <p className="text-gray-700 mb-6">
                        The platform and its original content, features, and functionality are owned by Persona Management and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
                      </p>
                      
                      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6">
                        <p className="text-yellow-800">
                          <strong>Note:</strong> You retain ownership of any content you submit, post, or display on or through the platform.
                        </p>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-3">License Grant</h3>
                      <p className="text-gray-700 mb-4">
                        By posting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, and distribute such content in connection with the service.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Privacy */}
            <div id="privacy" className="bg-white rounded-xl shadow-lg overflow-hidden">
              <button
                onClick={() => toggleSection('privacy')}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                    <span className="text-2xl">🔒</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Privacy & Data Protection</h2>
                    <p className="text-gray-600">How we handle your personal information</p>
                  </div>
                </div>
                {openSections.privacy ? (
                  <ChevronUp className="w-6 h-6 text-gray-400" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-400" />
                )}
              </button>
              
              {openSections.privacy && (
                <div className="px-6 pb-6">
                  <div className="border-t pt-6">
                    <div className="prose prose-lg max-w-none">
                      <p className="text-gray-700 mb-6">
                        Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your personal information. By using our platform, you agree to the collection and use of information in accordance with our Privacy Policy.
                      </p>
                      
                      <div className="bg-blue-50 rounded-lg p-5 mb-6">
                        <h4 className="font-semibold text-blue-800 mb-3">Data Protection Principles</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-white p-4 rounded-lg">
                            <div className="text-blue-600 font-bold text-lg mb-2">01</div>
                            <p className="text-sm text-gray-700">Transparency in data collection</p>
                          </div>
                          <div className="bg-white p-4 rounded-lg">
                            <div className="text-blue-600 font-bold text-lg mb-2">02</div>
                            <p className="text-sm text-gray-700">Secure data storage & transfer</p>
                          </div>
                          <div className="bg-white p-4 rounded-lg">
                            <div className="text-blue-600 font-bold text-lg mb-2">03</div>
                            <p className="text-sm text-gray-700">Your control over personal data</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Add more sections similarly... */}

          </div>

          {/* Bottom Action */}
          <div className="mt-12 bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Questions About Our Terms?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              If you have any questions about these Terms and Conditions, please contact our legal team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium">
                Contact Support
              </button>
              <button className="px-8 py-3 bg-white text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50 transition-colors font-medium">
                Download PDF Version
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TermsConditions