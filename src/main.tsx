import './index.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './components/app/app.tsx';
import store from './services/store.ts';


const rootElement = document.getElementById('root');

if (!rootElement) {
    throw new Error("Can't find 'root' element");
}

ReactDOM.createRoot(rootElement).render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
);
