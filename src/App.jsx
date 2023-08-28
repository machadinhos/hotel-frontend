import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import NaveBar from './components/NaveBar/index.jsx';


function App() {
    return (<>
        <Router>
            <h1 className="title">Hotel Management system</h1>
            <NaveBar/>
            <Routes>
                <Route path="/" element={<h1>Home</h1>}/>
                <Route path="/guests" element={<h1>Guests</h1>}/>
                <Route path="/rooms" element={<h1>Rooms</h1>}/>
            </Routes>
        </Router>
    </>);
}

export default App;
