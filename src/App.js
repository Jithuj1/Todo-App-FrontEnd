import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './component/Home/home';
import Admin from './component/Admin/Admin';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />}></Route>
          <Route path="admin" element={<Admin />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
