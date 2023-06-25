import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/react';
import { useEffect } from 'react';

interface ErrorAlertProps {
    showError: boolean;
    setShowError: Function;
}

const ErrorAlertComponent: React.FC<ErrorAlertProps> = props => {
    const { showError, setShowError } = props;

    async function hideError() {
        await new Promise(resolve => setTimeout(resolve, 3000));
        setShowError(false);
        return null;
    }

    useEffect(() => {
        if (showError) {
            hideError();
        }
    }, [showError]);

    return (
        <Alert hidden={showError === false} status='error'>
            <AlertIcon />
            <AlertTitle>Something went wrong on the server side!</AlertTitle>
            <AlertDescription>Sorry for the inconvenince 🤷.</AlertDescription>
        </Alert>
    );
};

export default ErrorAlertComponent;
