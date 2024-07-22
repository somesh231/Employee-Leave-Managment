import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './store/auth';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(<>
<AuthProvider>
  <App/>
  <ToastContainer/>
</AuthProvider>
</>,document.getElementById("root"))
