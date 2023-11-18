import Layout from './components/layout/Layout';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { PrivateRoute } from './components/Auth/PrivateRoute';

function App() {
    return (
        <Layout>
            <Routes>
                {AppRoutes.map((route, i) => {
                    const { element, requireAuth, ...rest } = route;
                    return <Route key={i} {...rest} element={requireAuth ? <PrivateRoute element={element} /> : element} />;
                })}
            </Routes>
        </Layout>
    );
}

export default App;
