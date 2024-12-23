import { Navbar } from "@/components/navbar";

const LoginRedirect = () => {
  // Redirect to login page if not authenticated
  const isAuthenticatedFromLocalStorage = localStorage.getItem("username");

  if (
    !isAuthenticatedFromLocalStorage &&
    window.location.pathname !== "/login"
  ) {
    window.location.href = "/login";
  }

  if (
    isAuthenticatedFromLocalStorage &&
    window.location.pathname === "/login"
  ) {
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
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <LoginRedirect />
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">
        {children}
      </main>
    </div>
  );
}
