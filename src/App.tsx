import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home/Index";
import { Login } from "./pages/Login/Index";
import { Admin } from "./pages/Admin/Index";
import { Networks } from "./pages/Networks/Index";
import { Private } from "./routes/Private"
import { ErrorPage } from "./pages/Error/Index";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: 'login',
    element: <Login />
  },
  {
    path: '/admin',
    element: <Private><Admin/></Private>
  },
  {
    path: '/admin/social',
    element: <Private><Networks/></Private>
  },
  {
    path: '/*',
    element: <ErrorPage />
  }
])

export { router }