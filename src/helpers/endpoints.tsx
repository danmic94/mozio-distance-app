import citiesJSON from '../data/cities.json';

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Search function to find the auto-complete cities
 *
 * @param searchTerm
 * @returns [] or [string, number, number][]
 */
function searchCityEndpoint(searchTerm: string) {
    return citiesJSON.filter((cityData: any): boolean | [string, number, number] => {
        const cityName: string = cityData[0];
        if ((cityName as string).includes(searchTerm)) {
            return cityData;
        } else {
            return false;
        }
    });
}

/**
 * Fake async simulation of an endoint call
 *
 * @param searchTermn
 * @returns Promise<[]>
 */
const searchCity = (searchTermn: string): Promise<[]> => {
    return new Promise((resolve: Function, reject: Function) => {
        setTimeout(() => {
            const failFlag = 'fail';

            if (failFlag === searchTermn) {
                return reject('Failed on purpose');
            }

            const searchResult = searchCityEndpoint(searchTermn);
            return resolve(searchResult);
        }, getRandomInt(0, 1000));
    });
};

export { searchCity };
