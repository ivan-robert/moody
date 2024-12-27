import { Spinner } from "@nextui-org/react";
import { Suspense } from "react";

import { Navbar } from "@/components/navbar";
import { API_URL } from "@/modules/shared/constants";

const disconnect = () => {
  localStorage.removeItem("username");
  localStorage.removeItem("password");
};

const attemptAuthentication = async (username: string, password: string) => {
  const response = await fetch(`${API_URL}/auth/users/login/`, {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: { "Content-type": "application/json" },
  });

  if (response.status !== 200) {
    window.location.href = "/login";
    disconnect();
  }
};

const LoginRedirect = () => {
  // Redirect to login page if not authenticated
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("password");

  if (!username && window.location.pathname !== "/login") {
    window.location.href = "/login";
  }

  attemptAuthentication(username!, token!);

  if (username && window.location.pathname === "/login") {
    window.location.href = "/";
  }

  return null;
};

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex flex-1 items-center justify-center">
          <Spinner />
        </div>
      }
    >
      <div className="relative flex flex-col h-screen">
        <Navbar />
        <LoginRedirect />
        <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">
          {children}
        </main>
      </div>
    </Suspense>
  );
}
