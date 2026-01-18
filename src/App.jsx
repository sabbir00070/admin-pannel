import Dashboard from "./page/dashboard";
import Maintenance from "./page/maintenance";
import Users from "./page/users";
import EditUser from "./page/edit_user";
import Login from "./page/login";
import Settings from "./page/settings";
import RootLayout from "./layout/RootLayout";
import PrivateRoute from "./components/PrivateRoute";

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/login" element={<Login />} />

        <Route element={<PrivateRoute />}>
          <Route element={<RootLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="users/:id/edit" element={<EditUser />} />
            <Route path="maintenance" element={<Maintenance />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;