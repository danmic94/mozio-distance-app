import { createContext } from 'react';

interface DistanceCalculationContext {
    total: number;
    setTotal: Function;
}

const CalculationResultsContext = createContext<DistanceCalculationContext>({ total: 0, setTotal: () => {} });

export default CalculationResultsContext;
