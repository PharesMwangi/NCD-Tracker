import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "@/pages/Home";
import Dashboard from "@/pages/Dashboard";
import Insight from "@/pages/Insight";
import { NavigationMenu } from "./components/ui/navigation-menu";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";

export default function App() {
  const { user } = useUser();

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 border-b shadow">
          <div className="mx-auto max-w-5xl p-4 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">NCD Disease Tracker</h1>
              <nav className="flex gap-4 mt-2">
                <Link className="hover:underline" to="/">Home</Link>
                <Link className="hover:underline" to="/dashboard">Dashboard</Link>
                <Link className="hover:underline" to="/insight">Insight</Link>
              </nav>
            </div>

            <div className="flex items-center gap-3">
              <SignedOut>
                <SignInButton mode="modal" />
              </SignedOut>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-5-5xl mx-auto">
            <SignedOut>
              <NavigationMenu />
                <Routes>
                  <Route path="/" element={<Home />} />
                  
                </Routes>
            </SignedOut>

            <SignedIn>
              <NavigationMenu />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/dashboard"
                    element={<Dashboard frontendUserId={user?.id} />}
                  />
                  <Route path="/insight" element={<Insight />} />
                </Routes>
            </SignedIn>
          </div>
          
        </main>
      </div>
    </Router>
  );
}
