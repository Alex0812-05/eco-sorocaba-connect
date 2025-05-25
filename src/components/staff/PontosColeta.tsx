
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Clock, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PontosColetaProps {
  onBack: () => void;
}

const PontosColeta = ({ onBack }: PontosColetaProps) => {
  const pontosColeta = [
    {
      id: 1,
      nome: "FACENS - Campus Principal",
      endereco: "Rod. Senador José Ermírio de Moraes, 1425 - Alto da Boa Vista, Sorocaba",
      horario: "07:00 - 22:00",
      telefone: "(15) 3238-3000",
      tipos: ["Papel", "Plástico", "Metal", "Eletrônico"]
    },
    {
      id: 2,
      nome: "Ecoponto Vila Hortência",
      endereco: "Rua das Flores, 123 - Vila Hortência, Sorocaba",
      horario: "06:00 - 18:00",
      telefone: "(15) 3231-1234",
      tipos: ["Papel", "Plástico", "Vidro", "Metal"]
    },
    {
      id: 3,
      nome: "Centro de Reciclagem Zona Norte",
      endereco: "Av. Brasil, 456 - Zona Norte, Sorocaba",
      horario: "08:00 - 17:00",
      telefone: "(15) 3232-5678",
      tipos: ["Todos os tipos"]
    },
    {
      id: 4,
      nome: "Posto de Coleta Shopping",
      endereco: "Shopping Center Sorocaba - Av. Collor, 1000",
      horario: "10:00 - 22:00",
      telefone: "(15) 3233-9999",
      tipos: ["Papel", "Plástico", "Eletrônico"]
    }
  ];

  return (
    <div className="space-y-4">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Voltar
      </Button>

      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Pontos de Coleta</h2>
        <p className="text-gray-600">Locais disponíveis para descarte de resíduos</p>
      </div>

      <div className="grid gap-4">
        {pontosColeta.map((ponto) => (
          <Card key={ponto.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <MapPin className="h-5 w-5 text-primary" />
                {ponto.nome}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">{ponto.endereco}</p>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{ponto.horario}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{ponto.telefone}</span>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-1">Tipos aceitos:</p>
                <div className="flex flex-wrap gap-1">
                  {ponto.tipos.map((tipo, index) => (
                    <span
                      key={index}
                      className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs"
                    >
                      {tipo}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PontosColeta;
