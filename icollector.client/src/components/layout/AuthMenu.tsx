import { Fragment } from "react";
import { Button, NavItem, NavLink } from "reactstrap";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";

function AuthMenu() {
    const auth = useAuth();
    const navigate = useNavigate();

    const handleRegister = () => navigate("/register");
    const handleLogin = () => navigate("/login");
    const handleLogout = () => auth.logout();

    const renderAuthorized = () =>
        <Fragment>
            <NavLink tag={Link} to="/personal">
                <FormattedMessage id="helloUser" values={{ n: auth.userInfo?.email }} />
            </NavLink>
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
