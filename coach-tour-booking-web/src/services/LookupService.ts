import { ICityCountryPair, SupportedEUCountriesMixedArray } from "../mock_data/SupportedEUCountries"

export default class LookupService {
    constructor() {
        console.log('Constructing...')   
    }

    get getAllEUNations() {
        return new Promise<ICityCountryPair[]>((resolve, reject) => {
            setTimeout(() => {
                resolve(SupportedEUCountriesMixedArray);
            }, 237);
        });
    }
}