import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/Home";
import DashBoard from "./pages/DashBoard";
import AdminDashboard from "./pages/AdminDashboard"; 
import HotelListPage from "./pages/HotelListPage";
import HotelDetailPage from "./pages/HotelDetailPage";
import BookingPage from "./pages/BookingPage";
import Login from "./pages/LoginPage";
import Signup from "./pages/SignupPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./components/layout/PageTransition";
import ErrorBoundary from "./components/common/ErrorBoundary";

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/hotels" element={<PageTransition><HotelListPage /></PageTransition>} />
        <Route path="/hotels/:id" element={<PageTransition><HotelDetailPage /></PageTransition>} />
        <Route path="/booking/steps" element={<PageTransition><BookingPage /></PageTransition>} />
        <Route path="/dashboard" element={<PageTransition><DashBoard /></PageTransition>} />

        <Route 
          path="/admin" 
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <PageTransition><AdminDashboard /></PageTransition>
            </ProtectedRoute>
          } 
        />  

        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/signup" element={<PageTransition><Signup /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <MainLayout>
          <AnimatedRoutes />
          <Toaster position="top-right" reverseOrder={false} />
        </MainLayout>
      </BrowserRouter>
    </ErrorBoundary>
  );
}