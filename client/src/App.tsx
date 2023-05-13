import LoginForm from './components/LoginForm';
import { Routes, Route } from 'react-router-dom';
import Products from './components/Products';

function App() {
  return (
    <Routes>
      {/* public routes */}
      <Route path='/' element={<LoginForm />} />
      <Route path='/products' element={<Products />} />
    </Routes>
  );
}

export default App;
