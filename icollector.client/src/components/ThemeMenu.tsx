import { useState } from 'react'
import { DropdownMenu, DropdownItem, DropdownToggle, Dropdown } from "reactstrap"
import { FormattedMessage } from 'react-intl';
import { Themes } from '../@types/ThemeContextType';
import useTheme from '../hooks/useTheme';

const ThemeMenu = () => {
	const [isOpen, setOpen] = useState(false);
	const [theme, setTheme] = useTheme();
	
	const handleToggle = () => setOpen(!isOpen);
	const handleClick = (newTheme: string) => {
		setTheme(newTheme as Themes);
	}

	const themes: Record<Themes, string> = {
		"light": "light_theme",
		"dark": "dark_theme"
	}

	return (
		<Dropdown toggle={handleToggle} isOpen={isOpen}>
			<DropdownToggle caret size="sm">
				<FormattedMessage id={themes[theme]} />
			</DropdownToggle>
			<DropdownMenu>
				<DropdownItem header>
					<FormattedMessage id="choose_theme" />
				</DropdownItem>
				{Object.entries(themes).map(([name, text_id]) =>
					<DropdownItem key={name} onClick={() => handleClick(name)}>
						<FormattedMessage id={text_id} />
					</DropdownItem>
				)}
			</DropdownMenu>
		</Dropdown>
	);
}

export default ThemeMenu;
