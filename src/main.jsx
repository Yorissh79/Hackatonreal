// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router.jsx'; // Your router file
import { UserProvider } from './context/UserContext'; // Import UserProvider
import { Provider } from 'react-redux'; // If you're using Redux
import {store} from './redux/store'; // Your Redux store
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}> {/* If using Redux, keep it here or above UserProvider */}
            <UserProvider> {/* THIS IS THE CRUCIAL CHANGE: Wrap your entire application with UserProvider */}
                <RouterProvider router={router} />
            </UserProvider>
        </Provider>
    </React.StrictMode>,
);