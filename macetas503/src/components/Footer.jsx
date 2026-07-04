import logo from "../assets/logo-monstera.png";

const COLUMNS = [
  {
    title: "Servicio al Cliente",
    items: ["Preguntas Frecuentes", "Contáctanos", "Reembolsos", "Garantía de 30 días"],
  },
  {
    title: "Macetas503",
    items: ["Mi Cuenta", "Nosotros", "Recompensas"],
  },
  {
    title: "Recursos",
    items: ["Mis Pedidos", "Guía de cuidado de plantas", "Programa de afiliados", "Regalos corporativos"],
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h4 className="font-semibold text-gray-800 mb-3">{col.title}</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              {col.items.map((item) => (
                <li key={item} className="hover:text-primary-600 cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Suscripción al newsletter */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-3">Mantente al Tanto</h4>
          <p className="text-sm text-gray-600 mb-3">
            Recibe consejos sobre plantas, ofertas exclusivas y un 10% de descuento en tu primera compra.
            Sin spam, lo prometemos.
          </p>
          <input
            type="email"
            placeholder="Ingresa tu correo..."
            className="w-full px-3 py-2 rounded border border-gray-300 text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <button className="w-full bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium py-2 rounded transition-colors">
            Suscribirse
          </button>
        </div>
      </div>

      <div className="border-t border-gray-300">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between text-xs text-gray-500">
          <img src={logo} alt="Macetas503" className="w-7 h-7 rounded-full bg-white p-0.5" />
          <span>© Copyright 2026 - Macetas503</span>
          <span className="flex gap-4">
            <a href="#">Términos de Uso</a>
            <a href="#">Política de Privacidad</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
