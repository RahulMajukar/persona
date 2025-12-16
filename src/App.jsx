import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

// Layouts
import LandingLayout from './layouts/LandingLayout.jsx'
import AdminLayout from './layouts/AdminLayout.jsx'
import ManagerLayout from './layouts/ManagerLayout.jsx'
import UserLayout from './layouts/UserLayout.jsx'

// Landing Pages
import Home from './pages/landing/Home.jsx'
import About from './pages/landing/About.jsx'
import Pricing from './pages/landing/Pricing.jsx'
import Contact from './pages/landing/Contact.jsx'

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard.jsx'
import Users from './pages/admin/Users.jsx'
import Teams from './pages/admin/Teams.jsx'
import Permissions from './pages/admin/Permissions.jsx'
import SalaryMgmt from './pages/admin/SalaryMgmt.jsx'

// Manager Pages
import ManagerDashboard from './pages/manager/ManagerDashboard.jsx'

// User Pages
import UserDashboard from './pages/user/UserDashboard.jsx'

// Auth Pages
import Login from './pages/auth/Login.jsx'
import Register from './pages/auth/Register.jsx'
import ForgotPassword from './pages/auth/ForgotPassword.jsx'
import PrivacyPolicy from './pages/landing/legal/PrivacyPolicy.jsx'
import TermsConditions from './pages/landing/legal/TermsConditions.jsx'
import AdminContactManagement from './pages/admin/AdminContactManagement.jsx'
import NotificationsMgmt from './pages/admin/NotificationsMgmt.jsx'
import SettingsPage from './pages/admin/SettingsPage.jsx'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="terms" element={<TermsConditions />} />
            <Route path="privacy" element={<PrivacyPolicy />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="teams" element={<Teams />} />
            <Route path="permissions" element={<Permissions />} />
            <Route path="salary" element={<SalaryMgmt />} />
            <Route path="contacts" element={<AdminContactManagement />} />
            <Route path="notifications" element={<NotificationsMgmt />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* Manager Routes */}
          <Route path="/manager" element={
            <ProtectedRoute allowedRoles={['manager', 'admin']}>
              <ManagerLayout />
            </ProtectedRoute>
          }>
            <Route index element={<ManagerDashboard />} />
          </Route>

          {/* User Routes */}
          <Route path="/user" element={
            <ProtectedRoute allowedRoles={['user', 'manager', 'admin']}>
              <UserLayout />
            </ProtectedRoute>
          }>
            <Route index element={<UserDashboard />} />
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App