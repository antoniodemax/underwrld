import { Route, Routes } from 'react-router-dom'
import { AdminLayout } from './components/admin/AdminLayout'
import { AdminAnalytics } from './pages/admin/AdminAnalytics'
import { AdminClients } from './pages/admin/AdminClients'
import { AdminDashboard } from './pages/admin/AdminDashboard'
import { AdminDocuments } from './pages/admin/AdminDocuments'
import { AdminInsights } from './pages/admin/AdminInsights'
import { AdminLogin } from './pages/admin/AdminLogin'
import { AdminNotifications } from './pages/admin/AdminNotifications'
import { AdminReports } from './pages/admin/AdminReports'
import { AdminSessions } from './pages/admin/AdminSessions'
import { AdminSettings } from './pages/admin/AdminSettings'
import { MarketingSite } from './pages/MarketingSite'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MarketingSite />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/*" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="analytics" element={<AdminAnalytics />} />
        <Route path="clients" element={<AdminClients />} />
        <Route path="sessions" element={<AdminSessions />} />
        <Route path="reports" element={<AdminReports />} />
        <Route path="insights" element={<AdminInsights />} />
        <Route path="documents" element={<AdminDocuments />} />
        <Route path="notifications" element={<AdminNotifications />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
    </Routes>
  )
}

export default App
