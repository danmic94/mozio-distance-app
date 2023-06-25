import { PropsWithChildren, useState } from 'react';
import CalculationResultsContext from './DistanceContext';

const CalculationResultsProvider: React.FC<PropsWithChildren> = props => {
    const [totalDistance, setTotalDistance] = useState(0);
    const [distanceInBetweenCities, setDistanceInBetweenCities] = useState([]);

    return (
        <CalculationResultsContext.Provider
            value={{
                total: totalDistance,
                setTotal: setTotalDistance,
                betweenCities: distanceInBetweenCities,
                setBetweenCities: setDistanceInBetweenCities,
            }}>
            {props.children}
        </CalculationResultsContext.Provider>
    );
};

export default CalculationResultsProvider;
