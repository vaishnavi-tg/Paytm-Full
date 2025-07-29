import { BrowserRouter, Routes, Route } from "react-router-dom"
import { SignIn } from "./pages/SignIn.jsx"
import { SignUp } from "./pages/SignUp.jsx"
import { Dashboard } from "./pages/Dashboard.jsx"
import { SendMoney } from "./pages/SendMoney.jsx"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<SendMoney />} />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
