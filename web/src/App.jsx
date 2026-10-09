// Route table. Owner: architect. Builders: need a new route? Ask the architect (or add ONE line in your section, nothing else).
import { Routes, Route, Navigate } from 'react-router-dom';
import { RequireAuth } from './lib/auth.jsx';

// Marketing (B5)
import Landing from './pages/marketing/Landing.jsx';
import Pricing from './pages/marketing/Pricing.jsx';
import Login from './pages/marketing/Login.jsx';
import Signup from './pages/marketing/Signup.jsx';
// Owner/dispatcher app (B3)
import AppLayout from './components/app/AppLayout.jsx';
import Dashboard from './pages/app/Dashboard.jsx';
import Schedule from './pages/app/Schedule.jsx';
import JobsList from './pages/app/jobs/JobsList.jsx';
import JobNew from './pages/app/jobs/JobNew.jsx';
import JobDetail from './pages/app/jobs/JobDetail.jsx';
import CustomersList from './pages/app/customers/CustomersList.jsx';
import CustomerDetail from './pages/app/customers/CustomerDetail.jsx';
import ContractsList from './pages/app/contracts/ContractsList.jsx';
import ContractDetail from './pages/app/contracts/ContractDetail.jsx';
import InvoicesList from './pages/app/invoices/InvoicesList.jsx';
import InvoiceDetail from './pages/app/invoices/InvoiceDetail.jsx';
import BookingRequests from './pages/app/BookingRequests.jsx';
import Services from './pages/app/Services.jsx';
import Team from './pages/app/Team.jsx';
import Messages from './pages/app/Messages.jsx';
import Settings from './pages/app/settings/Settings.jsx';
import Billing from './pages/app/settings/Billing.jsx';
// Technician PWA (B4)
import TechLayout from './pages/tech/TechLayout.jsx';
import TechToday from './pages/tech/TechToday.jsx';
import TechJob from './pages/tech/TechJob.jsx';
import TechProfile from './pages/tech/TechProfile.jsx';
// Customer-facing public pages (B4)
import BookingPage from './pages/public/BookingPage.jsx';
import TrackingPage from './pages/public/TrackingPage.jsx';
import InvoiceView from './pages/public/InvoiceView.jsx';

import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <Routes>
      {/* Marketing — B5 */}
      <Route path="/" element={<Landing />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Public customer pages — B4 */}
      <Route path="/b/:slug" element={<BookingPage />} />
      <Route path="/t/:token" element={<TrackingPage />} />
      <Route path="/i/:token" element={<InvoiceView />} />

      {/* Owner & dispatcher app — B3 */}
      <Route path="/app" element={<RequireAuth roles={['owner', 'dispatcher']}><AppLayout /></RequireAuth>}>
        <Route index element={<Dashboard />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="jobs" element={<JobsList />} />
        <Route path="jobs/new" element={<JobNew />} />
        <Route path="jobs/:id" element={<JobDetail />} />
        <Route path="requests" element={<BookingRequests />} />
        <Route path="customers" element={<CustomersList />} />
        <Route path="customers/:id" element={<CustomerDetail />} />
        <Route path="contracts" element={<ContractsList />} />
        <Route path="contracts/:id" element={<ContractDetail />} />
        <Route path="invoices" element={<InvoicesList />} />
        <Route path="invoices/:id" element={<InvoiceDetail />} />
        <Route path="services" element={<Services />} />
        <Route path="team" element={<Team />} />
        <Route path="messages" element={<Messages />} />
        <Route path="settings" element={<Settings />} />
        <Route path="settings/billing" element={<RequireAuth roles={['owner']}><Billing /></RequireAuth>} />
      </Route>

      {/* Technician PWA — B4 (owners/dispatchers may open it too, for testing) */}
      <Route path="/tech" element={<RequireAuth roles={['technician', 'owner', 'dispatcher']}><TechLayout /></RequireAuth>}>
        <Route index element={<TechToday />} />
        <Route path="jobs/:id" element={<TechJob />} />
        <Route path="me" element={<TechProfile />} />
      </Route>

      <Route path="/home" element={<Navigate to="/app" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
