
import React from "react";

const WasteTips = () => {
  return (
    <div className="mt-4 bg-secondary bg-opacity-10 p-4 rounded-xl">
      <h3 className="font-medium text-secondary mb-1">Dicas para descarte</h3>
      <ul className="text-sm list-disc list-inside text-gray-700">
        <li className="mb-1">Sempre lave as embalagens antes do descarte</li>
        <li className="mb-1">Separe tampas e rótulos de materiais diferentes</li>
        <li>Eletrônicos devem ir para pontos de coleta específicos</li>
      </ul>
    </div>
  );
};

export default WasteTips;
