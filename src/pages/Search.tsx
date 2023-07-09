import React, { Fragment, useContext, useEffect } from 'react';
import CalculationResultsContext from '../context/CalculationResultsContext/DistanceContext';
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Center, Heading, Spinner, Stack, Text } from '@chakra-ui/react';
import FormContext from '../context/FormContext/FormContext';
import CalculationResultComponent from './components/CalculationResult';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { calculateDistanceBetweenCities } from '../helpers/endpoints';
import CalculateDistanceResponse from '../data/types';
import ErrorAlertComponent from './components/ErrorAlert';

interface SearchPageProps { }

const SearchPageComponent: React.FC<SearchPageProps> = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const {
        isLoading,
        setLoader,
        setErrorAlertFlag,
        showError,
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
                <Stack direction={['column', 'row']}>
                    <Box>
                        {!isLoading && betweenCities.length === 0 &&
                            <Fragment>
                                <ErrorAlertComponent showError={showError} setShowError={setErrorAlertFlag} />
                                <Alert
                                    status='error'
                                    variant='subtle'
                                    flexDirection='column'
                                    alignItems='center'
                                    justifyContent='center'
                                    textAlign='center'
                                    height='400px'
                                >
                                    <AlertIcon boxSize='40px' mr={0} />
                                    <AlertTitle mt={4} mb={1} fontSize='lg'>
                                        Calculation failed
                                    </AlertTitle>
                                    <AlertDescription maxWidth='md'>
                                        Sorry there was a problem while calculating your requested distance.
                                    </AlertDescription>
                                    <br />
                                    <Button
                                        colorScheme='teal'
                                        onClick={() => navigate('/')}
                                        variant='outline'>
                                        Go back to serach...
                                    </Button>
                                </Alert>
                            </Fragment>
                        }
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
