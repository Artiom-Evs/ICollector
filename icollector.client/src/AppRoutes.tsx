import Home from "./components/Home";

const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: "/register",
        element: <Register />
    }
]

export default AppRoutes;
