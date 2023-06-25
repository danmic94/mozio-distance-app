import React, { Fragment, useContext } from 'react';
import SearchForm from './components/SearchForm';
import CalculationResultsContext from '../context/CalculationResultsContext/DistanceContext';
import { Box, Center, Heading, Spinner, Stack, Text } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRoad } from '@fortawesome/free-solid-svg-icons';
import FormContext from '../context/FormContext/FormContext';
import ErrorAlertComponent from './components/ErrorAlert';
import CalculationResultComponent from './components/CalculationResult';

interface SearchPageProps {}

const SearchPageComponent: React.FC<SearchPageProps> = () => {
    const { isLoading, setLoader, showError, setErrorAlertFlag } = useContext(FormContext);
    const { total, setTotal, betweenCities } = useContext(CalculationResultsContext);

    return (
        <Fragment>
            <Center paddingTop={'4rem'}>
                <Stack direction={['column', 'row']} spacing='14rem'>
                    <Box>
                        {!isLoading && <ErrorAlertComponent showError={showError} setShowError={setErrorAlertFlag} />}
                        <Heading as='h1' id='contactme-section'>
                            <FontAwesomeIcon icon={faRoad} /> Find out how many km will take...
                            <br />
                            {isLoading ? <Spinner color='teal.500' /> : <Text textAlign={'left'}>A total of: {Math.round(total)} KM</Text>}
                        </Heading>
                        <SearchForm
                            setTotalDistnceResult={setTotal}
                            isLoading={isLoading}
                            setLoader={setLoader}
                            setShowError={setErrorAlertFlag}
                        />
                    </Box>
                    <Box>
                        {isLoading === false && betweenCities.length ? (
                            <Box p={6} rounded='md' w='100%' alignItems={'flex-end'}>
                                <CalculationResultComponent totalDistance={Math.round(total)} results={betweenCities} />
                            </Box>
                        ) : null}
                    </Box>
                </Stack>
            </Center>
        </Fragment>
    );
};

export default SearchPageComponent;
