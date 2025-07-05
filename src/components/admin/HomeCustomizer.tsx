
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Upload, Save, Eye } from 'lucide-react';

const HomeCustomizer = () => {
  const { toast } = useToast();
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

  const handleInputChange = (field: string, value: string) => {
    setConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    localStorage.setItem('homeCustomization', JSON.stringify(config));
    toast({
      title: "Configurações salvas",
      description: "As alterações da home foram salvas com sucesso!",
    });
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setConfig(prev => ({
          ...prev,
          logo: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Personalização da Home</CardTitle>
          <CardDescription>
            Configure os textos, logo e links da página inicial
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Logo */}
          <div className="space-y-2">
            <Label>Logo da Prefeitura</Label>
            <div className="flex items-center gap-4">
              <img src={config.logo} alt="Logo atual" className="h-16 w-16 object-contain border rounded" />
              <div>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="w-auto"
                />
                <p className="text-sm text-gray-500 mt-1">Formatos aceitos: PNG, JPG, SVG</p>
              </div>
            </div>
          </div>

          {/* Informações da Prefeitura */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="prefeituraNome">Nome da Prefeitura</Label>
              <Input
                id="prefeituraNome"
                value={config.prefeituraNome}
                onChange={(e) => handleInputChange('prefeituraNome', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="secretaria">Nome da Secretaria</Label>
              <Input
                id="secretaria"
                value={config.secretaria}
                onChange={(e) => handleInputChange('secretaria', e.target.value)}
              />
            </div>
          </div>

          {/* Hero Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Seção Principal (Hero)</h3>
            <div className="space-y-2">
              <Label htmlFor="heroTitle">Título Principal</Label>
              <Input
                id="heroTitle"
                value={config.heroTitle}
                onChange={(e) => handleInputChange('heroTitle', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="heroDescription">Descrição</Label>
              <Textarea
                id="heroDescription"
                value={config.heroDescription}
                onChange={(e) => handleInputChange('heroDescription', e.target.value)}
                rows={3}
              />
            </div>
          </div>

          {/* Redes Sociais */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Redes Sociais</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="facebookUrl">Facebook URL</Label>
                <Input
                  id="facebookUrl"
                  value={config.facebookUrl}
                  onChange={(e) => handleInputChange('facebookUrl', e.target.value)}
                  placeholder="https://facebook.com/prefeitura"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instagramUrl">Instagram URL</Label>
                <Input
                  id="instagramUrl"
                  value={config.instagramUrl}
                  onChange={(e) => handleInputChange('instagramUrl', e.target.value)}
                  placeholder="https://instagram.com/prefeitura"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitterUrl">Twitter URL</Label>
                <Input
                  id="twitterUrl"
                  value={config.twitterUrl}
                  onChange={(e) => handleInputChange('twitterUrl', e.target.value)}
                  placeholder="https://twitter.com/prefeitura"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="youtubeUrl">YouTube URL</Label>
                <Input
                  id="youtubeUrl"
                  value={config.youtubeUrl}
                  onChange={(e) => handleInputChange('youtubeUrl', e.target.value)}
                  placeholder="https://youtube.com/prefeitura"
                />
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="space-y-2">
            <Label htmlFor="copyright">Texto de Copyright</Label>
            <Input
              id="copyright"
              value={config.copyright}
              onChange={(e) => handleInputChange('copyright', e.target.value)}
            />
          </div>

          {/* Botões de Ação */}
          <div className="flex gap-3 pt-4">
            <Button onClick={handleSave} className="flex-1">
              <Save className="mr-2 w-4 h-4" />
              Salvar Alterações
            </Button>
            <Button variant="outline" onClick={() => window.open('/', '_blank')}>
              <Eye className="mr-2 w-4 h-4" />
              Visualizar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomeCustomizer;
