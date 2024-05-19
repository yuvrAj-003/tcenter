import Customizer from "./pages/Customizer";
import { useSnapshot } from "valtio";
import state from "./config/store";
import { Loading, ErrorMessage, SuccessDisplay } from "./components";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Payment from "./pages/Payment";
import View from "./pages/View";
import NoPage from "./pages/NoPage";
function App() {
  // check network connection
  const snap = useSnapshot(state);
  // check online
  window.addEventListener("offline", () => (state.isOnline = false));
  window.addEventListener("online", () => (state.isOnline = true));

  return (
    <div>
      {!snap.isOnline && <ErrorMessage msg="network error" />}
      {snap.isOnline && snap.isLoading && <Loading />}
      {snap.isOnline && snap.error.exists && (
        <ErrorMessage msg={snap.error.name} />
      )}
      {snap.isOnline && snap.success.exists && (
        <SuccessDisplay msg={snap.success.name} />
      )}

      <Router>
        <Routes>
          <Route path="/*" element={<NoPage />} />
          <Route path="/nopage" element={<NoPage />} />
          <Route path="/:id" element={<Customizer />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/view/:id" element={<View />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
