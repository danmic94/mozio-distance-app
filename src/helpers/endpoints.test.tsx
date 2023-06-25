import { searchCityEndpoint } from './endpoints';

describe('search functionality that powers the selectable dropdown', () => {
    test('works as expected', () => {
        const found: string = 'Lille';
        const result: any = searchCityEndpoint('Li');
        expect(result[0][0]).toEqual(found);
    });
});

export {};
