import React, { Fragment, useContext } from 'react';
import SearchForm from './components/SearchForm';
import CalculationResultsContext from '../context/CalculationResultsContext/DistanceContext';
import { Heading, VStack } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRoad } from '@fortawesome/free-solid-svg-icons';
import FormContext from '../context/FormContext/FormContext';

interface HomePageProps {}

const HomePageComponent: React.FC<HomePageProps> = () => {
    const calculationsResultContext = useContext(CalculationResultsContext);
    const { isLoading, setLoader } = useContext(FormContext);

    return (
        <Fragment>
            <VStack w='1024px' p={32} alignItems='flex-start'>
                <Heading as='h1' id='contactme-section'>
                    <FontAwesomeIcon icon={faRoad} /> Find out how many km will take...
                </Heading>
                <SearchForm isLoading={isLoading} setLoader={setLoader} setTotalDistnceResult={calculationsResultContext.setTotal} />
            </VStack>
        </Fragment>
    );
};

export default HomePageComponent;
