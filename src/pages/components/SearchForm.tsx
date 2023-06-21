import React from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import * as Yup from 'yup';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRoad, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { AutoComplete, AutoCompleteInput, AutoCompleteItem, AutoCompleteList } from "@choc-ui/chakra-autocomplete";
import citiesJSON from "../../data/cities.json";

interface SearchFromProps {}

const SearchForm: React.FC<SearchFromProps> = () => {
    const isLoading: boolean = false;
    
    const formik = useFormik({
        initialValues: {
          startCity: '',
          finalDestination: ''
        },
        onSubmit: (values) => {
          if (formik.isValid) {
            //Submit logic here
          }
        },
        validationSchema: Yup.object({
          startCity: Yup.string().required('Required'),
          finalDestination: Yup.string().required('Required'),
        }),
      });
    
    const finalDestinationFieldProps = formik.getFieldProps('finalDestination');
      
  return (
    <VStack w="1024px" p={32} alignItems="flex-start">
    <Heading as="h1" id="contactme-section">
     <FontAwesomeIcon icon={faRoad} /> Find out how many km will take...
    </Heading>
    <Box p={6} rounded="md" w="100%">
      <form onSubmit={(e) => {
        e.preventDefault();
        formik.handleSubmit()
      }}>
        {/* <fieldset disabled={isLoading ? "disabled" : ""} > */}
        <VStack spacing={4}>
          <FormControl>
          <FormErrorMessage>{formik.errors.startCity}</FormErrorMessage>
            <FormLabel >Origin city</FormLabel>
                <AutoComplete
                  openOnFocus
                  restoreOnBlurIfEmpty={false} 
                  onSelectOption={(data) => {formik.setFieldValue('startCity', data.item.value)}} >
                    <AutoCompleteInput
                            name="startCity"
                            isInvalid={formik.errors.startCity !== undefined}
                            aria-errormessage={`${formik.errors.startCity}`}
                            onBlurCapture={(e) => formik.setFieldValue('startCity', e.target.value)}
                            placeholder="Search..."
                    />
                        <AutoCompleteList>
                            {citiesJSON.map((city) => (
                                <AutoCompleteItem
                                    key={`option-${city[0]}`}
                                    value={`${city[0]}`}
                                    textTransform="capitalize"
                                >
                                    {city[0]}
                                </AutoCompleteItem>
                            ))}
                        </AutoCompleteList>
                </AutoComplete>
            </FormControl>
            <FormControl isInvalid={formik.errors.finalDestination !== undefined}>
              <FormLabel htmlFor="email">Final Destination</FormLabel>
              <Input
                disabled={isLoading}
                id="finalDestination"
                type="text"
                placeholder="Type your destination here..."
                {...finalDestinationFieldProps}
              />
              <FormErrorMessage>{formik.errors.finalDestination}</FormErrorMessage>
            </FormControl>
            <Button isDisabled={formik.isValid === false} type="submit" colorScheme="purple" width="full">
              Submit  {isLoading && <FontAwesomeIcon icon={faSpinner} spinPulse style={ {marginLeft: '5px'}} />}
            </Button>
          </VStack>
        {/* </fieldset> */}
      </form>
    </Box>
  </VStack>
  );
};

export default SearchForm;

