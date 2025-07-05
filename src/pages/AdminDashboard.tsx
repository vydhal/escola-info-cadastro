
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Download, School, Users, Monitor, Wifi } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import SubmissionsTable from '@/components/admin/SubmissionsTable';
import MetricsCards from '@/components/admin/MetricsCards';
import ChartsSection from '@/components/admin/ChartsSection';

const AdminDashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock data - em um app real viria do backend
  const mockSubmissions = [
    {
      id: '1',
      selectedSchool: { name: 'Escola Municipal João Silva', inep: '23456789' },
      classroomsCount: 5,
      teachingModalities: ['Anos iniciais', 'Anos Finais'],
      technology: { roboticsKits: 2, chromebooks: 15, notebooks: 8 },
      submittedAt: new Date('2024-01-15'),
      submittedBy: 'Maria Santos'
    },
    {
      id: '2',
      selectedSchool: { name: 'Escola Estadual Maria Santos', inep: '34567890' },
      classroomsCount: 8,
      teachingModalities: ['Anos iniciais', 'Anos Finais', 'EJA'],
      technology: { roboticsKits: 1, chromebooks: 20, notebooks: 12 },
      submittedAt: new Date('2024-01-16'),
      submittedBy: 'João Silva'
    }
  ];

  const handleExportCSV = () => {
    // Simulação de exportação CSV
    toast({
      title: "Exportação CSV",
      description: "Arquivo CSV foi gerado e o download iniciará em breve.",
    });
  };

  const handleExportXLS = () => {
    // Simulação de exportação XLS
    toast({
      title: "Exportação XLS",
      description: "Arquivo Excel foi gerado e o download iniciará em breve.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Painel Administrativo</h1>
              <p className="text-gray-600 mt-1">Dashboard do Censo Escolar</p>
            </div>
            <div className="flex gap-3">
              <Button onClick={handleExportCSV} variant="outline">
                <Download className="mr-2 w-4 h-4" />
                Exportar CSV
              </Button>
              <Button onClick={handleExportXLS}>
                <Download className="mr-2 w-4 h-4" />
                Exportar XLS
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="submissions">Submissões</TabsTrigger>
            <TabsTrigger value="reports">Relatórios</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="mt-6">
            <div className="space-y-6">
              <MetricsCards submissions={mockSubmissions} />
              <ChartsSection submissions={mockSubmissions} />
            </div>
          </TabsContent>

          <TabsContent value="submissions" className="mt-6">
            <SubmissionsTable submissions={mockSubmissions} />
          </TabsContent>

          <TabsContent value="reports" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Relatórios Personalizados</CardTitle>
                <CardDescription>
                  Gere relatórios específicos com filtros avançados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-4">Funcionalidade de relatórios em desenvolvimento</p>
                  <Button disabled>Em breve</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
