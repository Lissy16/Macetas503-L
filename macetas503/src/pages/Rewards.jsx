import { useState } from "react";
import { Link } from "react-router";
import { useLoyalty } from "../hooks/useLoyalty.js";
import { usePagination } from "../hooks/usePagination.js";
import { formatNumber } from "../utils/constants.js";
import Tabs from "../components/Tabs.jsx";
import RewardCard from "../components/RewardCard.jsx";
import Pagination from "../components/Pagination.jsx";
import Button from "../components/Button.jsx";
import RedeemModal from "../components/RedeemModal.jsx";
import rewardPot from "../assets/product-succulent-pot.png";
import rewardMiniPots from "../assets/product-heart-mold.png";
import rewardBox from "../assets/product-tree-candles.png";
import rewardKit from "../assets/product-geo-vases.png";

const TABS = ["Cupones", "Productos", "Envíos Gratis"];

// Catálogo de recompensas por categoría (datos locales, sin backend)
const REWARDS_BY_TAB = {
  Cupones: [
    { id: 1, title: "10% OFF en macetas", description: "Aplica para cualquier maceta de nuestra colección artesanal.", cost: 300, image: rewardPot },
  ],
  Productos: [
    { id: 2, title: "Molde de Corazón Premium", description: "Molde de silicona para velas o jabones artesanales en forma de corazón.", cost: 800, image: rewardMiniPots },
    { id: 4, title: "Set de Floreros Geométricos", description: "Colección de floreros con textura tallada, ideales para plantas y flores secas.", cost: 950, image: rewardKit },
    { id: 5, title: "Velas Árbol de Temporada", description: "Set de velas aromáticas en forma de pino, perfectas para decorar tu hogar.", cost: 700, image: rewardBox },
  ],
  "Envíos Gratis": [
    { id: 3, title: "Envío Gratis", description: "Válido para cualquier pedido mayor a $10 en todo el territorio nacional.", cost: 200, image: rewardPot },
  ],
};

export default function Rewards() {
  const { points, currentLevel, redeemPoints } = useLoyalty();
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [redeemedIds, setRedeemedIds] = useState([]);
  const [modalReward, setModalReward] = useState(null);

  const rewards = REWARDS_BY_TAB[activeTab];
  const { page, totalPages, currentItems, nextPage, prevPage, goToPage } = usePagination(rewards, 3);

  const handleRedeem = (reward) => {
    const ok = redeemPoints(reward.cost, reward.title);
    if (ok) {
      setRedeemedIds((prev) => [...prev, reward.id]);
      setModalReward(reward);
    } else {
      alert("No tienes suficientes hojas para canjear esta recompensa.");
    }
  };

  return (
    <div>
      {/* Hero verde con nivel actual */}
      <div className="bg-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-10 flex items-center justify-between flex-wrap gap-4">
          <div>
            <span className="text-white/60 text-sm">Puntos de Lealtad</span>
            <h1 className="text-3xl font-bold">Recompensas</h1>
            <p className="text-white/70 mt-1">
              Estás en el nivel {currentLevel.name}. Tienes {rewards.length} recompensas disponibles.
            </p>
          </div>
          <Link to="/historial">
            <Button variant="gold">Ver Historial</Button>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <p className="text-sm text-gray-500 mb-4">
          Saldo actual: <span className="font-bold text-primary-700">{formatNumber(points)} hojas</span>
        </p>

        <Tabs
          tabs={TABS}
          active={activeTab}
          onChange={(tab) => {
            setActiveTab(tab);
            goToPage(1);
          }}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentItems.map((reward) => (
            <RewardCard
              key={reward.id}
              reward={reward}
              onRedeem={handleRedeem}
              redeemed={redeemedIds.includes(reward.id)}
            />
          ))}
        </div>

        {/* Sección "próximamente" al estilo del diseño original */}
        <div className="bg-primary-50 border border-dashed border-primary-200 rounded-xl mt-6 p-6 text-center">
          <p className="font-semibold text-primary-800">✨ ¡Próximamente más sorpresas!</p>
          <p className="text-sm text-primary-600 mt-1">
            Estamos trabajando para traerte más recompensas únicas cada mes.
          </p>
        </div>

        <Pagination page={page} totalPages={totalPages} onPrev={prevPage} onNext={nextPage} onGoTo={goToPage} />
      </div>

      <RedeemModal open={!!modalReward} reward={modalReward} onClose={() => setModalReward(null)} />
    </div>
  );
}
