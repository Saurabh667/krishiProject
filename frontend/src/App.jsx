// import React from "react";
// import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Dashboard from "./pages/dashboard/Dashboard";
// import Profile from "./pages/profile/Profile";
// import Weather from "./pages/weather/Weather";
// import Advisory from "./pages/advisory/Advisory";
// import Activity from "./pages/Activity/Activity";
// import Calendar from "./pages/calendar/Calendar";
// import Prices from "./pages/prices/Prices";
// import Chat from "./pages/Chat/Chat";
// import Benefits from "./pages/benefits/Benefits";
// import "./app.css";
// import UpperNav from "./pages/upperNav/UpperNav";
// import Signup from "./signup";
// import Login from "./login";
// import PageNotFound from "./pnf";

// function Layout({ children }) {
//   const location = useLocation();

//   // Check if we are on login or signup
//   const authPage = location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/*";

//   return (
//     <>
//       {authPage ? (
//         // ✅ Centered layout for login/signup
//         <div className="auth-container">
//           {children}
//         </div>
//       ) : (
//         // ✅ Normal layout with Navbar + UpperNav
//         <>
//           <Navbar />
//           <UpperNav />
//           <div className="main-content">{children}</div>
//         </>
//       )}
//     </>
//   );
// }

// function App() {
//   return (
//     <Router>
//       <Layout>
//         <Routes>
//           <Route path="/register" element={<Signup />} />
//           <Route path="/login" element={<Login />} />
          
//           <Route path="/" element={<Dashboard />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/weather" element={<Weather />} />
//           <Route path="/advisory" element={<Advisory />} />
//           <Route path="/activity" element={<Activity />} />
//           <Route path="/calendar" element={<Calendar />} />
//           <Route path="/prices" element={<Prices />} />
//           <Route path="/chat" element={<Chat />} />
//           <Route path="/benefits" element={<Benefits />} />
//           <Route path="*" element={<PageNotFound/>} />
//         </Routes>
//       </Layout>
//     </Router>
//   );
// }

// export default App;


import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/dashboard/Dashboard";
import Profile from "./pages/profile/Profile";
import Weather from "./pages/weather/Weather";
import Advisory from "./pages/advisory/Advisory";
import Activity from "./pages/Activity/Activity";
import Calendar from "./pages/calendar/Calendar";
import Prices from "./pages/prices/Prices";
import Chat from "./pages/Chat/Chat";
import Benefits from "./pages/benefits/Benefits";
import Signup from "./signup";
import Login from "./login";


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
          path="/benefits"
          element={
            <MainLayout>
              <Benefits />
            </MainLayout>
          }
        />

        {/* 404 Page */}
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
    </Router>
  );
}

export default App;
