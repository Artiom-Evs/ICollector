import { useState } from 'react'
import { DropdownMenu, DropdownItem, DropdownToggle, Dropdown } from "reactstrap"
import { LOCALES } from '../i18n/locales';
import { FormattedMessage, useIntl } from 'react-intl';

const languages = {
	[LOCALES.ENGLISH]: "English",
	[LOCALES.POLISH]: "Polski",
	[LOCALES.RUSSIAN]: "Русский"
};

const LanguageMenu = () => {
	const intl = useIntl();
	const [isOpen, setOpen] = useState(false);
	const [language, setLanguage] = useState(intl.locale);

	const handleToggle = () => setOpen(!isOpen);
	const handleClick = (newLanguage: string) => {
		setLanguage(newLanguage);
		document.dispatchEvent(new CustomEvent("language-changed", { detail: newLanguage }));
	}

	return (
		<Dropdown toggle={handleToggle} isOpen={isOpen}>
			<DropdownToggle caret size="sm">
				{language}
			</DropdownToggle>
			<DropdownMenu>
				<DropdownItem header>
					<FormattedMessage id="choose_language" />
				</DropdownItem>
				{Object.entries(languages).map(([code, lang]) =>
					<DropdownItem key={code} onClick={() => handleClick(code)}>{lang}</DropdownItem>
				)}
			</DropdownMenu>
		</Dropdown>
	);
}

export default LanguageMenu;
