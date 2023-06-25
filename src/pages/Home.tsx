import React, { Fragment, useContext } from 'react';
import SearchForm from './components/SearchForm';
import CalculationResultsContext from '../context/CalculationResultsContext/DistanceContext';
import { Heading, VStack } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRoad } from '@fortawesome/free-solid-svg-icons';

interface HomePageProps {}

const HomePageComponent: React.FC<HomePageProps> = () => {
    const calculationsResultContext = useContext(CalculationResultsContext);

    return (
        <Fragment>
            <VStack w='1024px' p={32} alignItems='flex-start'>
                <Heading as='h1' id='contactme-section'>
                    <FontAwesomeIcon icon={faRoad} /> Find out how many km will take...
                </Heading>
                <SearchForm setTotalDistnceResult={calculationsResultContext.setTotal} />
            </VStack>
        </Fragment>
    );
};

export default HomePageComponent;
