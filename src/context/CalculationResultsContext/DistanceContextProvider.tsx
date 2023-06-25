import { PropsWithChildren, useState } from 'react';
import CalculationResultsContext from './DistanceContext';

const CalculationResultsProvider: React.FC<PropsWithChildren> = props => {
    const [totalDistance, setTotalDistance] = useState(0);

    return (
        <CalculationResultsContext.Provider
            value={{
                total: totalDistance,
                setTotal: setTotalDistance,
            }}>
            {props.children}
        </CalculationResultsContext.Provider>
    );
};

export default CalculationResultsProvider;
