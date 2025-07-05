
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { School, Users, Monitor, Wifi } from 'lucide-react';
import { SchoolCensusSubmission } from '@/types/school';

interface MetricsCardsProps {
  submissions: SchoolCensusSubmission[];
}

const MetricsCards = ({ submissions }: MetricsCardsProps) => {
  const totalSchools = submissions.length;
  const totalClassrooms = submissions.reduce((acc, sub) => acc + sub.classroomsCount, 0);
  const totalChromebooks = submissions.reduce((acc, sub) => acc + sub.technology.chromebooks, 0);
  const schoolsWithInternet = submissions.filter(sub => sub.technology.hasSchoolInternet).length;

  const metrics = [
    {
      title: "Escolas Cadastradas",
      value: totalSchools.toString(),
      icon: School,
      description: "Total de unidades"
    },
    {
      title: "Salas de Aula",
      value: totalClassrooms.toString(),
      icon: Users,
      description: "Soma de todas as salas"
    },
    {
      title: "Chromebooks",
      value: totalChromebooks.toString(),
      icon: Monitor,
      description: "Total de dispositivos"
    },
    {
      title: "Escolas com Internet",
      value: `${schoolsWithInternet}/${totalSchools}`,
      icon: Wifi,
      description: `${Math.round((schoolsWithInternet/totalSchools) * 100)}% das escolas`
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {metric.title}
            </CardTitle>
            <metric.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <p className="text-xs text-muted-foreground">
              {metric.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MetricsCards;
