import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Courses from './pages/Courses';
import About from './pages/About';
import Contact from './pages/Contact';
import Status from './pages/Status';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import MonitoringLogin from './pages/MonitoringLogin';
import MonitoringDashboard from './pages/MonitoringDashboard';
import InstructorDetails from './pages/InstructorDetails';
import Snowfall from './components/Snowfall';
import { LanguageProvider } from './context/LanguageContext';

const Layout = ({ children }) => {
  const location = useLocation();
  const isMonitoring = location.pathname.startsWith('/monitoring');

  return (
    <div className="app">
      {!isMonitoring && <Navbar />}
      <main>
        {children}
      </main>
      {!isMonitoring && <Footer />}
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <Snowfall />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/about" element={<About />} />
            <Route path="/status" element={<Status />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/monitoring" element={<MonitoringLogin />} />
            <Route path="/monitoring/dashboard" element={<MonitoringDashboard />} />
            <Route path="/instructor/:slug" element={<InstructorDetails />} />
          </Routes>
        </Layout>
      </Router>
    </LanguageProvider>
  );
}

export default App;
