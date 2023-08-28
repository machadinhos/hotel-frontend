import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';


function App() {
    return (<>
        <Router>
            <h1>App</h1>
            <Routes>
                <Route path="/" element={<p>Home</p>}/>
                <Route path="/about" element={<p>About</p>}/>
            </Routes>
        </Router>
    </>);
}

export default App;
