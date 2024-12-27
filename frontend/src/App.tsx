import { QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";

import { queryClient } from "./modules/shared/query-client";
import LoginPage from "./pages/Login.page";
import NotFound from "./pages/NotFound";

import AboutPage from "@/pages/MyMessage";
import IndexPage from "@/pages/index";
import SendPage from "@/pages/send";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route element={<LoginPage />} path="/login" />
        <Route element={<IndexPage />} path="/" />
        <Route element={<SendPage />} path="/send" />
        <Route element={<AboutPage />} path="/my-message" />
        <Route element={<NotFound />} path="*" />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
