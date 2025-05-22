
import React from 'react';

interface UserData {
  id: string;
  name: string;
  userType: string;
  points: number;
  correctDisposals: number;
  badges: number;
}

interface UserHeaderProps {
  userData: UserData;
}

const UserHeader = ({ userData }: UserHeaderProps) => {
  return (
    <div className="bg-primary text-white p-6 pt-12 rounded-b-3xl shadow-sm">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Olá, {userData.name}!</h1>
          <p className="opacity-90 mt-1">
            Bem-vindo ao SeleCollect 
            <span className="ml-1 px-2 py-0.5 bg-white bg-opacity-20 rounded-full text-xs">
              {userData.userType === "aluno" ? "Aluno" : "Funcionário"}
            </span>
          </p>
        </div>
        <div className="bg-white bg-opacity-20 p-3 rounded-full">
          <img 
            src="/lovable-uploads/85ff4149-89f6-4c10-94ff-c436f6800e69.png" 
            alt="SeleCollect Logo" 
            className="h-16 w-16" 
          />
        </div>
      </div>
      
      <div className="mt-6 bg-white bg-opacity-10 p-4 rounded-xl">
        <div className="flex justify-between">
          <div>
            <p className="text-sm opacity-90">Pontuação</p>
            <p className="text-2xl font-bold">{userData.points} pts</p>
          </div>
          <div>
            <p className="text-sm opacity-90">Descartes corretos</p>
            <p className="text-2xl font-bold">{userData.correctDisposals}</p>
          </div>
          <div>
            <p className="text-sm opacity-90">Badges</p>
            <p className="text-2xl font-bold">{userData.badges}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHeader;
