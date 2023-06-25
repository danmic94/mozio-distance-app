import citiesJSON from '../data/cities.json';
import CalculateDistanceResponse from '../data/types';
import haversineDistance from './haversine';

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

const calculateDistanceBetweenCities = (cities: [[string, number, number]]): Promise<CalculateDistanceResponse> => {
    return new Promise((resolve: Function, reject: Function) => {
        setTimeout(() => {
            let failFlag = false;
            //Reject the promise if dijon is in the cities
            cities.forEach((city: any) => {
                if (city[0] === 'Dijon') {
                    failFlag = true;
                    return;
                }
            });
            if (failFlag) {
                return reject('Failed on purpose');
            }
            // const result = { total: 0 };
            let result: CalculateDistanceResponse = { total: 0, segmented: [] };
            let i = 0,
                next = 1;
            do {
                let currentCity: [string, number, number] = cities[i],
                    nextCity: [string, number, number] = cities[next];
                let coordinatesCurrent: [number, number] = [currentCity[1], currentCity[2]],
                    coordinatesNext: [number, number] = [nextCity[1], nextCity[2]];
                let calcualtedDistance: number = haversineDistance(coordinatesCurrent, coordinatesNext);
                result.segmented.push([currentCity[0], nextCity[0], parseFloat(calcualtedDistance.toFixed(2))]);
                result.total += parseFloat(calcualtedDistance.toFixed(2));
                next += 1;
                i += 1;
            } while (cities[next]);
            return resolve(result);
        }, getRandomInt(0, 1000));
    });
};

export { searchCity, calculateDistanceBetweenCities };
