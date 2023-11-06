import { Fragment } from "react";
import { Button, NavItem, NavbarText } from "reactstrap";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";

function AuthMenu() {
    const auth = useAuth();
    const navigate = useNavigate();

    const handleRegister = () => navigate("/register");
    const handleLogin = () => navigate("/login");
    const handleLogout = () => auth.logout();

    const renderAuthorized = () =>
        <Fragment>
            <NavbarText>
                <FormattedMessage id="helloUser" values={{ n: "User" }} />
            </NavbarText>
            <NavItem className="ms-1 d-flex align-items-center">
                <Button size="sm" onClick={handleLogout}>
                    <FormattedMessage id="logout" />
                </Button>
            </NavItem>
        </Fragment>;

    const renderUnauthorized= () =>
        <Fragment>
            <NavItem className="ms-1 d-flex align-items-center">
                <Button size="sm" onClick={handleRegister}>
                    <FormattedMessage id="register" />
                </Button>
            </NavItem>
            <NavItem className="ms-1 d-flex align-items-center">
                <Button size="sm" onClick={handleLogin}>
                    <FormattedMessage id="login" />
                </Button>
            </NavItem>
        </Fragment>;

    const content = auth.isAuthorized
        ? renderAuthorized()
        : renderUnauthorized();

    return content;
}

export default AuthMenu;
