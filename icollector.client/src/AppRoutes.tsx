import Home from "./components/home/Home";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import { CollectionPage } from "./components/collection/CollectionPage";
import { ItemPage } from "./components/item/ItemPage";
import { PersonalPage } from "./components/personal/PersonalPage";

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
    },
    {
        path: "/collection",
        element: <CollectionPage />
    },
    {
        path: "/item",
        element: <ItemPage />
    },
    {
        path: "/personal",
        requireAuth: true,
        element: <PersonalPage />
    }
]

export default AppRoutes;
