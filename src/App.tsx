import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePageComponent from './pages/Home';
import SearchPageComponent from './pages/Search';
import CalculationResultsProvider from './context/CalculationResultsContext/DistanceContextProvider';
// I have to create a form context so data on the form can be rendered on both sides

const router = createBrowserRouter([
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
            <div className='App'>
                <div className='component-container'>
                    <RouterProvider router={router} />
                </div>
            </div>
        </CalculationResultsProvider>
    );
}

export default App;
