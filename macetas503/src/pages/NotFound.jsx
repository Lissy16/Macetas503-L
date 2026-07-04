import { Link } from "react-router";
import Button from "../components/Button.jsx";

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24 text-center">
      <h1 className="text-4xl font-bold text-primary-800">404</h1>
      <p className="text-gray-500 mt-2">Esta página no existe.</p>
      <Link to="/">
        <Button className="mt-6">Volver al inicio</Button>
      </Link>
    </div>
  );
}
