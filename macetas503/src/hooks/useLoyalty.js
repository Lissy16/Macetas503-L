import { useContext } from "react";
import { LoyaltyContext } from "../context/LoyaltyContext.jsx";

// Custom hook: evita importar useContext + LoyaltyContext en cada página
export function useLoyalty() {
  const ctx = useContext(LoyaltyContext);
  if (!ctx) {
    throw new Error("useLoyalty debe usarse dentro de un <LoyaltyProvider>");
  }
  return ctx;
}
