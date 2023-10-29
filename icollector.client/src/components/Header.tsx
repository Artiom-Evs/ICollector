import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Collapse, Nav, NavItem, NavLink, Navbar, NavbarBrand, NavbarToggler } from "reactstrap";
import LanguageMenu from "./LanguageMenu";

const Header = () => {
    const [collapsed, setCollapse] = useState<boolean>(true);
    const handleToggleClick = () => setCollapse(!collapsed);

    return (
        <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" container>
            <NavbarBrand href="/">ICollector</NavbarBrand>
            <NavbarToggler onClick={handleToggleClick} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
                <Nav className="navbar-nav flex-grow">
                    <NavItem>
                        <NavLink href="/">
                            <FormattedMessage id="home_page" />
                        </NavLink>
                    </NavItem>
                    <NavItem className="ms-1 d-flex align-items-center">
                        <LanguageMenu />
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    );
}

export default Header;
