import './App.css';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import HomePageComponent from './pages/Home';
import SearchPageComponent from './pages/Search';
import CalculationResultsProvider from './context/CalculationResultsContext/DistanceContextProvider';
import FormContextProvider from './context/FormContext/FormContextProvider';
// I have to create a form context so data on the form can be rendered on both sides

const router = createHashRouter([
    {
        path: '/',
        element: <HomePageComponent />,
    },
    {
        path: '/search',
        element: <SearchPageComponent />,
    },
]);

function App() {
    return (
        <CalculationResultsProvider>
            <FormContextProvider>
                <div className='App'>
                    <div className='component-container'>
                        <RouterProvider router={router} />
                    </div>
                </div>
            </FormContextProvider>
        </CalculationResultsProvider>
    );
}

export default App;
