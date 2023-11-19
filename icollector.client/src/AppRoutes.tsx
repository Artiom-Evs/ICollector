import Home from "./components/home/Home";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import { CollectionPage } from "./components/collection/CollectionPage";
import { ItemPage } from "./components/item/ItemPage";
import { PersonalPage } from "./components/personal/PersonalPage";
import { CreateCollectionPage } from "./components/collection/CreateCollectionPage";
import { EditCollectionPage } from "./components/collection/EditCollectionPage";
import { DeleteCollectionPage } from "./components/collection/DeleteCollectionPage";
import { CreateItemPage } from "./components/item/CreateItemPage";
import { EditItemPage } from "./components/item/EditItemPage";
import { DeleteItemPage } from "./components/item/DeleteItemPage";
import { UserPage } from "./components/user/UserPage";

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
    },
    {
        path: "/collection/create",
        requireAuth: true,
        element: <CreateCollectionPage />
    },
    {
        path: "/collection/edit",
        requireAuth: true,
        element: <EditCollectionPage />
    },
    {
        path: "/collection/delete",
        requireAuth: true,
        element: <DeleteCollectionPage />
    },
    {
        path: "/item/create",
        requireAuth: true,
        element: <CreateItemPage />
    },
    {
        path: "/item/edit",
        requireAuth: true,
        element: <EditItemPage />
    },
    {
        path: "/item/delete",
        requireAuth: true,
        element: <DeleteItemPage />
    },
    {
        path: "/user",
        element: <UserPage />
    }
]

export default AppRoutes;
