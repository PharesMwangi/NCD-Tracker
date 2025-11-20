import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "@/pages/Home";
import Dashboard from "@/pages/Dashboard";
import Insight from "@/pages/Insight";
import { NavigationMenu } from "./components/ui/navigation-menu";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";

import Particles from "./components/Particles"; // <-- Make sure the path is correct

export default function App() {
  const { user } = useUser();

  return (
    <Router>
      {/* OUTER WRAPPER — enables background to cover whole screen */}
      <div className="relative min-h-screen overflow-hidden">

        {/* BACKGROUND PARTICLES */}
        <Particles
          particleColors={["#99ccff", "#cce7ff", "#ffffff"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={80}
          moveParticlesOnHover={true}
          alphaParticles={false}
          className="absolute inset-0 -z-10 w-screen h-screen"
        />

        {/* EVERYTHING ELSE SITS ABOVE THE BACKGROUND */}
        <div className="relative z-10">

          {/* HEADER */}
          <header className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border-b shadow">
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

          {/* MAIN CONTENT */}
          <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">

            <div className="max-w-5xl mx-auto">
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
      </div>
    </Router>
  );
}
