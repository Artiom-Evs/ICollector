import { useEffect, useState } from 'react';
import { FormattedDate, FormattedMessage, IntlProvider } from 'react-intl';
import { LOCALES } from './i18n/locales';
import { messages } from './i18n/messages';
import Layout from './components/Layout';
import { Container } from "reactstrap";

interface Forecast {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

function getStoredLocale() {
    const savedLocale = localStorage.getItem('locale')
    return savedLocale || LOCALES.ENGLISH
}

function setStoredLocale(locale: string) {
    localStorage.setItem("locale", locale)
}

function App() {
    const [locale, setLocale] = useState(getStoredLocale);
    const [forecasts, setForecasts] = useState<Forecast[]>();

    useEffect(() => {
        populateWeatherData();
    }, []);

    document.addEventListener("language-changed", (e) => {
        const locale = (e as CustomEvent).detail;
        setLocale(locale);
        setStoredLocale(locale);
    });

    const contents = forecasts === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="table table-striped" aria-labelledby="tabelLabel">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Temp. (C)</th>
                    <th>Temp. (F)</th>
                    <th>Summary</th>
                </tr>
            </thead>
            <tbody>
                {forecasts.map(forecast =>
                    <tr key={forecast.date}>
                        <td>
                            <FormattedDate value={forecast.date} />
                        </td>
                        <td>{forecast.temperatureC}</td>
                        <td>{forecast.temperatureF}</td>
                        <td>{forecast.summary}</td>
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <IntlProvider messages={messages[locale]} locale={locale} defaultLocale={locale}>
            <Layout>
                <Container>
                    <h1 id="tabelLabel">
                        <FormattedMessage id="weather_forecast" />
                    </h1>
                    <p>
                        <FormattedMessage id="wf_description" />
                    </p>
                    {contents}
                </Container>
            </Layout>
        </IntlProvider>
    );

    async function populateWeatherData() {
        const response = await fetch('weatherforecast');
        const data = await response.json();
        setForecasts(data);
    }
}

export default App;