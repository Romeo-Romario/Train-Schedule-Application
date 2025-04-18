import HomePage from "./pages/HomePage/HomePage";
import MainPage from "./pages/MainPage/MainPage";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import ScheduleDetailPage from "./pages/ScheduleDetailPage/ScheduleDetailPage";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/main" element={<MainPage />}></Route>
          <Route path="/schedule" element={<ScheduleDetailPage />} />
          <Route path="/schedule/:index" element={<ScheduleDetailPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
