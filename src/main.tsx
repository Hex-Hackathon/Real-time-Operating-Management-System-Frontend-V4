
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import './satoshi.css';
import { Theme } from '@radix-ui/themes';
import { Provider } from 'react-redux';
import './style.css';
import { store } from './store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    
       <Theme>
        <Router>
          <App />
        </Router>
      </Theme>
    
  </Provider>,
);
