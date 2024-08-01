import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Login,
  Dashboard,
  Events,
  Users,
  Transactions,
  FAQ,
  EventDetails,
  UserDetails,
} from "./pages/index";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="events" element={<Events />} />
          <Route path="events/:id" element={<EventDetails />} />
          <Route path="users" element={<Users />} />
          <Route path="users/:id" element={<UserDetails />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="faq" element={<FAQ />} />
        </Route>
        <Route path="login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
