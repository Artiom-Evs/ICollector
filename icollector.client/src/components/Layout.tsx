import { FunctionComponent, ReactNode } from "react"
import Header from "./Header";
import Footer from "./Footer";
import { Container } from "reactstrap";

interface LayoutProps {
    children?: ReactNode | undefined
}

const Layout: FunctionComponent<LayoutProps> = props => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <header>
                <Header />
            </header>
            <main>
                <Container>
                    {props.children}
                </Container>
            </main>
            <footer className="mt-auto">
                <Footer />
            </footer>
        </div>
    );
}

export default Layout;