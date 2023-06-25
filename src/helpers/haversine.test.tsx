import { haversineDistance } from './haversine';

const cities = [
    ['Angers', 47.478419, -0.563166],
    ['Aix-en-Provence', 43.529742, 5.447427],
];

describe('calculate distance between two geographical points with lat and long each', () => {
    test('works as expected', () => {
        const expectedResult: number = 641.67;
        const angers = [cities[0][1] as number, cities[0][2] as number];
        const aix = [cities[1][1] as number, cities[1][2] as number];
        let result = haversineDistance(angers, aix);
        result = parseFloat(result.toFixed(2));
        expect(result).toEqual(expectedResult);
    });
});

export {};
