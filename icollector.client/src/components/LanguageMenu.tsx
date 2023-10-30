import { useState } from 'react'
import { DropdownMenu, DropdownItem, DropdownToggle, Dropdown } from "reactstrap"
import { LOCALES } from '../i18n/locales';
import { FormattedMessage } from 'react-intl';
import useLocale from '../hooks/useLocale';

const languages: Record<LOCALES, string> = {
	[LOCALES.ENGLISH]: "English",
	[LOCALES.POLISH]: "Polski",
	[LOCALES.RUSSIAN]: "Русский"
};

const LanguageMenu = () => {
	const [isOpen, setOpen] = useState(false);
	const [locale, setLocale] = useLocale();

	const handleToggle = () => setOpen(!isOpen);
	const handleClick = (locale: LOCALES) => {
		setLocale(locale);
	}

	return (
		<Dropdown toggle={handleToggle} isOpen={isOpen}>
			<DropdownToggle caret size="sm">
				{languages[locale]}
			</DropdownToggle>
			<DropdownMenu>
				<DropdownItem header>
					<FormattedMessage id="choose_language" />
				</DropdownItem>
				{Object.entries(languages).map(([code, lang]) =>
					<DropdownItem key={code} onClick={() => handleClick(code as LOCALES)}>{lang}</DropdownItem>
				)}
			</DropdownMenu>
		</Dropdown>
	);
}

export default LanguageMenu;
