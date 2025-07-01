// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router.jsx'; // Your router file
import { UserProvider } from './context/UserContext'; // Import UserProvider
import { Provider } from 'react-redux'; // If you're using Redux
import {store} from './redux/store'; // Your Redux store

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <UserProvider>
                <RouterProvider router={router} />
            </UserProvider>
        </Provider>
    </React.StrictMode>,
);