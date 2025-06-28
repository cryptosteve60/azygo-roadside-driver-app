
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";
import { DriverProvider } from "./contexts/DriverContext";
import Index from "./pages/Index";
import RequestService from "./pages/RequestService";
import RequestConfirmation from "./pages/RequestConfirmation";
import JobDetails from "./pages/JobDetails";
import Services from "./pages/Services";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import DriverHome from "./pages/DriverHome";
import DriverActiveJob from "./pages/DriverActiveJob";
import DriverJobs from "./pages/DriverJobs";
import DriverEarnings from "./pages/DriverEarnings";
import DriverProfile from "./pages/DriverProfile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppProvider>
        <DriverProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Main Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              {/* Customer Routes */}
              <Route path="/services" element={<Services />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/request/:serviceType" element={<RequestService />} />
              <Route path="/request-confirmation" element={<RequestConfirmation />} />
              <Route path="/job/:jobId" element={<JobDetails />} />
              
              {/* Driver Routes */}
              <Route path="/driver/home" element={<DriverHome />} />
              <Route path="/driver/active-job" element={<DriverActiveJob />} />
              <Route path="/driver/jobs" element={<DriverJobs />} />
              <Route path="/driver/earnings" element={<DriverEarnings />} />
              <Route path="/driver/profile" element={<DriverProfile />} />
              
              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </DriverProvider>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
