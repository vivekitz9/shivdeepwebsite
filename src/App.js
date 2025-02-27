import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MemberForm from "./pages/memberCards/MemberForm";
import OtpPage from "./pages/memberCards/OtpPage";
import Error from "./pages/Error";
import MemberCard from "./pages/memberCards/MemberCard";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import MissionAndVision from "./pages/MissionAndVision";
import ContactUs from "./pages/ContactUs";
import { useNavigate } from "react-router-dom";

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route>
//       <Route path="/" exact element={<ContactUs />} />
//       <Route path="/card" element={<MemberCard />} />
//       <Route path="/otp" element={<OtpPage />} />
//       <Route path="/privacy-policy" element={<PrivacyPolicy />} />
//       <Route path="/terms-conditions" element={<TermsConditions />} />
//       <Route path="/mission-vision" element={<MissionAndVision />} />
//       <Route path="/contactUs" element={<ContactUs />} />
//       <Route path="*" element={<Error />} />
//     </Route>
//   )
// );

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="*" element={<Error to="/notfound" replace />} />
          <Route path="/" exact element={<ContactUs />} />
          <Route path="card" element={<MemberCard />} />
          <Route path="/otp" element={<OtpPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms-conditions" element={<TermsConditions />} />
          <Route path="/mission-vision" element={<MissionAndVision />} />
          <Route path="/contactUs" element={<ContactUs />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
