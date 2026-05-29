import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import SiteLayout from "./components/layout/SiteLayout";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import PromptAudit from "./pages/PromptAudit";
import ResponseAudit from "./pages/ResponseAudit";
import PromptCommons from "./pages/PromptCommons";
import PromptLab from "./pages/PromptLab";
import LearningPaths from "./pages/LearningPaths";
import Methodology from "./pages/Methodology";
import PromptPatterns from "./pages/PromptPatterns";
import Insights from "./pages/Insights";
import Analytics from "./pages/Analytics";
import About from "./pages/About";
import Changelog from "./pages/Changelog";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/prompt-audit" element={<PromptAudit />} />
            <Route path="/response-audit" element={<ResponseAudit />} />
            <Route path="/commons" element={<PromptCommons />} />
            <Route path="/lab" element={<PromptLab />} />
            <Route path="/learn" element={<LearningPaths />} />
            <Route path="/methodology" element={<Methodology />} />
            <Route path="/patterns" element={<PromptPatterns />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/about" element={<About />} />
            <Route path="/changelog" element={<Changelog />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
