
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText, Calendar, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface RelatoriosDescarteProps {
  onBack: () => void;
}

const RelatoriosDescarte = ({ onBack }: RelatoriosDescarteProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState('mes');

  const dadosDescarte = [
    { data: '2024-01-15', usuario: 'João Silva', tipo: 'Papel', quantidade: 5, pontos: 50, local: 'FACENS' },
    { data: '2024-01-14', usuario: 'Maria Santos', tipo: 'Plástico', quantidade: 3, pontos: 45, local: 'Ecoponto Vila' },
    { data: '2024-01-14', usuario: 'Pedro Lima', tipo: 'Metal', quantidade: 2, pontos: 50, local: 'Centro Reciclagem' },
    { data: '2024-01-13', usuario: 'Ana Costa', tipo: 'Vidro', quantidade: 4, pontos: 80, local: 'FACENS' },
    { data: '2024-01-13', usuario: 'Carlos Oliveira', tipo: 'Eletrônico', quantidade: 1, pontos: 30, local: 'Shopping' },
  ];

  const estatisticas = {
    totalDescartes: 156,
    totalPontos: 3420,
    tipoMaisDescartado: 'Papel',
    funcionarioDestaque: 'João Silva'
  };

  return (
    <div className="space-y-4">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Voltar
      </Button>

      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Relatórios de Descarte</h2>
        <p className="text-gray-600">Acompanhe os descartes realizados e estatísticas</p>
      </div>

      {/* Estatísticas Resumidas */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{estatisticas.totalDescartes}</p>
                <p className="text-sm text-gray-600">Total de Descartes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{estatisticas.totalPontos}</p>
                <p className="text-sm text-gray-600">Pontos Distribuídos</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Descartes Recentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="flex gap-2">
              <Button
                variant={selectedPeriod === 'semana' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedPeriod('semana')}
              >
                Última Semana
              </Button>
              <Button
                variant={selectedPeriod === 'mes' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedPeriod('mes')}
              >
                Último Mês
              </Button>
              <Button
                variant={selectedPeriod === 'ano' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedPeriod('ano')}
              >
                Último Ano
              </Button>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Usuário</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Qtd</TableHead>
                <TableHead>Pontos</TableHead>
                <TableHead>Local</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dadosDescarte.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{new Date(item.data).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell>{item.usuario}</TableCell>
                  <TableCell>{item.tipo}</TableCell>
                  <TableCell>{item.quantidade}</TableCell>
                  <TableCell>{item.pontos}</TableCell>
                  <TableCell>{item.local}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default RelatoriosDescarte;
