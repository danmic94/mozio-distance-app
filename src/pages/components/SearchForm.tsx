import React, { Fragment, useRef, useState } from 'react';
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

interface SearchFromProps {
    setTotalDistnceResult?: Function;
    total?: number;
    isLoading: boolean;
    setLoader: Function;
}

interface CityData {
    cityName: string;
    lat: number;
    long: number;
}

const SearchForm: React.FC<SearchFromProps> = props => {
    const { setTotalDistnceResult, isLoading, setLoader } = props;
    const today = new Date();
    const navigate = useNavigate();
    const location = useLocation();
    const addIntermediateCityButtonRef = useRef<any>(null);
    const [intermediateCitiesInputs, setintermediateCitiesInputs] = useState<Map<string, Object>>(new Map());
    const [formValues, setformValues] = useState({
        startCity: '',
        finalDestination: '',
        passangers: 1,
        departureDate: today,
    });
    const [formValidators, setformValidators] = useState({
        startCity: Yup.string().required('Required'),
        finalDestination: Yup.string().required('Required'),
        passangers: Yup.number().integer().min(1, 'Must have at least one passanger!').required('Required'),
        departureDate: Yup.date().min(today, 'Date is in the past!').required('Required!'),
    });

    const [date, setDate] = useState(new Date());

    const formik = useFormik({
        initialValues: formValues,
        onSubmit: values => {
            if (formik.isValid) {
                setLoader(true);
                //Submit logic here
                let parsedCitiesArray: [[string, number, number]] | any = [];
                document.querySelectorAll('input[data-city-selector]').forEach((el: any) => {
                    const cityData: CityData = JSON.parse(el.getAttribute('city-data'));
                    parsedCitiesArray.push([cityData.cityName, cityData.lat, cityData.long]);
                });
                calculateDistanceBetweenCities(parsedCitiesArray)
                    .then(
                        (result: CalculateDistanceResponse) => {
                            if (setTotalDistnceResult) {
                                setTotalDistnceResult(result.total);
                                setLoader(false);
                            }
                        },
                        reject => {
                            console.log('reject', reject);
                            setLoader(false);
                        },
                    )
                    .catch(err => {
                        console.log('This error is thrown when calcualtion goes bad', err);
                        setLoader(false);
                    });
                if (location.pathname.includes('search') === false) {
                    navigate('/search');
                }
            }
        },
        validationSchema: Yup.object(formValidators),
    });

    const passangersFieldProps = formik.getFieldProps('passangers');
    const departureDateFieldProps = formik.getFieldProps('departureDate');

    console.log(formik.errors);

    return (
        <Fragment>
            <Stack direction='row' spacing={4}>
                <Button
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
                        <FormControl isInvalid={formik.errors.startCity !== undefined}>
                            <SearchableDropDownComponent
                                formObject={formik}
                                formLabel={'Start city'}
                                fieldName='startCity'
                                hasRightIcon={false}
                                isInvalid={formik.errors.startCity !== undefined}
                                errorMessage={formik.errors.startCity}
                                data-city-selector
                            />
                        </FormControl>

                        {/* Render the dynamically added inputs */}
                        <IntermediateCitiesComponent
                            addInputButtonRef={addIntermediateCityButtonRef}
                            inputs={intermediateCitiesInputs}
                            setInputs={setintermediateCitiesInputs}
                            formObject={formik}
                            setInputsValidation={setformValidators}
                            formValidationObject={formValidators}
                            formValues={formValues}
                            setFormValues={setformValues}
                        />
                        {/* End of the dynamically added inputs or in between cities  */}

                        {/* Final city destionation input */}
                        <FormControl isInvalid={formik.errors.finalDestination !== undefined}>
                            <SearchableDropDownComponent
                                formObject={formik}
                                formLabel={'Destination'}
                                fieldName='finalDestination'
                                hasRightIcon={false}
                                isInvalid={formik.errors.finalDestination !== undefined}
                                errorMessage={formik.errors.finalDestination}
                                data-city-selector
                            />
                        </FormControl>

                        {/* Passaengers number input section */}
                        <Stack direction={['column', 'row']} spacing='24px' w='100%'>
                            <Box w='20%'>
                                <FormControl isInvalid={formik.errors.passangers !== undefined}>
                                    <FormLabel htmlFor='passanger'>Passangers</FormLabel>
                                    <NumberInput
                                        isInvalid={formik.errors.passangers !== undefined}
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
                                    <FormErrorMessage>{formik.errors.passangers}</FormErrorMessage>
                                </FormControl>
                            </Box>

                            <Box w='20%'>
                                {/* DatePicker Here */}
                                <FormControl isInvalid={formik.errors.departureDate !== undefined}>
                                    <FormLabel htmlFor='departureDate'>Day of travel</FormLabel>
                                    <SingleDatepicker
                                        date={date}
                                        onDateChange={e => {
                                            console.log(e);
                                            setDate(e);
                                        }}
                                        {...departureDateFieldProps}
                                        minDate={today}
                                    />
                                    {formik?.errors?.departureDate ? (
                                        <FormErrorMessage>{formik.errors.departureDate as string}</FormErrorMessage>
                                    ) : null}
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
