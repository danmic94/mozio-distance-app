import React, { Fragment, useContext, useEffect } from 'react';
import SearchForm from './components/SearchForm';
import CalculationResultsContext from '../context/CalculationResultsContext/DistanceContext';
import { Box, Center, Heading, Spinner, Stack, Text } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRoad } from '@fortawesome/free-solid-svg-icons';
import FormContext from '../context/FormContext/FormContext';
import ErrorAlertComponent from './components/ErrorAlert';
import CalculationResultComponent from './components/CalculationResult';
import { useSearchParams } from 'react-router-dom';
import { calculateDistanceBetweenCities } from '../helpers/endpoints';
import CalculateDistanceResponse from '../data/types';

interface SearchPageProps {}

const SearchPageComponent: React.FC<SearchPageProps> = () => {
    const [searchParams] = useSearchParams();
    const {
        isLoading,
        setLoader,
        showError,
        setErrorAlertFlag,
        intermediateCitiesInputs,
        setintermediateCitiesInputs,
        formValues,
        setFormValues,
        formValidations,
        setFormValidations,
    } = useContext(FormContext);
    const { total, setTotal, betweenCities, setBetweenCities } = useContext(CalculationResultsContext);

    useEffect(() => {
        if (searchParams && searchParams.get('citiesData')) {
            setLoader(true);
            let citiesData = searchParams.getAll('citiesData')[0].split(',');

            const result = (citiesData as Array<any>).reduce((arr, item, idx) => (arr[Math.floor(idx / 3)] ??= []).push(item) && arr, []);
            calculateDistanceBetweenCities(result)
                .then(
                    (result: CalculateDistanceResponse) => {
                        if (setTotal) {
                            setBetweenCities(result.segmented);
                            setTotal(result.total);
                            setLoader(false);
                        }
                    },
                    reject => {
                        console.log('reject', reject);
                        setLoader(false);
                        setErrorAlertFlag(true);
                    },
                )
                .catch(err => {
                    console.log('This error is thrown when calcualtion goes bad', err);
                    setLoader(false);
                    setErrorAlertFlag(true);
                });
            setLoader(false);
        }
    }, [searchParams, setBetweenCities, setErrorAlertFlag, setLoader, setTotal]);

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
                            intermediateCitiesInputs={intermediateCitiesInputs}
                            setIntermediateCitiesInputs={setintermediateCitiesInputs}
                            formValues={formValues}
                            setFormValues={setFormValues}
                            formValidators={formValidations}
                            setformValidators={setFormValidations}
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
