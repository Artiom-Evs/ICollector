import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Collapse, Nav, NavItem, NavLink, Navbar, NavbarBrand, NavbarToggler } from "reactstrap";
import LanguageMenu from "./LanguageMenu";
import ThemeMenu from "./ThemeMenu";

const Header = () => {
    const [collapsed, setCollapse] = useState<boolean>(true);
    const handleToggleClick = () => setCollapse(!collapsed);

    // intended for auto-collapse nav panel when user taps outside of it
    const handleDocumentClick = (e: Event) => {
        const navPanel = document.getElementById("navPanel");
        if (!navPanel?.contains(e.target as Node)) {
            setCollapse(true);
        }
    }
    
    if (collapsed) {
        document.removeEventListener("click", handleDocumentClick);
    }
    else {
        document.addEventListener("click", handleDocumentClick);
    }

    return (
        <Navbar id="navPanel" className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" container>
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
                        <ThemeMenu />
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
