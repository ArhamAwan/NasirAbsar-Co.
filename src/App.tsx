import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { AdminAuthProvider } from "./context/AdminAuthContext";
import Layout from "./components/Layout";
import Hero from "./components/Hero";
import About from "./components/About";
import Contact from "./components/Contact";

// Lazy load heavy components
const Services = lazy(() => import("./components/Services"));
const Team = lazy(() => import("./components/Team"));
const Clients = lazy(() => import("./components/Clients"));
const Reviews = lazy(() => import("./components/Reviews"));

// Lazy load admin components
const Login = lazy(() => import("./components/admin/Login"));
const AdminLayout = lazy(() => import("./components/admin/AdminLayout"));
const AuthGate = lazy(() => import("./components/admin/AuthGate"));
const ReviewsAdmin = lazy(() => import("./components/admin/ReviewsAdmin"));

const LoadingFallback = () => (
  <div className="min-h-[400px] flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Suspense fallback={<LoadingFallback />}>
        <Services />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <Team />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <Clients />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <Reviews />
      </Suspense>
      <Contact />
    </>
  );
}

function App() {
  return (
    <AdminAuthProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <HomePage />
              </Layout>
            }
          />
          <Route
            path="/about"
            element={
              <Layout>
                <HomePage />
              </Layout>
            }
          />
          <Route
            path="/services"
            element={
              <Layout>
                <HomePage />
              </Layout>
            }
          />
          <Route
            path="/team"
            element={
              <Layout>
                <HomePage />
              </Layout>
            }
          />
          <Route
            path="/clients"
            element={
              <Layout>
                <HomePage />
              </Layout>
            }
          />
          <Route
            path="/reviews"
            element={
              <Layout>
                <HomePage />
              </Layout>
            }
          />
          <Route
            path="/contact"
            element={
              <Layout>
                <HomePage />
              </Layout>
            }
          />
          {/* Admin Routes */}
          <Route
            path="/admin/login"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <Login />
              </Suspense>
            }
          />
          <Route
            path="/admin/reviews"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <AuthGate>
                  <AdminLayout>
                    <ReviewsAdmin />
                  </AdminLayout>
                </AuthGate>
              </Suspense>
            }
          />
        </Routes>
        <Analytics />
        <SpeedInsights />
      </Router>
    </AdminAuthProvider>
  );
}

export default App;
