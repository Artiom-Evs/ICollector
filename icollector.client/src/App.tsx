import Layout from './components/Layout';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';

function App() {
    return (
        <Layout>
            <Routes>
                {AppRoutes.map((route, i) =>
                    <Route key={i} {...route} />
                )}
            </Routes>
        </Layout>
    );
}

export default App;
