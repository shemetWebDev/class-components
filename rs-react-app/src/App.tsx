import Header from './components/Header';
import Main from './components/Main';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <Header />
      <Main />
    </ErrorBoundary>
  );
}

export default App;
