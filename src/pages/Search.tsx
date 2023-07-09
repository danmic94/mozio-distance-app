import React, { Fragment, useContext } from 'react';
import CalculationResultsContext from '../context/CalculationResultsContext/DistanceContext';
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Center, Stack } from '@chakra-ui/react';
import FormContext from '../context/FormContext/FormContext';
import CalculationResultComponent from './components/CalculationResult';
import { useNavigate } from 'react-router-dom';

interface SearchPageProps { }

const SearchPageComponent: React.FC<SearchPageProps> = () => {
    const navigate = useNavigate();
    const {
        isLoading,
        showError,
    } = useContext(FormContext);
    const { total, betweenCities } = useContext(CalculationResultsContext);

    return (
        <Fragment>
            <Center paddingTop={'4rem'}>
                <Stack direction={['column', 'row']}>
                    <Box>
                        {!isLoading && betweenCities.length === 0 && showError &&
                            <Fragment>
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
