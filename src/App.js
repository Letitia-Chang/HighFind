import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "../src/views/Home"
import Jobs from "../src/views/Jobs"
import Job from "../src/views/Job"
import Companies from "../src/views/Companies"
import Company from "../src/views/Company"
import Events from "../src/views/Events"
import Event from "../src/views/Event"
// import Test from "../src/views/Test"
import Navbar from "../src/components/Navbar"
import Footer from "../src/components/Footer"


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="contents">
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/jobs' element={<Jobs />} />
            <Route exact path="/job/:id" element={<Job />} />
            <Route exact path='/companies' element={<Companies />} />
            <Route exact path="/company/:id" element={<Company />} />
            <Route exact path="/events" element={<Events />} />
            <Route exact path="/event/:id" element={<Event />} />
            {/* <Route exact path="/test" element={<Test />} /> */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
