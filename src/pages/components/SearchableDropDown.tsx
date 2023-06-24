import React, { Fragment, useEffect, useState } from 'react';
import { FormErrorMessage, FormLabel, InputGroup, InputLeftElement, InputRightElement, Spinner } from '@chakra-ui/react';
import { AutoComplete, AutoCompleteInput, AutoCompleteItem, AutoCompleteList } from '@choc-ui/chakra-autocomplete';
import { searchCity } from '../../helpers/endpoints';

interface SearchableDropDownProps {
    formObject: any;
    fieldName: string;
    formLabel: string | null;
    hasRightIcon: boolean;
    rightIcon?: any;
    iconClickHandler?: Function;
    inputIdentifier?: number | string;
    isInvalid: boolean;
    errorMessage?: string | null;
}

const SearchableDropDownComponent: React.FC<SearchableDropDownProps> = props => {
    const { formObject, fieldName, formLabel, hasRightIcon, rightIcon, iconClickHandler, inputIdentifier, isInvalid, errorMessage } = props;
    const [citiesList, setcitiesList] = useState<[][]>([]);
    const [inputIsLoading, setinputIsLoading] = useState<boolean>(false);

    const handleDordownSearch = (searchTermn: string) => {
        searchCity(searchTermn).then(
            (citiesResults: []) => {
                setcitiesList(citiesResults);
                setinputIsLoading(false);
            },
            () => {
                console.log('failure here');
                setinputIsLoading(false);
            },
        );
    };

    return (
        <Fragment>
            <FormLabel htmlFor={fieldName}>{formLabel}</FormLabel>
            <AutoComplete
                openOnFocus
                restoreOnBlurIfEmpty={false}
                onSelectOption={data => {
                    formObject.setFieldValue(fieldName, data.item.value);
                }}>
                <InputGroup>
                    <AutoCompleteInput
                        name={fieldName}
                        isInvalid={isInvalid}
                        onBlurCapture={e => formObject.setFieldValue(fieldName, e.target.value)}
                        onFocusCapture={e => formObject.setFieldValue(fieldName, e.target.value)}
                        onChange={e => {
                            const value = e.target.value;
                            formObject.setFieldValue(fieldName, e.target.value);
                            if (value !== '' && value.length > 0) {
                                setinputIsLoading(true);
                                handleDordownSearch(value.trim());
                            }
                        }}
                        placeholder='Search for a city...'
                    />
                    {hasRightIcon && (
                        <InputRightElement
                            cursor={'pointer'}
                            onClick={e => typeof iconClickHandler === 'function' && iconClickHandler(e)}
                            children={rightIcon}
                            {...{ 'intermediate-city-id': `${inputIdentifier}` }}
                        />
                    )}
                    {inputIsLoading && <InputLeftElement children={<Spinner color='red.500' />} />}
                </InputGroup>
                {citiesList && (
                    <AutoCompleteList>
                        {citiesList.map((city: any) => (
                            <AutoCompleteItem key={`option-${city[0]}`} value={`${city[0]}`} textTransform='capitalize'>
                                {city[0]}
                            </AutoCompleteItem>
                        ))}
                    </AutoCompleteList>
                )}
            </AutoComplete>
            {isInvalid && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
        </Fragment>
    );
};

export default SearchableDropDownComponent;
