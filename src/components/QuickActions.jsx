const QuickActions = ({ actions }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
      {actions.map((action, index) => (
        <button
          key={index}
          onClick={action.action}
          className="flex flex-col items-center justify-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors"
        >
          <div className={`p-2 rounded-lg mb-2 bg-${action.color}-100`}>
            <action.icon className={`h-5 w-5 text-${action.color}-600`} />
          </div>
          <span className="text-sm font-medium text-gray-700">{action.label}</span>
        </button>
      ))}
    </div>
  )
}

export default QuickActions