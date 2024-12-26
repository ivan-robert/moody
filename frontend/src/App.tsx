import { QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";

import { queryClient } from "./modules/shared/query-client";
import LoginPage from "./pages/Login.page";

import AboutPage from "@/pages/about";
import BlogPage from "@/pages/blog";
import IndexPage from "@/pages/index";
import PricingPage from "@/pages/pricing";
import SendPage from "@/pages/send";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route element={<LoginPage />} path="/login" />
        <Route element={<IndexPage />} path="/" />
        <Route element={<SendPage />} path="/send" />
        <Route element={<PricingPage />} path="/pricing" />
        <Route element={<BlogPage />} path="/blog" />
        <Route element={<AboutPage />} path="/about" />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
