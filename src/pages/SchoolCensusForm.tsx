
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { SchoolCensusForm as FormType, Classroom, Technology } from "@/types/school";
import schoolsData from "@/data/schools.json";

const SchoolCensusFormPage = () => {
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<FormType>({
    selectedSchool: null,
    classroomsCount: 0,
    classrooms: [],
    teachingModalities: [],
    technology: {
      roboticsKits: 0,
      chromebooks: 0,
      notebooks: 0,
      modems: 0,
      printers: 0,
      defectiveModems: 0,
      hasSchoolInternet: false
    }
  });

  const teachingModalitiesOptions = [
    "Anos iniciais",
    "Anos Finais", 
    "EJA",
    "Integral",
    "Bilingue"
  ];

  const handleSchoolSelect = (inep: string) => {
    const school = schoolsData.find(s => s.inep === inep);
    setFormData(prev => ({ ...prev, selectedSchool: school || null }));
  };

  const handleClassroomsCountChange = (count: number) => {
    const newClassrooms: Classroom[] = Array.from({ length: count }, (_, index) => ({
      id: `classroom-${index + 1}`,
      outlets: 0,
      tvs: 0,
      hasInternet: false,
      chairs: 0,
      studentCapacity: 0,
      hasAirConditioning: false,
      fans: 0
    }));

    setFormData(prev => ({
      ...prev,
      classroomsCount: count,
      classrooms: newClassrooms
    }));
  };

  const updateClassroom = (index: number, field: keyof Classroom, value: any) => {
    setFormData(prev => ({
      ...prev,
      classrooms: prev.classrooms.map((classroom, i) => 
        i === index ? { ...classroom, [field]: value } : classroom
      )
    }));
  };

  const handleModalityChange = (modality: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      teachingModalities: checked
        ? [...prev.teachingModalities, modality]
        : prev.teachingModalities.filter(m => m !== modality)
    }));
  };

  const updateTechnology = (field: keyof Technology, value: any) => {
    setFormData(prev => ({
      ...prev,
      technology: { ...prev.technology, [field]: value }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.selectedSchool) {
      toast({
        title: "Erro",
        description: "Por favor, selecione uma escola.",
        variant: "destructive"
      });
      return;
    }

    // Aqui você salvaria os dados no backend/localStorage
    console.log("Dados do formulário:", formData);
    
    toast({
      title: "Sucesso!",
      description: "Censo escolar cadastrado com sucesso.",
    });
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Formulário de Censo Escolar</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Seleção da Escola */}
        <Card>
          <CardHeader>
            <CardTitle>Dados da Unidade Escolar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="school-select">Selecione a Escola</Label>
                <Select onValueChange={handleSchoolSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="Escolha uma escola..." />
                  </SelectTrigger>
                  <SelectContent>
                    {schoolsData.map((school) => (
                      <SelectItem key={school.inep} value={school.inep}>
                        {school.name} - INEP: {school.inep}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {formData.selectedSchool && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p><strong>Escola:</strong> {formData.selectedSchool.name}</p>
                  <p><strong>INEP:</strong> {formData.selectedSchool.inep}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quantidade de Salas */}
        <Card>
          <CardHeader>
            <CardTitle>Salas de Aula</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="classrooms-count">Quantidade de Salas de Aula</Label>
                <Input
                  id="classrooms-count"
                  type="number"
                  min="0"
                  max="50"
                  value={formData.classroomsCount}
                  onChange={(e) => handleClassroomsCountChange(parseInt(e.target.value) || 0)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cards das Salas */}
        {formData.classrooms.map((classroom, index) => (
          <Card key={classroom.id}>
            <CardHeader>
              <CardTitle>Sala {index + 1}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label>Número de Tomadas</Label>
                  <Input
                    type="number"
                    min="0"
                    value={classroom.outlets}
                    onChange={(e) => updateClassroom(index, 'outlets', parseInt(e.target.value) || 0)}
                  />
                </div>
                
                <div>
                  <Label>Quantidade de TVs</Label>
                  <Input
                    type="number"
                    min="0"
                    value={classroom.tvs}
                    onChange={(e) => updateClassroom(index, 'tvs', parseInt(e.target.value) || 0)}
                  />
                </div>
                
                <div>
                  <Label>Número de Cadeiras</Label>
                  <Input
                    type="number"
                    min="0"
                    value={classroom.chairs}
                    onChange={(e) => updateClassroom(index, 'chairs', parseInt(e.target.value) || 0)}
                  />
                </div>
                
                <div>
                  <Label>Capacidade de Estudantes</Label>
                  <Input
                    type="number"
                    min="0"
                    value={classroom.studentCapacity}
                    onChange={(e) => updateClassroom(index, 'studentCapacity', parseInt(e.target.value) || 0)}
                  />
                </div>
                
                <div>
                  <Label>Quantidade de Ventiladores</Label>
                  <Input
                    type="number"
                    min="0"
                    value={classroom.fans}
                    onChange={(e) => updateClassroom(index, 'fans', parseInt(e.target.value) || 0)}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`internet-${index}`}
                      checked={classroom.hasInternet}
                      onCheckedChange={(checked) => updateClassroom(index, 'hasInternet', checked)}
                    />
                    <Label htmlFor={`internet-${index}`}>Tem Internet</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`ac-${index}`}
                      checked={classroom.hasAirConditioning}
                      onCheckedChange={(checked) => updateClassroom(index, 'hasAirConditioning', checked)}
                    />
                    <Label htmlFor={`ac-${index}`}>Tem Ar Condicionado</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Modalidades de Ensino */}
        <Card>
          <CardHeader>
            <CardTitle>Modalidades de Ensino</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {teachingModalitiesOptions.map((modality) => (
                <div key={modality} className="flex items-center space-x-2">
                  <Checkbox
                    id={`modality-${modality}`}
                    checked={formData.teachingModalities.includes(modality)}
                    onCheckedChange={(checked) => handleModalityChange(modality, checked as boolean)}
                  />
                  <Label htmlFor={`modality-${modality}`}>{modality}</Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tecnologia */}
        <Card>
          <CardHeader>
            <CardTitle>Recursos Tecnológicos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label>Kits de Robótica</Label>
                <Input
                  type="number"
                  min="0"
                  value={formData.technology.roboticsKits}
                  onChange={(e) => updateTechnology('roboticsKits', parseInt(e.target.value) || 0)}
                />
              </div>
              
              <div>
                <Label>Chromebooks</Label>
                <Input
                  type="number"
                  min="0"
                  value={formData.technology.chromebooks}
                  onChange={(e) => updateTechnology('chromebooks', parseInt(e.target.value) || 0)}
                />
              </div>
              
              <div>
                <Label>Notebooks</Label>
                <Input
                  type="number"
                  min="0"
                  value={formData.technology.notebooks}
                  onChange={(e) => updateTechnology('notebooks', parseInt(e.target.value) || 0)}
                />
              </div>
              
              <div>
                <Label>Modems</Label>
                <Input
                  type="number"
                  min="0"
                  value={formData.technology.modems}
                  onChange={(e) => updateTechnology('modems', parseInt(e.target.value) || 0)}
                />
              </div>
              
              <div>
                <Label>Impressoras</Label>
                <Input
                  type="number"
                  min="0"
                  value={formData.technology.printers}
                  onChange={(e) => updateTechnology('printers', parseInt(e.target.value) || 0)}
                />
              </div>
              
              <div>
                <Label>Modems com Defeito</Label>
                <Input
                  type="number"
                  min="0"
                  value={formData.technology.defectiveModems}
                  onChange={(e) => updateTechnology('defectiveModems', parseInt(e.target.value) || 0)}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="school-internet"
                  checked={formData.technology.hasSchoolInternet}
                  onCheckedChange={(checked) => updateTechnology('hasSchoolInternet', checked)}
                />
                <Label htmlFor="school-internet">A escola tem Internet</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Botão de Envio */}
        <div className="flex justify-end">
          <Button type="submit" size="lg" className="px-8">
            Cadastrar Censo Escolar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SchoolCensusFormPage;
