import { Country, State, City } from "country-state-city";
export const useLocation = () => {
  const getCountryByCode = (countryCode: string) => {
    return Country.getAllCountries().find(
      (country) => country.isoCode === countryCode
    );
  };
  //   state
  const getStateByCode = (countryCode: string, stateCode: string) => {
    const state = State.getAllStates().find(
      (state) =>
        state.countryCode === countryCode && state.isoCode === stateCode
    );
    if (!state) return null;
    return state;
  };

  //   get a country state
  const getCountryState = (countryCode: string) => {
    return State.getAllStates().filter(
      (state) => state.countryCode === countryCode
    );
  };

  //   get a country state city
  const getCountryCity = (countryCode: string, stateCode: string) => {
    return City.getAllCities().filter(
      (city) => city.countryCode === countryCode && city.stateCode === stateCode
    );
  };
  return {
    getAllCountry: Country.getAllCountries,
    getCountryByCode,
    getStateByCode,
    getCountryState,
    getCountryCity,
  };
};
