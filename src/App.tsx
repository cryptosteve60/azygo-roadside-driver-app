
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DriverProvider } from "./contexts/DriverContext";
import Index from "./pages/Index";
import DriverHome from "./pages/DriverHome";
import DriverActiveJob from "./pages/DriverActiveJob";
import DriverJobs from "./pages/DriverJobs";
import DriverProducts from "./pages/DriverProducts";
import DriverEarnings from "./pages/DriverEarnings";
import DriverProfile from "./pages/DriverProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <DriverProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Driver Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/driver/home" element={<DriverHome />} />
            <Route path="/driver/active-job" element={<DriverActiveJob />} />
            <Route path="/driver/jobs" element={<DriverJobs />} />
            <Route path="/driver/products" element={<DriverProducts />} />
            <Route path="/driver/earnings" element={<DriverEarnings />} />
            <Route path="/driver/profile" element={<DriverProfile />} />
            
            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </DriverProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
