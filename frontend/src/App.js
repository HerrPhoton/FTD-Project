import {Routes, Route} from 'react-router-dom'
import IntroductionPanel from './components/IntroductionPanel';
import Slidebar from './components/Slidebar';
import './App.css';
import TestPanel from './components/TestPanel';
import LinksPanel from './components/LinksPanel';

function App() {
  return (
    <div>
      <header className="App-header">
        <Slidebar/>
        <Routes>
          <Route path='/*' element={<IntroductionPanel />}/>
          <Route path='/main' element={<IntroductionPanel />}/>
          <Route path='/links' element={<LinksPanel />}/>
          <Route path='/test' element={<TestPanel />}/>
        </Routes>
      </header>
    </div>
  );
}

export default App;
