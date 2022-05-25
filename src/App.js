import './App.css'
import AppRouter from './components/AppRouter'
import AuthContextProvider from './contexts/AuthContext'

function App() {

  document.body.style.overflowX = 'hidden'

  return (
    <AuthContextProvider>
      <AppRouter />
    </AuthContextProvider>
  );
}

export default App;
