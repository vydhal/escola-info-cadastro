
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [config, setConfig] = useState({
    logo: '/placeholder.svg',
    prefeituraNome: 'Prefeitura Municipal',
    secretaria: 'Secretaria de Educação',
    heroTitle: 'Censo Escolar 2024',
    heroDescription: 'Participe do levantamento oficial das informações educacionais. Sua escola faz a diferença na construção de políticas públicas eficazes.',
    copyright: '© 2024 Prefeitura Municipal. Todos os direitos reservados.',
    facebookUrl: '#',
    instagramUrl: '#',
    twitterUrl: '#',
    youtubeUrl: '#'
  });

  useEffect(() => {
    // Carregar configurações salvas
    const loadConfig = () => {
      const savedConfig = localStorage.getItem('homeCustomization');
      if (savedConfig) {
        try {
          const parsedConfig = JSON.parse(savedConfig);
          setConfig(parsedConfig);
        } catch (error) {
          console.error('Erro ao carregar configurações da home:', error);
        }
      }
    };

    loadConfig();

    // Escutar mudanças nas configurações
    const handleConfigUpdate = (event: CustomEvent) => {
      setConfig(event.detail);
    };

    window.addEventListener('homeConfigUpdated', handleConfigUpdate as EventListener);
    
    return () => {
      window.removeEventListener('homeConfigUpdated', handleConfigUpdate as EventListener);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header com Logo */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center">
            <img 
              src={config.logo} 
              alt="Logo da Prefeitura" 
              className="h-16 w-auto"
            />
            <div className="ml-4">
              <h1 className="text-2xl font-bold text-gray-900">{config.prefeituraNome}</h1>
              <p className="text-sm text-gray-600">{config.secretaria}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {config.heroTitle}
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            {config.heroDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate("/censo-escolar")} 
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Começar Agora
            </Button>
            <Button 
              onClick={() => navigate("/admin")} 
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              Acesso Administrativo
            </Button>
          </div>
        </div>
      </section>

      {/* Conteúdo Principal */}
      <div className="container mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Sistema de Censo Escolar
          </h2>
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
                onClick={() => navigate("/admin")}
                className="w-full" 
                size="lg"
              >
                Acessar Painel Admin
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

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">{config.prefeituraNome}</h3>
              <p className="text-gray-300 text-sm">
                {config.secretaria} comprometida com a qualidade do ensino público municipal.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Links Úteis</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white">Portal da Transparência</a></li>
                <li><a href="#" className="hover:text-white">Secretaria de Educação</a></li>
                <li><a href="#" className="hover:text-white">Ouvidoria</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Redes Sociais</h3>
              <div className="flex space-x-4">
                <a href={config.facebookUrl || '#'} className="text-gray-300 hover:text-white">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href={config.instagramUrl || '#'} className="text-gray-300 hover:text-white">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href={config.twitterUrl || '#'} className="text-gray-300 hover:text-white">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href={config.youtubeUrl || '#'} className="text-gray-300 hover:text-white">
                  <Youtube className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-sm text-gray-400">
              {config.copyright}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
