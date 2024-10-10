import { Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Status from './components/Status/Status';

function App() {
  return (

    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/status' element={<Status />} />
    </Routes>

  );
}

export default App;
