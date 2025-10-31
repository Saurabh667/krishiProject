
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/dashboard/Dashboard";
import Profile from "./pages/profile/Profile";
import Weather from "./pages/weather/Weather";
import Advisory from "./pages/advisory/Advisory";
import Activity from "./pages/Activity/Activity";
import Calendar from "./pages/calendar/Calendar";
import Prices from "./pages/prices/Prices";
import Chat from "./pages/chat/Chat";
import Benefits from "./pages/benefits/Benefits";
import Signup from "./signup";
import Login from "./login";
import Voice from "./pages/chat/voice";
import UpdateForm from "./pages/updateform/UpdateForm";

import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import PageNotFound from "./pnf";

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route
          path="/login"
          element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          }
        />
        <Route
          path="/register"
          element={
            <AuthLayout>
              <Signup />
            </AuthLayout>
          }
        />

        {/* Main Routes */}
        <Route
          path="/"
          element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          }
        />
        <Route
          path="/profile"
          element={
            <MainLayout>
              <Profile />
            </MainLayout>
          }
        />
        <Route
          path="/weather"
          element={
            <MainLayout>
              <Weather />
            </MainLayout>
          }
        />
        <Route
          path="/advisory"
          element={
            <MainLayout>
              <Advisory />
            </MainLayout>
          }
        />
        <Route
          path="/activity"
          element={
            <MainLayout>
              <Activity />
            </MainLayout>
          }
        />
        <Route
          path="/calendar"
          element={
            <MainLayout>
              <Calendar />
            </MainLayout>
          }
        />
        <Route
          path="/prices"
          element={
            <MainLayout>
              <Prices />
            </MainLayout>
          }
        />
        <Route
          path="/chat"
          element={
            <MainLayout>
              <Chat />
            </MainLayout>
          }
        />
        <Route
          path="/voice"
          element={
            <MainLayout>
              <Voice />
            </MainLayout>
          }
        />
        <Route
          path="/benefits"
          element={
            <MainLayout>
              <Benefits />
            </MainLayout>
          }
        />
        <Route
          path="/updateForm"
          element={
            <MainLayout>
              <UpdateForm />
            </MainLayout>
          }
        />

        <Route path="*" element={<PageNotFound/>} />
      </Routes>
    </Router>
  );
}

export default App;
