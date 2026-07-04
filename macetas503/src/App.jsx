import { BrowserRouter as Router } from "react-router";
import AnimatedRoutes from "./components/AnimatedRoutes.jsx";
import AdminLayout from "./components/AdminLayout.jsx";
import Home from "./pages/Home.jsx";
import EarnPoints from "./pages/EarnPoints.jsx";
import Rewards from "./pages/Rewards.jsx";
import History from "./pages/History.jsx";
import Coupons from "./pages/Coupons.jsx";
import NotFound from "./pages/NotFound.jsx";
import { Toaster } from "sonner";
import { LoyaltyProvider } from "./context/LoyaltyContext.jsx";

const appRoutes = [
  {
    element: <AdminLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/ganar-puntos", element: <EarnPoints /> },
      { path: "/recompensas", element: <Rewards /> },
      { path: "/historial", element: <History /> },
      { path: "/cupones", element: <Coupons /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];

function App() {
  return (
    <Router>
      {/* expone puntos, nivel e historial*/}
      <LoyaltyProvider>
        <div className="min-h-screen">
          <main className="w-full">
            <AnimatedRoutes routes={appRoutes} />
          </main>
          <Toaster
            position="top-right"
            richColors
            theme="dark"
            toastOptions={{
              style: {
                background: "#161616",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#ffffff",
              },
            }}
          />
        </div>
      </LoyaltyProvider>
    </Router>
  );
}

export default App;
