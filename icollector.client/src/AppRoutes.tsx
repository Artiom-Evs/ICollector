import Home from "./components/home/Home";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";

const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/login",
        element: <Login />
    }
]

export default AppRoutes;
