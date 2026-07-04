import { createContext, useState } from "react";
import { LEVELS } from "../utils/constants.js";

// Contexto global del programa de fidelidad.
// Cualquier página/componente puede leer o modificar el saldo de "hojas" (puntos)
// desde aquí sin tener que pasar props manualmente (prop drilling).
export const LoyaltyContext = createContext(null);

export function LoyaltyProvider({ children }) {
  const [userName] = useState("Jeancarlo");
  const [points, setPoints] = useState(0);

  // Historial de movimientos: vacío al inicio, se llena a medida que el usuario gana o canjea
  const [history, setHistory] = useState([]);

  // Determina el nivel actual según el saldo de puntos
  const currentLevelIndex = LEVELS.findIndex(
    (lvl, i) =>
      points >= lvl.min && (i === LEVELS.length - 1 || points < LEVELS[i + 1].min)
  );
  const currentLevel = LEVELS[currentLevelIndex];
  const nextLevel = LEVELS[currentLevelIndex + 1] ?? null;

  // Suma puntos y registra el movimiento en el historial
  const addPoints = (amount, title) => {
    setPoints((prev) => prev + amount);
    setHistory((prev) => [
      { id: Date.now(), title, date: "Hoy", amount, type: "earned" },
      ...prev,
    ]);
  };

  // Resta puntos al canjear un cupón/recompensa
  const redeemPoints = (amount, title) => {
    if (amount > points) return false;
    setPoints((prev) => prev - amount);
    setHistory((prev) => [
      { id: Date.now(), title, date: "Hoy", amount: -amount, type: "redeemed" },
      ...prev,
    ]);
    return true;
  };

  const value = {
    userName,
    points,
    history,
    currentLevel,
    nextLevel,
    addPoints,
    redeemPoints,
  };

  return <LoyaltyContext.Provider value={value}>{children}</LoyaltyContext.Provider>;
}
