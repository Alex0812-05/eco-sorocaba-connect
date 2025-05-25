
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trophy, Medal, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RankingFuncionariosProps {
  onBack: () => void;
}

const RankingFuncionarios = ({ onBack }: RankingFuncionariosProps) => {
  const ranking = [
    { posicao: 1, nome: 'João Silva', descartes: 45, pontos: 1250, departamento: 'Administração' },
    { posicao: 2, nome: 'Maria Santos', descartes: 38, pontos: 1100, departamento: 'Tecnologia' },
    { posicao: 3, nome: 'Pedro Lima', descartes: 32, pontos: 980, departamento: 'Engenharia' },
    { posicao: 4, nome: 'Ana Costa', descartes: 28, pontos: 850, departamento: 'Marketing' },
    { posicao: 5, nome: 'Carlos Oliveira', descartes: 25, pontos: 720, departamento: 'Recursos Humanos' },
    { posicao: 6, nome: 'Fernanda Alves', descartes: 22, pontos: 650, departamento: 'Financeiro' },
    { posicao: 7, nome: 'Ricardo Souza', descartes: 20, pontos: 580, departamento: 'Operações' },
    { posicao: 8, nome: 'Juliana Pereira', descartes: 18, pontos: 520, departamento: 'Qualidade' },
  ];

  const getRankIcon = (posicao: number) => {
    switch (posicao) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-gray-500">{posicao}</span>;
    }
  };

  const getRankColor = (posicao: number) => {
    switch (posicao) {
      case 1:
        return 'bg-yellow-50 border-yellow-200';
      case 2:
        return 'bg-gray-50 border-gray-200';
      case 3:
        return 'bg-amber-50 border-amber-200';
      default:
        return 'bg-white border-gray-100';
    }
  };

  return (
    <div className="space-y-4">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Voltar
      </Button>

      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Ranking de Funcionários</h2>
        <p className="text-gray-600">Os funcionários com mais descartes registrados este mês</p>
      </div>

      <div className="space-y-3">
        {ranking.map((funcionario) => (
          <Card key={funcionario.posicao} className={`${getRankColor(funcionario.posicao)} transition-all hover:shadow-md`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center">
                    {getRankIcon(funcionario.posicao)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{funcionario.nome}</h3>
                    <p className="text-sm text-gray-600">{funcionario.departamento}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-2xl font-bold text-primary">{funcionario.descartes}</p>
                      <p className="text-xs text-gray-500">descartes</p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-green-600">{funcionario.pontos}</p>
                      <p className="text-xs text-gray-500">pontos</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Estatísticas do mês */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-center">Estatísticas do Mês</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-primary">156</p>
              <p className="text-sm text-gray-600">Total de Descartes</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">8.450</p>
              <p className="text-sm text-gray-600">Pontos Distribuídos</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">24</p>
              <p className="text-sm text-gray-600">Funcionários Ativos</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RankingFuncionarios;
