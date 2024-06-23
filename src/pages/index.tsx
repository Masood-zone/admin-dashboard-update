import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./layout";
import Home from "./home";
import Inventory from "./inventory";

const rootRoutes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="inventory" element={<Inventory />} />
    </Route>
  )
);

export default rootRoutes;
