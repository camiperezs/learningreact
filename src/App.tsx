import "./App.css";
import { Link, NavLink, Outlet, Route, Routes } from "react-router";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";

function Layout() {
  return (
    <div className="shell">
      <header className="topbar">
        {/*<NavLink to="/" className="link">Home</NavLink>*/}
        <NavLink to="/product-list" className="link">Productos</NavLink>
      </header>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="product-list" element={<ProductList />} />
        <Route path="*" element={<div>404 • No encontrado</div>} />
      </Route>
    </Routes>
  );
}
