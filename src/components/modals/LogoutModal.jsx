import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { LogOut, Shield, AlertCircle } from 'lucide-react'

const LogoutModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  userName,
  userEmail,
  loading = false
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                {/* Header */}
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-r from-red-100 to-orange-100 rounded-full flex items-center justify-center">
                      <LogOut className="w-8 h-8 text-red-600" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-8 h-8 bg-white rounded-full border-4 border-white flex items-center justify-center">
                      <Shield className="w-4 h-4 text-gray-600" />
                    </div>
                  </div>
                  
                  <Dialog.Title
                    as="h3"
                    className="mt-4 text-xl font-bold text-gray-900 text-center"
                  >
                    Confirm Logout
                  </Dialog.Title>
                  
                  <p className="mt-2 text-sm text-gray-500 text-center">
                    Are you sure you want to sign out?
                  </p>
                </div>

                {/* User Info Card */}
                <div className="mt-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                      <span className="text-white font-bold">
                        {userName?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{userName || 'User'}</p>
                      <p className="text-sm text-gray-500 truncate">{userEmail}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center text-sm text-gray-600 bg-white/80 rounded-lg p-3">
                    <AlertCircle className="w-4 h-4 text-yellow-500 mr-2 flex-shrink-0" />
                    <span className="text-xs">
                      For security reasons, please confirm your identity before logging out.
                    </span>
                  </div>
                </div>

                {/* Security Info */}
                <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-gray-500">Session</div>
                    <div className="font-medium text-gray-900 mt-1">Active Now</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-gray-500">Device</div>
                    <div className="font-medium text-gray-900 mt-1">This Browser</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={loading}
                    className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 
                             transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed
                             flex items-center justify-center space-x-2"
                  >
                    <span>Cancel</span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={onConfirm}
                    disabled={loading}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white 
                             rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 
                             font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-lg
                             hover:shadow-xl flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Logging out...</span>
                      </>
                    ) : (
                      <>
                        <LogOut className="w-5 h-5" />
                        <span>Yes, Logout</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Footer Note */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500 text-center">
                    You will be redirected to the login page. 
                    Make sure to save any unsaved work before proceeding.
                  </p>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default LogoutModal