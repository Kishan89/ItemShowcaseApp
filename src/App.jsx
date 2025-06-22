import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import ViewItems from "./pages/ViewItems";
import AddItem from "./pages/AddItem";
import "./App.css";

function Navigation() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <div className="logo">🛍️</div>
          <h1 className="brand-title">ItemVista</h1>
        </div>
        <div className="navbar-links">
          <Link
            to="/"
            className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
          >
            👁️ View Items
          </Link>
          <Link
            to="/add-item"
            className={`nav-link ${
              location.pathname === "/add-item" ? "active" : ""
            }`}
          >
            ➕ Add Items
          </Link>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navigation />
        <Routes>
          <Route path="/" element={<ViewItems />} />
          <Route path="/add-item" element={<AddItem />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
