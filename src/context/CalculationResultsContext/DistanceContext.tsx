import { createContext } from 'react';

interface DistanceCalculationContext {
    betweenCities: Array<[string, string, number]>;
    setBetweenCities: Function;
    total: number;
    setTotal: Function;
}

const CalculationResultsContext = createContext<DistanceCalculationContext>({
    total: 0,
    setTotal: () => {},
    betweenCities: [],
    setBetweenCities: () => {},
});

export default CalculationResultsContext;
