import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';
import { store } from './redux/store';

const element = document.getElementById('root');

if (element) {
   const root = ReactDOM.createRoot(element);

   root.render(
      <BrowserRouter>
         <Provider store={store}>
            <App />
         </Provider>
      </BrowserRouter>,
   );
}
