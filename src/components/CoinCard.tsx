import React from 'react';
import { Scene3D } from './3d/Scene3D';
import { Coin } from './3d/animations/Coin';

interface CoinCardProps {
  onClick?: () => void;
}

const CoinCard: React.FC<CoinCardProps> = ({ onClick }) => {
  return (
    <div 
      className="relative rounded-md cursor-pointer bg-white/10 card p-[1px]"
      onClick={onClick}
    >
      <div className="flex z-[2] bg-[#171717] aspect-square relative rounded-t-md">
        <Scene3D>
          <Coin />
        </Scene3D>
      </div>

      <div className="relative z-20 flex items-center mt-[1px] justify-between w-full px-4 py-2 bg-[#171717] rounded-b-md">
        <span className="w-1 h-1 rounded-full bg-white/20"></span>
        <span className="">Coins</span>
        <span className="w-1 h-1 rounded-full bg-white/20"></span>
      </div>

      <div
        className="absolute top-0 left-0 w-full h-full transition-opacity duration-500 rounded-md opacity-0 group-hover:opacity-100 z-1"
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y),rgba(255, 255, 255, 0.3),transparent 40%)`,
        }}
      ></div>
    </div>
  );
};

export default CoinCard;