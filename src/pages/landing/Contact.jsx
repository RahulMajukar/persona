import { useState } from 'react'
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import axios from 'axios'

const Contact = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm()
  const [submitStatus, setSubmitStatus] = useState(null)
  const [referenceId, setReferenceId] = useState('')

  const onSubmit = async (data) => {
    setSubmitStatus(null)
    setReferenceId('')
    
    try {
      const response = await axios.post('http://localhost:8080/api/contact/submit', data)
      
      setSubmitStatus({
        type: 'success',
        message: response.data.message,
        referenceId: response.data.referenceId
      })
      
      // Reset form
      reset()
      
      // Auto-clear success message after 10 seconds
      setTimeout(() => {
        setSubmitStatus(null)
      }, 10000)
      
    } catch (error) {
      console.error('Error submitting contact form:', error)
      
      let errorMessage = 'Failed to send message. Please try again.'
      
      if (error.response) {
        if (error.response.status === 400) {
          errorMessage = error.response.data?.message || 'Invalid form data. Please check your inputs.'
        } else if (error.response.status === 429) {
          errorMessage = 'Too many submissions. Please wait a while before trying again.'
        } else if (error.response.status === 500) {
          errorMessage = 'Server error. Please try again later.'
        }
      } else if (error.request) {
        errorMessage = 'Network error. Please check your connection.'
      }
      
      setSubmitStatus({
        type: 'error',
        message: errorMessage
      })
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      details: 'support@personamgmt.com',
      subtitle: 'We\'ll reply within 24 hours'
    },
    {
      icon: Phone,
      title: 'Phone',
      details: '+1 (555) 123-4567',
      subtitle: 'Mon-Fri from 9am to 6pm'
    },
    {
      icon: MapPin,
      title: 'Office',
      details: '123 Business Ave, Suite 100',
      subtitle: 'San Francisco, CA 94107'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        {/* Success/Error Messages */}
        {submitStatus && (
          <div className={`mb-8 p-6 rounded-xl shadow-lg ${
            submitStatus.type === 'success' 
              ? 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200' 
              : 'bg-gradient-to-r from-red-50 to-rose-50 border border-red-200'
          }`}>
            <div className="flex items-start">
              <div className={`flex-shrink-0 p-3 rounded-full ${
                submitStatus.type === 'success' ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {submitStatus.type === 'success' ? (
                  <CheckCircle className="h-6 w-6 text-green-600" />
                ) : (
                  <AlertCircle className="h-6 w-6 text-red-600" />
                )}
              </div>
              <div className="ml-4">
                <h3 className={`text-lg font-semibold ${
                  submitStatus.type === 'success' ? 'text-green-800' : 'text-red-800'
                }`}>
                  {submitStatus.type === 'success' ? 'Message Sent Successfully!' : 'Failed to Send Message'}
                </h3>
                <p className={`mt-1 ${
                  submitStatus.type === 'success' ? 'text-green-700' : 'text-red-700'
                }`}>
                  {submitStatus.message}
                </p>
                {submitStatus.referenceId && (
                  <div className="mt-3 p-3 bg-white/50 rounded-lg">
                    <p className="text-sm text-gray-600">Reference ID:</p>
                    <p className="font-mono font-bold text-gray-800">{submitStatus.referenceId}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Save this ID for tracking your inquiry
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <div className="space-y-8">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start space-x-4 group">
                  <div className="p-3 bg-primary-100 rounded-lg group-hover:bg-primary-200 transition-colors">
                    <info.icon className="h-6 w-6 text-primary-600 group-hover:text-primary-700" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{info.title}</h3>
                    <p className="text-gray-700 font-medium">{info.details}</p>
                    <p className="text-sm text-gray-500 mt-1">{info.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* FAQ Section */}
            <div className="mt-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {[
                  { 
                    question: 'How do I get started with Persona Mgmt?',
                    answer: 'Sign up for a free trial, and our onboarding team will guide you through the setup process.'
                  },
                  {
                    question: 'Can I upgrade or downgrade my plan anytime?',
                    answer: 'Yes, you can change your plan at any time. Changes take effect immediately.'
                  },
                  {
                    question: 'Is there a free trial available?',
                    answer: 'We offer a 14-day free trial with access to all features.'
                  },
                  {
                    question: 'What security measures do you have in place?',
                    answer: 'We use bank-level security including encryption, 2FA, and regular security audits.'
                  }
                ].map((faq, idx) => (
                  <div key={idx} className="border-b border-blue-100 pb-4 last:border-0">
                    <p className="font-medium text-gray-800 mb-2">{faq.question}</p>
                    <p className="text-sm text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Response Time */}
            <div className="mt-8 bg-gradient-to-r from-primary-50 to-white border border-primary-100 rounded-xl p-5">
              <h4 className="font-semibold text-primary-800 mb-2">Our Response Promise</h4>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mr-4">
                  <span className="text-primary-600 font-bold">24h</span>
                </div>
                <div>
                  <p className="text-sm text-gray-700">
                    We guarantee a response within <strong>24 hours</strong> during business days.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center mr-4">
                <Send className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Send us a message</h2>
                <p className="text-gray-600">Fill out the form below and we'll get back to you</p>
              </div>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  disabled={isSubmitting}
                  {...register('name', { 
                    required: 'Name is required',
                    minLength: {
                      value: 2,
                      message: 'Name must be at least 2 characters'
                    },
                    maxLength: {
                      value: 100,
                      message: 'Name must be less than 100 characters'
                    }
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed transition-all"
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  disabled={isSubmitting}
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed transition-all"
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  disabled={isSubmitting}
                  {...register('subject', { 
                    required: 'Subject is required',
                    minLength: {
                      value: 2,
                      message: 'Subject must be at least 2 characters'
                    }
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed transition-all"
                  placeholder="How can we help?"
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.subject.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  rows="4"
                  disabled={isSubmitting}
                  {...register('message', { 
                    required: 'Message is required',
                    minLength: {
                      value: 10,
                      message: 'Message must be at least 10 characters'
                    },
                    maxLength: {
                      value: 2000,
                      message: 'Message must be less than 2000 characters'
                    }
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed transition-all"
                  placeholder="Tell us about your inquiry..."
                />
                <div className="flex justify-between items-center mt-1">
                  {errors.message ? (
                    <p className="text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.message.message}
                    </p>
                  ) : (
                    <p className="text-xs text-gray-500">
                      Minimum 10 characters required
                    </p>
                  )}
                  <p className="text-xs text-gray-500">
                    Maximum 2000 characters
                  </p>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-medium"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending Message...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    Send Message
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500 text-center">
                By submitting this form, you agree to our{' '}
                <a href="/privacy" className="text-primary-600 hover:text-primary-700">Privacy Policy</a>.
                We'll never share your information with third parties.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact