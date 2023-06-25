import React, { Fragment, useContext } from 'react';
import SearchForm from './components/SearchForm';
import CalculationResultsContext from '../context/CalculationResultsContext/DistanceContext';
import { Heading, Spinner, Text, VStack } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRoad } from '@fortawesome/free-solid-svg-icons';
import FormContext from '../context/FormContext/FormContext';
import ErrorAlertComponent from './components/ErrorAlert';

interface SearchPageProps {}

const SearchPageComponent: React.FC<SearchPageProps> = () => {
    const { isLoading, setLoader, showError, setErrorAlertFlag } = useContext(FormContext);
    const calculationsResultContext = useContext(CalculationResultsContext);

    return (
        <Fragment>
            <VStack w='1024px' p={32} alignItems='flex-start'>
                {!isLoading && <ErrorAlertComponent showError={showError} setShowError={setErrorAlertFlag} />}
                <Heading as='h1' id='contactme-section'>
                    <FontAwesomeIcon icon={faRoad} /> Find out how many km will take...
                    <br />
                    {isLoading ? <Spinner color='teal.500' /> : <Text textAlign={'left'}>{calculationsResultContext.total} KM</Text>}
                </Heading>
                <SearchForm
                    setTotalDistnceResult={calculationsResultContext.setTotal}
                    isLoading={isLoading}
                    setLoader={setLoader}
                    setShowError={setErrorAlertFlag}
                />
            </VStack>
        </Fragment>
    );
};

export default SearchPageComponent;
