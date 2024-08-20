import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  Login,
  Dashboard,
  Events,
  Users,
  Transactions,
  FAQ,
  EventDetails,
  UserDetails,
} from './pages/index';
import Layout from './components/layout/Layout';
import ProtectedRoute from './Route/ProtectedRoute';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={<ProtectedRoute element={<Dashboard />} />}
          />
          <Route
            path="events"
            element={<ProtectedRoute element={<Events />} />}
          />
          <Route
            path="events/:id"
            element={<ProtectedRoute element={<EventDetails />} />}
          />
          <Route
            path="users"
            element={<ProtectedRoute element={<Users />} />}
          />
          <Route
            path="users/:id"
            element={<ProtectedRoute element={<UserDetails />} />}
          />
          <Route
            path="transactions"
            element={<ProtectedRoute element={<Transactions />} />}
          />
          <Route
            path="faq"
            element={<ProtectedRoute element={<FAQ />} />}
          />
        </Route>
        <Route path="login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
