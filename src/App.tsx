import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import NotFound from "./pages/NotFound";
import ProtectedPage from "./components/ProtectedPage";
import DashboardLayout from "./components/DashboardLayout";

// Shared Pages
import AIDetectPage from "./pages/AIDetectPage";
import ComplaintsPage from "./pages/ComplaintsPage";
import TrainingPage from "./pages/TrainingPage";
import RewardsPage from "./pages/RewardsPage";
import FacilitiesPage from "./pages/FacilitiesPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import CollectionsPage from "./pages/CollectionsPage";

// Dashboards
import CitizenDashboard from "./pages/CitizenDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import WorkerDashboard from "./pages/WorkerDashboard";
import ChampionDashboard from "./pages/ChampionDashboard";

import { getSession } from "./lib/auth";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  return <ProtectedPage>{children}</ProtectedPage>;
}

function UserProp({ children }: { children: (user: any) => React.ReactNode }) {
  const user = getSession();
  if (!user) return null;
  return <>{children(user)}</>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          
          {/* Explicit Explicit Dashboard Routes */}
          <Route path="/citizen-dashboard" element={<ProtectedRoute><UserProp>{(user) => <DashboardLayout user={user}><CitizenDashboard user={user} /></DashboardLayout>}</UserProp></ProtectedRoute>} />
          <Route path="/admin-dashboard" element={<ProtectedRoute><UserProp>{(user) => <DashboardLayout user={user}><AdminDashboard user={user} /></DashboardLayout>}</UserProp></ProtectedRoute>} />
          <Route path="/worker-dashboard" element={<ProtectedRoute><UserProp>{(user) => <DashboardLayout user={user}><WorkerDashboard user={user} /></DashboardLayout>}</UserProp></ProtectedRoute>} />
          <Route path="/champion-dashboard" element={<ProtectedRoute><UserProp>{(user) => <DashboardLayout user={user}><ChampionDashboard user={user} /></DashboardLayout>}</UserProp></ProtectedRoute>} />

          {/* Shared Tools and Pages */}
          <Route path="/ai-detect" element={<ProtectedRoute><AIDetectPage /></ProtectedRoute>} />
          <Route path="/complaints" element={<ProtectedRoute><UserProp>{(user) => <ComplaintsPage user={user} />}</UserProp></ProtectedRoute>} />
          <Route path="/training" element={<ProtectedRoute><TrainingPage /></ProtectedRoute>} />
          <Route path="/rewards" element={<ProtectedRoute><UserProp>{(user) => <RewardsPage user={user} />}</UserProp></ProtectedRoute>} />
          <Route path="/facilities" element={<ProtectedRoute><FacilitiesPage /></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>} />
          <Route path="/collections" element={<ProtectedRoute><CollectionsPage /></ProtectedRoute>} />
          <Route path="/inspections" element={<ProtectedRoute><UserProp>{(user) => <ChampionDashboard user={user} />}</UserProp></ProtectedRoute>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
