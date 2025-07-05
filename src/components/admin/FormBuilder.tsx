
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Plus, Trash2, GripVertical, Save } from 'lucide-react';

interface FormField {
  id: string;
  type: 'text' | 'number' | 'select' | 'checkbox' | 'textarea';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
}

const FormBuilder = () => {
  const { toast } = useToast();
  const [fields, setFields] = useState<FormField[]>([
    {
      id: '1',
      type: 'select',
      label: 'Escola',
      required: true
    },
    {
      id: '2',
      type: 'number',
      label: 'Número de Salas de Aula',
      placeholder: 'Digite o número de salas',
      required: true
    },
    {
      id: '3',
      type: 'checkbox',
      label: 'Modalidades de Ensino',
      required: true,
      options: ['Anos iniciais', 'Anos Finais', 'EJA', 'Educação Infantil']
    }
  ]);

  const [newField, setNewField] = useState<Partial<FormField>>({
    type: 'text',
    label: '',
    required: false
  });

  const addField = () => {
    if (!newField.label) {
      toast({
        title: "Erro",
        description: "O campo precisa ter um rótulo.",
        variant: "destructive"
      });
      return;
    }

    const field: FormField = {
      id: Date.now().toString(),
      type: newField.type as FormField['type'],
      label: newField.label,
      placeholder: newField.placeholder,
      required: newField.required || false,
      options: newField.options
    };

    setFields(prev => [...prev, field]);
    setNewField({ type: 'text', label: '', required: false });
    
    toast({
      title: "Campo adicionado",
      description: "Novo campo foi adicionado ao formulário!",
    });
  };

  const removeField = (id: string) => {
    setFields(prev => prev.filter(field => field.id !== id));
    toast({
      title: "Campo removido",
      description: "Campo foi removido do formulário.",
    });
  };

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFields(prev => prev.map(field => 
      field.id === id ? { ...field, ...updates } : field
    ));
  };

  const saveForm = () => {
    localStorage.setItem('customFormFields', JSON.stringify(fields));
    toast({
      title: "Formulário salvo",
      description: "As alterações do formulário foram salvas com sucesso!",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Editor de Formulário</CardTitle>
          <CardDescription>
            Customize os campos do formulário de censo escolar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Campos Atuais</h3>
            
            {fields.map((field, index) => (
              <div key={field.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GripVertical className="w-4 h-4 text-gray-400" />
                    <span className="font-medium">Campo {index + 1}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeField(field.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>Rótulo</Label>
                    <Input
                      value={field.label}
                      onChange={(e) => updateField(field.id, { label: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Tipo</Label>
                    <Select
                      value={field.type}
                      onValueChange={(value) => updateField(field.id, { type: value as FormField['type'] })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text">Texto</SelectItem>
                        <SelectItem value="number">Número</SelectItem>
                        <SelectItem value="select">Seleção</SelectItem>
                        <SelectItem value="checkbox">Checkbox</SelectItem>
                        <SelectItem value="textarea">Área de Texto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2 pt-6">
                    <input
                      type="checkbox"
                      checked={field.required}
                      onChange={(e) => updateField(field.id, { required: e.target.checked })}
                    />
                    <Label>Obrigatório</Label>
                  </div>
                </div>
                
                {field.placeholder && (
                  <div>
                    <Label>Placeholder</Label>
                    <Input
                      value={field.placeholder}
                      onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Adicionar Novo Campo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Rótulo do Campo</Label>
              <Input
                value={newField.label || ''}
                onChange={(e) => setNewField(prev => ({ ...prev, label: e.target.value }))}
                placeholder="Ex: Nome da escola"
              />
            </div>
            <div>
              <Label>Tipo do Campo</Label>
              <Select
                value={newField.type}
                onValueChange={(value) => setNewField(prev => ({ ...prev, type: value as FormField['type'] }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Texto</SelectItem>
                  <SelectItem value="number">Número</SelectItem>
                  <SelectItem value="select">Seleção</SelectItem>
                  <SelectItem value="checkbox">Checkbox</SelectItem>
                  <SelectItem value="textarea">Área de Texto</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label>Placeholder (Opcional)</Label>
            <Input
              value={newField.placeholder || ''}
              onChange={(e) => setNewField(prev => ({ ...prev, placeholder: e.target.value }))}
              placeholder="Texto de ajuda para o usuário"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={newField.required || false}
              onChange={(e) => setNewField(prev => ({ ...prev, required: e.target.checked }))}
            />
            <Label>Campo obrigatório</Label>
          </div>
          
          <div className="flex gap-3">
            <Button onClick={addField}>
              <Plus className="mr-2 w-4 h-4" />
              Adicionar Campo
            </Button>
            <Button onClick={saveForm} variant="outline">
              <Save className="mr-2 w-4 h-4" />
              Salvar Formulário
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormBuilder;
