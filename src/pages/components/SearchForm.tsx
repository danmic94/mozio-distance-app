import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
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

interface SearchFromProps {}

const SearchForm: React.FC<SearchFromProps> = () => {
    const isLoading: boolean = false;
    const addIntermediateCityButtonRef = useRef<any>(null);
    const [intermediateCitiesInputs, setintermediateCitiesInputs] = useState<Map<string, Object>>(new Map());

    const formik = useFormik({
        initialValues: {
            startCity: '',
            finalDestination: '',
            passangers: 0,
        },
        onSubmit: values => {
            if (formik.isValid) {
                //Submit logic here
                console.log(values);
            }
        },
        validationSchema: Yup.object({
            startCity: Yup.string().required('Required'),
            finalDestination: Yup.string().required('Required'),
            passangers: Yup.number().required('Required'),
        }),
    });

    const finalDestinationFieldProps = formik.getFieldProps('finalDestination');
    const passangersFieldProps = formik.getFieldProps('passangers');

    useEffect(() => {
        //on the changed size of the inputs add validations in the formik object
        console.log(formik);

        intermediateCitiesInputs.forEach((inputComponent: any) => {
            const inputName: string = inputComponent.props.children.props.fieldName;
        });
    }, [intermediateCitiesInputs, intermediateCitiesInputs.size]);

    return (
        <VStack w='1024px' p={32} alignItems='flex-start'>
            <Heading as='h1' id='contactme-section'>
                <FontAwesomeIcon icon={faRoad} />
                Find out how many km will take...
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
                            />
                        </FormControl>

                        {/* Render the dynamically added inputs */}
                        <IntermediateCitiesComponent
                            addInputButtonRef={addIntermediateCityButtonRef}
                            inputs={intermediateCitiesInputs}
                            setInputs={setintermediateCitiesInputs}
                            formObject={formik}
                        />
                        {/* End of the dynamically added inputs or in between cities  */}

                        {/* Final city destionation input */}
                        <FormControl isInvalid={formik.errors.finalDestination !== undefined}>
                            <FormLabel htmlFor='email'>Final Destination</FormLabel>
                            <Input
                                disabled={isLoading}
                                id='finalDestination'
                                type='text'
                                placeholder='Type your destination here...'
                                {...finalDestinationFieldProps}
                            />
                            <FormErrorMessage>{formik.errors.finalDestination}</FormErrorMessage>
                        </FormControl>

                        {/* Passaengers number input section */}
                        <Stack direction={['column', 'row']} spacing='24px' w='100%'>
                            <Box w='20%'>
                                <FormControl isInvalid={formik.errors.passangers !== undefined}>
                                    <FormLabel htmlFor='passanger'>Number of passangers</FormLabel>
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

                            <Box>
                                <h3>Datepicker will be here</h3>
                                {/* DatePicker Here */}
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
