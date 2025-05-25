
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CadastroDescarteProps {
  onBack: () => void;
}

const CadastroDescarte = ({ onBack }: CadastroDescarteProps) => {
  const [formData, setFormData] = useState({
    userId: '',
    wasteType: '',
    quantity: '',
    location: ''
  });
  const { toast } = useToast();

  const wasteTypes = [
    { id: 'paper', name: 'Papel/Papelão', points: 10 },
    { id: 'plastic', name: 'Plástico', points: 15 },
    { id: 'glass', name: 'Vidro', points: 20 },
    { id: 'metal', name: 'Metal', points: 25 },
    { id: 'organic', name: 'Orgânico', points: 5 },
    { id: 'electronic', name: 'Eletrônico', points: 30 },
    { id: 'hazardous', name: 'Perigoso', points: 15 }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.userId || !formData.wasteType || !formData.quantity) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }

    // Simulate registration success
    const selectedWaste = wasteTypes.find(w => w.id === formData.wasteType);
    const points = selectedWaste ? selectedWaste.points * parseInt(formData.quantity) : 0;

    toast({
      title: "Descarte registrado com sucesso!",
      description: `${points} pontos atribuídos ao usuário`,
    });

    // Reset form
    setFormData({
      userId: '',
      wasteType: '',
      quantity: '',
      location: ''
    });
  };

  return (
    <div className="space-y-4">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Voltar
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Check className="h-5 w-5 text-primary" />
            Cadastrar Descarte
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="userId">ID do Usuário *</Label>
              <Input
                id="userId"
                type="text"
                placeholder="Digite o ID do usuário"
                value={formData.userId}
                onChange={(e) => setFormData({...formData, userId: e.target.value})}
              />
            </div>

            <div>
              <Label>Tipo de Resíduo *</Label>
              <Select value={formData.wasteType} onValueChange={(value) => setFormData({...formData, wasteType: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo de resíduo" />
                </SelectTrigger>
                <SelectContent>
                  {wasteTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name} ({type.points} pts)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="quantity">Quantidade *</Label>
              <Input
                id="quantity"
                type="number"
                placeholder="Quantidade de itens"
                min="1"
                value={formData.quantity}
                onChange={(e) => setFormData({...formData, quantity: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="location">Local do Descarte</Label>
              <Input
                id="location"
                type="text"
                placeholder="Local onde foi realizado o descarte"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              />
            </div>

            <Button type="submit" className="w-full">
              Registrar Descarte
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CadastroDescarte;
