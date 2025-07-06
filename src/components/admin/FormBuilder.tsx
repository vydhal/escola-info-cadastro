
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Plus, Trash2, GripVertical, Save, Edit3 } from 'lucide-react';

interface FormField {
  id: string;
  type: 'text' | 'textarea' | 'email' | 'name' | 'number' | 'date' | 'select' | 'radio' | 'checkbox' | 'scale' | 'file' | 'url';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
  scaleMin?: number;
  scaleMax?: number;
  scaleLabels?: { min: string; max: string };
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

  // Carregar campos salvos
  useEffect(() => {
    const savedFields = localStorage.getItem('customFormFields');
    if (savedFields) {
      try {
        const parsedFields = JSON.parse(savedFields);
        setFields(parsedFields);
      } catch (error) {
        console.error('Erro ao carregar campos salvos:', error);
      }
    }
  }, []);

  const fieldTypes = [
    { value: 'text', label: 'Texto curto' },
    { value: 'textarea', label: 'Texto longo' },
    { value: 'email', label: 'E-mail' },
    { value: 'name', label: 'Nome' },
    { value: 'number', label: 'Número' },
    { value: 'date', label: 'Data' },
    { value: 'select', label: 'Lista suspensa (Dropdown)' },
    { value: 'radio', label: 'Múltipla escolha (Radio)' },
    { value: 'checkbox', label: 'Caixas de seleção (Checkbox)' },
    { value: 'scale', label: 'Escala de opinião/avaliação' },
    { value: 'file', label: 'Upload de arquivo' },
    { value: 'url', label: 'URL/Site' }
  ];

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
      options: newField.options,
      scaleMin: newField.scaleMin,
      scaleMax: newField.scaleMax,
      scaleLabels: newField.scaleLabels
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

  const addOption = (fieldId: string) => {
    const field = fields.find(f => f.id === fieldId);
    if (field) {
      const options = field.options || [];
      updateField(fieldId, { options: [...options, 'Nova opção'] });
    }
  };

  const updateOption = (fieldId: string, optionIndex: number, value: string) => {
    const field = fields.find(f => f.id === fieldId);
    if (field && field.options) {
      const newOptions = [...field.options];
      newOptions[optionIndex] = value;
      updateField(fieldId, { options: newOptions });
    }
  };

  const removeOption = (fieldId: string, optionIndex: number) => {
    const field = fields.find(f => f.id === fieldId);
    if (field && field.options) {
      const newOptions = field.options.filter((_, index) => index !== optionIndex);
      updateField(fieldId, { options: newOptions });
    }
  };

  const needsOptions = (type: string) => ['select', 'radio', 'checkbox'].includes(type);
  const needsScale = (type: string) => type === 'scale';

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
                        {fieldTypes.map(type => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
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

                {/* Opções para campos que precisam */}
                {needsOptions(field.type) && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Opções</Label>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => addOption(field.id)}
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        Adicionar
                      </Button>
                    </div>
                    {field.options?.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex gap-2">
                        <Input
                          value={option}
                          onChange={(e) => updateOption(field.id, optionIndex, e.target.value)}
                          placeholder={`Opção ${optionIndex + 1}`}
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeOption(field.id, optionIndex)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Configurações de escala */}
                {needsScale(field.type) && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <Label>Mín</Label>
                      <Input
                        type="number"
                        value={field.scaleMin || 1}
                        onChange={(e) => updateField(field.id, { scaleMin: parseInt(e.target.value) })}
                      />
                    </div>
                    <div>
                      <Label>Máx</Label>
                      <Input
                        type="number"
                        value={field.scaleMax || 5}
                        onChange={(e) => updateField(field.id, { scaleMax: parseInt(e.target.value) })}
                      />
                    </div>
                    <div>
                      <Label>Rótulo Mín</Label>
                      <Input
                        value={field.scaleLabels?.min || 'Ruim'}
                        onChange={(e) => updateField(field.id, { 
                          scaleLabels: { ...field.scaleLabels, min: e.target.value, max: field.scaleLabels?.max || 'Excelente' }
                        })}
                      />
                    </div>
                    <div>
                      <Label>Rótulo Máx</Label>
                      <Input
                        value={field.scaleLabels?.max || 'Excelente'}
                        onChange={(e) => updateField(field.id, { 
                          scaleLabels: { ...field.scaleLabels, max: e.target.value, min: field.scaleLabels?.min || 'Ruim' }
                        })}
                      />
                    </div>
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
                  {fieldTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
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
