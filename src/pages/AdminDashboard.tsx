import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Home, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import SubmissionsTable from '@/components/admin/SubmissionsTable';
import MetricsCards from '@/components/admin/MetricsCards';
import ChartsSection from '@/components/admin/ChartsSection';
import AdminLogin from '@/components/admin/AdminLogin';
import { SchoolCensusSubmission } from '@/types/school';
import schoolsData from '@/data/schools.json';

const AdminDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [submissions, setSubmissions] = useState<SchoolCensusSubmission[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verificar autenticação
  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuthenticated');
    setIsAuthenticated(adminAuth === 'true');
  }, []);

  // Carregar dados do localStorage quando o componente for montado
  useEffect(() => {
    const loadSubmissions = () => {
      try {
        const savedSubmissions = localStorage.getItem('schoolCensusSubmissions');
        if (savedSubmissions) {
          const parsedSubmissions = JSON.parse(savedSubmissions);
          // Converter strings de data de volta para objetos Date
          const submissionsWithDates = parsedSubmissions.map((sub: any) => ({
            ...sub,
            submittedAt: new Date(sub.submittedAt)
          }));
          setSubmissions(submissionsWithDates);
        } else {
          // Dados mock apenas se não houver dados salvos
          setSubmissions(getMockData());
        }
      } catch (error) {
        console.error('Erro ao carregar submissões:', error);
        setSubmissions(getMockData());
      }
    };

    loadSubmissions();

    // Escutar mudanças no localStorage para atualizar em tempo real
    const handleStorageChange = () => {
      loadSubmissions();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Também verificar periodicamente por mudanças (para mudanças na mesma aba)
    const interval = setInterval(loadSubmissions, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const getMockData = (): SchoolCensusSubmission[] => [
    {
      id: '1',
      selectedSchool: { name: 'Escola Municipal João Silva', inep: '23456789' },
      classroomsCount: 5,
      classrooms: [
        {
          id: '1',
          outlets: 4,
          tvs: 1,
          hasInternet: true,
          chairs: 30,
          studentCapacity: 25,
          hasAirConditioning: false,
          fans: 2
        },
        {
          id: '2',
          outlets: 6,
          tvs: 1,
          hasInternet: true,
          chairs: 35,
          studentCapacity: 30,
          hasAirConditioning: true,
          fans: 0
        }
      ],
      teachingModalities: ['Anos iniciais', 'Anos Finais'],
      technology: { 
        roboticsKits: 2, 
        chromebooks: 15, 
        notebooks: 8,
        modems: 3,
        printers: 2,
        defectiveModems: 1,
        hasSchoolInternet: true
      },
      submittedAt: new Date('2024-01-15'),
      submittedBy: 'Maria Santos'
    },
    {
      id: '2',
      selectedSchool: { name: 'Escola Estadual Maria Santos', inep: '34567890' },
      classroomsCount: 8,
      classrooms: [
        {
          id: '1',
          outlets: 8,
          tvs: 2,
          hasInternet: true,
          chairs: 40,
          studentCapacity: 35,
          hasAirConditioning: true,
          fans: 0
        }
      ],
      teachingModalities: ['Anos iniciais', 'Anos Finais', 'EJA'],
      technology: { 
        roboticsKits: 1, 
        chromebooks: 20, 
        notebooks: 12,
        modems: 5,
        printers: 3,
        defectiveModems: 0,
        hasSchoolInternet: true
      },
      submittedAt: new Date('2024-01-16'),
      submittedBy: 'João Silva'
    }
  ];

  const totalSchools = schoolsData.length;
  const submittedSchools = submissions.length;
  const pendingSchools = totalSchools - submittedSchools;

  const handleExportCSV = () => {
    try {
      const csvData = submissions.map(sub => ({
        'Nome da Escola': sub.selectedSchool?.name,
        'INEP': sub.selectedSchool?.inep,
        'Salas de Aula': sub.classroomsCount,
        'Modalidades': sub.teachingModalities.join(', '),
        'Chromebooks': sub.technology.chromebooks,
        'Notebooks': sub.technology.notebooks,
        'Kits Robótica': sub.technology.roboticsKits,
        'Modems': sub.technology.modems,
        'Impressoras': sub.technology.printers,
        'Modems Defeituosos': sub.technology.defectiveModems,
        'Internet na Escola': sub.technology.hasSchoolInternet ? 'Sim' : 'Não',
        'Submetido por': sub.submittedBy,
        'Data de Submissão': sub.submittedAt.toLocaleDateString('pt-BR')
      }));

      const ws = XLSX.utils.json_to_sheet(csvData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Censo Escolar');
      
      XLSX.writeFile(wb, `censo-escolar-${new Date().toISOString().split('T')[0]}.csv`);
      
      toast({
        title: "Exportação CSV",
        description: "Arquivo CSV foi baixado com sucesso!",
      });
    } catch (error) {
      toast({
        title: "Erro na exportação",
        description: "Não foi possível gerar o arquivo CSV.",
        variant: "destructive"
      });
    }
  };

  const handleExportXLS = () => {
    try {
      const xlsData = submissions.map(sub => ({
        'Nome da Escola': sub.selectedSchool?.name,
        'INEP': sub.selectedSchool?.inep,
        'Salas de Aula': sub.classroomsCount,
        'Modalidades': sub.teachingModalities.join(', '),
        'Chromebooks': sub.technology.chromebooks,
        'Notebooks': sub.technology.notebooks,
        'Kits Robótica': sub.technology.roboticsKits,
        'Modems': sub.technology.modems,
        'Impressoras': sub.technology.printers,
        'Modems Defeituosos': sub.technology.defectiveModems,
        'Internet na Escola': sub.technology.hasSchoolInternet ? 'Sim' : 'Não',
        'Submetido por': sub.submittedBy,
        'Data de Submissão': sub.submittedAt.toLocaleDateString('pt-BR')
      }));

      const ws = XLSX.utils.json_to_sheet(xlsData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Censo Escolar');
      
      XLSX.writeFile(wb, `censo-escolar-${new Date().toISOString().split('T')[0]}.xlsx`);
      
      toast({
        title: "Exportação Excel",
        description: "Arquivo Excel foi baixado com sucesso!",
      });
    } catch (error) {
      toast({
        title: "Erro na exportação",
        description: "Não foi possível gerar o arquivo Excel.",
        variant: "destructive"
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    setIsAuthenticated(false);
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
  };

  const handleGoHome = () => {
    navigate('/');
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Painel Administrativo</h1>
              <p className="text-gray-600 mt-1">Dashboard do Censo Escolar</p>
              <div className="flex gap-4 mt-2 text-sm">
                <span className="text-green-600 font-medium">
                  Escolas enviadas: {submittedSchools}
                </span>
                <span className="text-orange-600 font-medium">
                  Escolas pendentes: {pendingSchools}
                </span>
                <span className="text-blue-600 font-medium">
                  Total de escolas: {totalSchools}
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <Button onClick={handleGoHome} variant="outline">
                <Home className="mr-2 w-4 h-4" />
                Início
              </Button>
              <Button onClick={handleExportCSV} variant="outline">
                <Download className="mr-2 w-4 h-4" />
                Exportar CSV
              </Button>
              <Button onClick={handleExportXLS}>
                <Download className="mr-2 w-4 h-4" />
                Exportar Excel
              </Button>
              <Button onClick={handleLogout} variant="destructive">
                <LogOut className="mr-2 w-4 h-4" />
                Sair
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
              <MetricsCards submissions={submissions} />
              <ChartsSection submissions={submissions} />
            </div>
          </TabsContent>

          <TabsContent value="submissions" className="mt-6">
            <SubmissionsTable submissions={submissions} />
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
