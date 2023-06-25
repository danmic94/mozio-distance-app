import React, { Fragment, useContext } from 'react';
import SearchForm from './components/SearchForm';
import CalculationResultsContext from '../context/CalculationResultsContext/DistanceContext';
import { Heading, VStack } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRoad } from '@fortawesome/free-solid-svg-icons';
import FormContext from '../context/FormContext/FormContext';
import ErrorAlertComponent from './components/ErrorAlert';

interface HomePageProps {}

const HomePageComponent: React.FC<HomePageProps> = () => {
    const calculationsResultContext = useContext(CalculationResultsContext);
    const { isLoading, setLoader, showError, setErrorAlertFlag } = useContext(FormContext);

    return (
        <Fragment>
            <VStack w='1024px' p={32} alignItems='flex-start'>
                {!isLoading && <ErrorAlertComponent showError={showError} setShowError={setErrorAlertFlag} />}
                <Heading as='h1' id='contactme-section'>
                    <FontAwesomeIcon icon={faRoad} /> Find out how many km will take...
                </Heading>
                <SearchForm
                    isLoading={isLoading}
                    setLoader={setLoader}
                    setTotalDistnceResult={calculationsResultContext.setTotal}
                    setShowError={setErrorAlertFlag}
                />
            </VStack>
        </Fragment>
    );
};

export default HomePageComponent;
