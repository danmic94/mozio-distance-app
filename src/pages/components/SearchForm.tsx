import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
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
import { faCity, faRoad, faSpinner } from '@fortawesome/free-solid-svg-icons';
import SearchableDropDownComponent from './SearchableDropDown';
import IntermediateCitiesComponent from './IntermediateCitiesInputs';
import { SingleDatepicker } from 'chakra-dayzed-datepicker';

interface SearchFromProps {}

const SearchForm: React.FC<SearchFromProps> = () => {
    const today = new Date();
    const isLoading: boolean = false;
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
        departureDate: Yup.date().required('Required').typeError('Please enter a valid date!').min(today, 'Date is in the past!'),
    });

    const [date, setDate] = useState(new Date());

    const formik = useFormik({
        initialValues: formValues,
        onSubmit: values => {
            if (formik.isValid) {
                //Submit logic here
                console.log(values);
            }
        },
        validationSchema: Yup.object(formValidators),
    });

    const passangersFieldProps = formik.getFieldProps('passangers');
    useEffect(() => {
        console.log(formik.values, formik.errors);
    }, [formik.errors]);

    return (
        <VStack w='1024px' p={32} alignItems='flex-start'>
            <Heading as='h1' id='contactme-section'>
                <FontAwesomeIcon icon={faRoad} /> Find out how many km will take...
            </Heading>
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
                                isInvalid={formik.errors.startCity !== undefined}
                                errorMessage={formik.errors.startCity}
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
                                    <SingleDatepicker name='departureDate' date={date} onDateChange={setDate} />
                                    {/* <FormErrorMessage>{formik.errors.departureDate}</FormErrorMessage> */}
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
        </VStack>
    );
};

export default SearchForm;
