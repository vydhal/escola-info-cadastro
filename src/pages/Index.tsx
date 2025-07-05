
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Sistema de Censo Escolar
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Plataforma para cadastro e gestão das informações do censo escolar das unidades educacionais
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-700">Gestores Escolares</CardTitle>
              <CardDescription>
                Cadastre as informações da sua unidade escolar de acordo com o censo educacional
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6 text-sm text-gray-600">
                <li>• Cadastro de dados da unidade</li>
                <li>• Informações das salas de aula</li>
                <li>• Modalidades de ensino</li>
                <li>• Recursos tecnológicos</li>
              </ul>
              <Button 
                onClick={() => navigate("/censo-escolar")} 
                className="w-full"
                size="lg"
              >
                Acessar Formulário
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl text-green-700">Administradores</CardTitle>
              <CardDescription>
                Acesse o painel administrativo para visualizar relatórios e dados consolidados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6 text-sm text-gray-600">
                <li>• Dashboard com métricas</li>
                <li>• Exportação de dados (CSV/XLS)</li>
                <li>• Filtros avançados</li>
                <li>• Relatórios consolidados</li>
              </ul>
              <Button 
                variant="outline" 
                className="w-full" 
                size="lg"
                disabled
              >
                Painel Admin (Em breve)
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Como funciona?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Selecione a Escola</h3>
                  <p className="text-sm text-gray-600">Escolha sua unidade na lista com dados do INEP</p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-blue-600 font-bold">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">Preencha os Dados</h3>
                  <p className="text-sm text-gray-600">Informe dados das salas, modalidades e tecnologias</p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-blue-600 font-bold">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">Envie o Censo</h3>
                  <p className="text-sm text-gray-600">Cadastre e acompanhe via painel administrativo</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
