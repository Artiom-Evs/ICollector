import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Collapse, NavItem, NavLink, Navbar, NavbarBrand, NavbarToggler } from "reactstrap";

const Header = () => {
    const [collapsed, setCollapse] = useState<boolean>(true);
    const handleToggleClick = () => setCollapse(!collapsed);

    return (
        <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" container light>
            <NavbarBrand href="/">ICollector</NavbarBrand>
            <NavbarToggler onClick={handleToggleClick} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
                <ul className="navbar-nav flex-grow">
                    <NavItem>
                        <NavLink href="/">
                            <FormattedMessage id="home_page" />
                        </NavLink>
                    </NavItem>
                </ul>
            </Collapse>
        </Navbar>
    );
}

export default Header;
