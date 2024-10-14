import { Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Status from './components/Status/Status';
import StatusViewer from './components/Status/StatusViewer';
import SignIn from './components/RegisterForm/SignIn';
import SignUp from './components/RegisterForm/SignUp';

function App() {
  return (

    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/status' element={<Status />} />
      <Route path='/status/:userId' element={<StatusViewer />} />
      <Route path='/signin' element={<SignIn />} />
      <Route path='/signup' element={<SignUp />} />
    </Routes>

  );
}

export default App;
