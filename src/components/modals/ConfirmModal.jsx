import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  AlertCircle,
  XCircle,
  HelpCircle,
  ShieldAlert,
  Trash2,
  LogOut,
  Save,
  Send,
  Archive,
  Ban,
  UserX,
  Lock,
  Bell,
  Mail,
  Key,
  Settings
} from 'lucide-react'

const ConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed with this action?",
  itemName,
  itemDetails,
  type = "danger", // danger, warning, info, success, question
  icon: CustomIcon,
  loading = false,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmColor = "primary",
  size = "md", // sm, md, lg
  showCancel = true,
  showCloseButton = true,
  backdropBlur = true,
  onCloseComplete
}) => {
  
  // Icon configuration based on type
  const getIcon = () => {
    if (CustomIcon) return CustomIcon
    
    switch(type) {
      case 'danger':
        return XCircle
      case 'warning':
        return AlertTriangle
      case 'info':
        return Info
      case 'success':
        return CheckCircle
      case 'question':
        return HelpCircle
      case 'security':
        return ShieldAlert
      case 'delete':
        return Trash2
      case 'logout':
        return LogOut
      case 'save':
        return Save
      case 'send':
        return Send
      case 'archive':
        return Archive
      case 'ban':
        return Ban
      case 'user':
        return UserX
      case 'lock':
        return Lock
      case 'notification':
        return Bell
      case 'email':
        return Mail
      case 'key':
        return Key
      case 'settings':
        return Settings
      default:
        return AlertCircle
    }
  }
  
  // Color configuration based on type
  const getIconColor = () => {
    switch(type) {
      case 'danger':
      case 'delete':
        return 'bg-red-100 text-red-600'
      case 'warning':
        return 'bg-yellow-100 text-yellow-600'
      case 'info':
        return 'bg-blue-100 text-blue-600'
      case 'success':
        return 'bg-green-100 text-green-600'
      case 'question':
        return 'bg-purple-100 text-purple-600'
      case 'security':
        return 'bg-orange-100 text-orange-600'
      case 'logout':
        return 'bg-gray-100 text-gray-600'
      case 'save':
        return 'bg-emerald-100 text-emerald-600'
      case 'send':
        return 'bg-cyan-100 text-cyan-600'
      case 'archive':
        return 'bg-indigo-100 text-indigo-600'
      case 'ban':
        return 'bg-rose-100 text-rose-600'
      case 'user':
        return 'bg-pink-100 text-pink-600'
      case 'lock':
        return 'bg-violet-100 text-violet-600'
      default:
        return 'bg-gray-100 text-gray-600'
    }
  }
  
  // Button color configuration
  const getButtonColor = () => {
    switch(confirmColor) {
      case 'danger':
        return 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
      case 'warning':
        return 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500'
      case 'info':
        return 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
      case 'success':
        return 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
      case 'primary':
      default:
        return 'bg-primary-600 hover:bg-primary-700 focus:ring-primary-500'
    }
  }
  
  // Size configuration
  const getSizeClass = () => {
    switch(size) {
      case 'sm':
        return 'max-w-sm'
      case 'lg':
        return 'max-w-lg'
      case 'xl':
        return 'max-w-xl'
      case 'md':
      default:
        return 'max-w-md'
    }
  }
  
  const IconComponent = getIcon()
  const iconColorClass = getIconColor()
  const buttonColorClass = getButtonColor()
  const sizeClass = getSizeClass()

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog 
        as="div" 
        className="relative z-50" 
        onClose={onClose}
        onCloseComplete={onCloseComplete}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className={`fixed inset-0 bg-black bg-opacity-50 ${backdropBlur ? 'backdrop-blur-sm' : ''}`} />
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
              <Dialog.Panel className={`w-full ${sizeClass} transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all`}>
                
                {/* Close button (optional) */}
                {showCloseButton && (
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                    disabled={loading}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
                
                {/* Icon */}
                <div className={`mx-auto flex items-center justify-center w-16 h-16 rounded-full ${iconColorClass} mb-4`}>
                  <IconComponent className="w-8 h-8" />
                </div>
                
                {/* Title */}
                <Dialog.Title
                  as="h3"
                  className="text-xl font-semibold leading-6 text-gray-900 text-center mb-2"
                >
                  {title}
                </Dialog.Title>
                
                {/* Message */}
                <div className="mt-2">
                  <p className="text-gray-600 text-center">
                    {message}
                  </p>
                  
                  {/* Item name/details */}
                  {itemName && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-start">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 mb-1">
                            {type === 'delete' ? 'Item to delete:' : 
                             type === 'archive' ? 'Item to archive:' :
                             type === 'ban' ? 'User to ban:' :
                             'Item:'}
                          </p>
                          <p className="text-sm text-gray-700 font-medium">{itemName}</p>
                          {itemDetails && (
                            <p className="text-xs text-gray-500 mt-1">{itemDetails}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Warning message for destructive actions */}
                  {(type === 'danger' || type === 'delete' || type === 'ban') && (
                    <div className="mt-3 p-3 bg-red-50 border border-red-100 rounded-lg">
                      <div className="flex items-center">
                        <AlertTriangle className="w-4 h-4 text-red-500 mr-2 flex-shrink-0" />
                        <p className="text-xs text-red-600">
                          This action cannot be undone. Please proceed with caution.
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {/* Info for confirmation */}
                  {(type === 'info' || type === 'question') && (
                    <div className="mt-3 p-3 bg-blue-50 border border-blue-100 rounded-lg">
                      <div className="flex items-center">
                        <Info className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
                        <p className="text-xs text-blue-600">
                          You can always change this later in the settings.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className={`mt-6 flex ${showCancel ? 'justify-between' : 'justify-center'} space-x-3`}>
                  {showCancel && (
                    <button
                      type="button"
                      className="inline-flex justify-center items-center px-5 py-2.5 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[100px]"
                      onClick={onClose}
                      disabled={loading}
                    >
                      {cancelText}
                    </button>
                  )}
                  
                  <button
                    type="button"
                    className={`inline-flex justify-center items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg text-white ${buttonColorClass} focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[100px]`}
                    onClick={onConfirm}
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Processing...
                      </span>
                    ) : confirmText}
                  </button>
                </div>
                
                {/* Optional footer note */}
                {(type === 'security' || type === 'lock' || type === 'key') && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-500 text-center">
                      <ShieldAlert className="inline-block w-3 h-3 mr-1" />
                      This action requires additional security verification.
                    </p>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

// Export pre-configured variants for convenience
export const DeleteConfirmation = (props) => (
  <ConfirmModal 
    type="delete" 
    title="Confirm Delete"
    message="Are you sure you want to delete this item? This action cannot be undone."
    confirmText="Delete"
    confirmColor="danger"
    {...props}
  />
)

export const LogoutConfirmation = (props) => (
  <ConfirmModal 
    type="logout"
    title="Confirm Logout"
    message="Are you sure you want to logout? You will need to sign in again to access your account."
    confirmText="Logout"
    confirmColor="primary"
    {...props}
  />
)

export const ArchiveConfirmation = (props) => (
  <ConfirmModal 
    type="archive"
    title="Confirm Archive"
    message="This item will be moved to the archive. You can restore it later if needed."
    confirmText="Archive"
    confirmColor="warning"
    {...props}
  />
)

export const BanConfirmation = (props) => (
  <ConfirmModal 
    type="ban"
    title="Confirm Ban"
    message="This user will be banned from accessing the system. They will receive a notification email."
    confirmText="Ban User"
    confirmColor="danger"
    {...props}
  />
)

export const SaveConfirmation = (props) => (
  <ConfirmModal 
    type="save"
    title="Save Changes"
    message="Are you sure you want to save these changes? This will update the current configuration."
    confirmText="Save"
    confirmColor="success"
    {...props}
  />
)

export const SendConfirmation = (props) => (
  <ConfirmModal 
    type="send"
    title="Send Notification"
    message="This will send notifications to all selected users. Are you ready to proceed?"
    confirmText="Send Now"
    confirmColor="info"
    {...props}
  />
)

export default ConfirmModal



// Usage Example:
//  <ConfirmModal
//   isOpen={isOpen}
//   onClose={() => setIsOpen(false)}
//   onConfirm={handleConfirm}
//   title="Confirm Action"
//   message="Are you sure you want to proceed?"
// />

// // With custom type and item
// <ConfirmModal
//   isOpen={deleteModal.isOpen}
//   onClose={() => setDeleteModal({ isOpen: false })}
//   onConfirm={() => handleDelete(user.id)}
//   title="Delete User"
//   message="This user will be permanently removed from the system."
//   itemName={user.name}
//   itemDetails={`Email: ${user.email} • Role: ${user.role}`}
//   type="delete"
//   confirmText="Delete User"
// />

// // Using pre-configured variants
// import { DeleteConfirmation, LogoutConfirmation, ArchiveConfirmation } from './ConfirmModal'

// <DeleteConfirmation
//   isOpen={isOpen}
//   onClose={onClose}
//   onConfirm={onConfirm}
//   itemName="Project Alpha"
//   loading={loading}
// />

// <LogoutConfirmation
//   isOpen={logoutOpen}
//   onClose={() => setLogoutOpen(false)}
//   onConfirm={handleLogout}
// />

// <ArchiveConfirmation
//   isOpen={archiveOpen}
//   onClose={() => setArchiveOpen(false)}
//   onConfirm={handleArchive}
//   itemName="Quarterly Report"
//   itemDetails="Created: Jan 15, 2024 • Size: 2.4 MB"
// />

// // With custom icon
// <ConfirmModal
//   isOpen={customOpen}
//   onClose={onClose}
//   onConfirm={onConfirm}
//   title="Custom Action"
//   message="Perform this custom action?"
//   icon={Settings} // Pass any Lucide React icon
//   confirmColor="primary"
// />
