import React, { Fragment, useContext, useRef, useState } from 'react';
import { useFormik } from 'formik';
import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Stack,
    VStack,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCity, faSpinner } from '@fortawesome/free-solid-svg-icons';
import SearchableDropDownComponent from './SearchableDropDown';
import IntermediateCitiesComponent from './IntermediateCitiesInputs';
import { SingleDatepicker } from 'chakra-dayzed-datepicker';
import { useLocation, useNavigate } from 'react-router-dom';
import { calculateDistanceBetweenCities } from '../../helpers/endpoints';
import CalculateDistanceResponse from '../../data/types';
import CalculationResultsContext from '../../context/CalculationResultsContext/DistanceContext';

interface SearchFromProps {
    setTotalDistnceResult?: Function;
    total?: number;
    isLoading: boolean;
    setLoader: Function;
    setShowError: Function;
    formValues: Object;
    setFormValues: Function;
    formValidators: Object | any;
    setformValidators: Function;
    intermediateCitiesInputs: Map<string, Object>;
    setIntermediateCitiesInputs: Function;
}

interface CityData {
    cityName: string;
    lat: number;
    long: number;
}

const SearchForm: React.FC<SearchFromProps> = props => {
    const {
        setTotalDistnceResult,
        isLoading,
        setLoader,
        setShowError,
        intermediateCitiesInputs,
        setIntermediateCitiesInputs,
        formValidators,
        setformValidators,
        formValues,
        setFormValues,
    } = props;
    const { setBetweenCities } = useContext(CalculationResultsContext);
    const today = new Date();
    const navigate = useNavigate();
    const location = useLocation();
    const addIntermediateCityButtonRef = useRef<any>(null);

    const [date, setDate] = useState(new Date());

    const formik = useFormik({
        initialValues: formValues,
        onSubmit: values => {
            if (formik.isValid) {
                setLoader(true);
                setFormValues(values);
                //Submit logic here
                try {
                    let parsedCitiesArray: [[string, number, number]] | any = [];
                    document.querySelectorAll('input[data-city-selector]').forEach((el: any) => {
                        const cityData: CityData = JSON.parse(el.getAttribute('city-data'));
                        parsedCitiesArray.push([cityData.cityName, cityData.lat, cityData.long]);
                    });
                    calculateDistanceBetweenCities(parsedCitiesArray)
                        .then(
                            (result: CalculateDistanceResponse) => {
                                if (setTotalDistnceResult) {
                                    setBetweenCities(result.segmented);
                                    setTotalDistnceResult(result.total);
                                    setLoader(false);
                                }
                            },
                            reject => {
                                console.log('reject', reject);
                                setLoader(false);
                                setShowError(true);
                            },
                        )
                        .catch(err => {
                            console.log('This error is thrown when calcualtion goes bad', err);
                            setLoader(false);
                            setShowError(true);
                        });
                    if (location.pathname.includes('search') === false) {
                        const parsed: any = {};
                        Object.keys(values).forEach(current => {
                            parsed[current] = (values as any)[current];
                        });
    
                        parsed.citiesData = parsedCitiesArray;
    
                        const options = {
                            pathname: '/search',
                            search: `?${new URLSearchParams(parsed)}`,
                        };
                        navigate(options);
                    }
                } catch (error) {
                    console.log('An error took place', error);
                    formik.resetForm();
                    setShowError(true);
                    setLoader(false);
                }
            }
        },
        validationSchema: Yup.object(formValidators),
    });

    const passangersFieldProps = formik.getFieldProps('passangers');
    const departureDateFieldProps = formik.getFieldProps('departureDate');
    let { errors } = formik;
    let convertedErrors = errors as any;

    return (
        <Fragment>
            <Stack direction='row' spacing={4}>
                <Button
                    marginTop={'1rem'}
                    ref={addIntermediateCityButtonRef}
                    rightIcon={<FontAwesomeIcon icon={faCity} />}
                    colorScheme='teal'
                    variant='outline'>
                    Add an intermediate city
                </Button>
            </Stack>
            <Box p={6} rounded='md' w='100%'>
                <form
                    onSubmit={e => {
                        e.preventDefault();
                        formik.handleSubmit();
                    }}>
                    {/* <fieldset disabled={isLoading ? "disabled" : ""} > */}
                    <VStack spacing={4}>
                        {/* Start city destionation input */}
                        <FormControl isInvalid={convertedErrors?.startCity !== undefined} key={'startCity'}>
                            <SearchableDropDownComponent
                                formObject={formik}
                                formLabel={'Start city'}
                                fieldName='startCity'
                                hasRightIcon={false}
                                isInvalid={convertedErrors?.startCity !== undefined}
                                errorMessage={convertedErrors?.startCity}
                                data-city-selector
                            />
                        </FormControl>

                        {/* Render the dynamically added inputs */}
                        <IntermediateCitiesComponent
                            addInputButtonRef={addIntermediateCityButtonRef}
                            inputs={intermediateCitiesInputs}
                            setInputs={setIntermediateCitiesInputs}
                            formObject={formik}
                            setInputsValidation={setformValidators}
                            formValidationObject={formValidators}
                            formValues={formValues}
                            setFormValues={setFormValues}
                        />
                        {/* End of the dynamically added inputs or in between cities  */}

                        {/* Final city destionation input */}
                        <FormControl isInvalid={convertedErrors?.finalDestination !== undefined} key={'finalDestination'}>
                            <SearchableDropDownComponent
                                formObject={formik}
                                formLabel={'Destination'}
                                fieldName='finalDestination'
                                hasRightIcon={false}
                                isInvalid={convertedErrors?.finalDestination !== undefined}
                                errorMessage={convertedErrors?.finalDestination}
                                data-city-selector
                            />
                        </FormControl>

                        {/* Passaengers number input section */}
                        <Stack direction={['column', 'row']} spacing='24px' w='100%'>
                            <Box w='20%'>
                                <FormControl isInvalid={convertedErrors?.passangers !== undefined} key={'passanger'}>
                                    <FormLabel htmlFor='passanger'>Passangers</FormLabel>
                                    <NumberInput
                                        isInvalid={convertedErrors?.passangers !== undefined}
                                        defaultValue={1}
                                        isRequired={true}
                                        min={1}
                                        max={20}
                                        onChange={val => {
                                            formik.setFieldValue('passangers', val);
                                        }}>
                                        <NumberInputField {...passangersFieldProps} />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                    <FormErrorMessage>{convertedErrors?.passangers}</FormErrorMessage>
                                </FormControl>
                            </Box>

                            <Box w='30%'>
                                {/* DatePicker Here */}
                                <FormControl isInvalid={convertedErrors?.departureDate !== undefined} key={'departureDate'}>
                                    <FormLabel htmlFor='departureDate'>Day of travel</FormLabel>
                                    <SingleDatepicker
                                        date={date}
                                        onDateChange={e => {
                                            setDate(e);
                                        }}
                                        {...departureDateFieldProps}
                                        minDate={today}
                                    />
                                    <FormErrorMessage>{convertedErrors?.departureDate}</FormErrorMessage>
                                </FormControl>
                            </Box>
                        </Stack>
                        <Button isDisabled={formik.isValid === false} type='submit' colorScheme='teal' width='full'>
                            Submit {isLoading && <FontAwesomeIcon icon={faSpinner} spinPulse style={{ marginLeft: '5px' }} />}
                        </Button>
                    </VStack>
                    {/* </fieldset> */}
                </form>
            </Box>
        </Fragment>
    );
};

export default SearchForm;
