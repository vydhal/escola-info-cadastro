
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { SchoolCensusSubmission } from '@/types/school';

interface ChartsSectionProps {
  submissions: SchoolCensusSubmission[];
}

const ChartsSection = ({ submissions }: ChartsSectionProps) => {
  // Dados para gráfico de barras - Tecnologia por escola
  const technologyData = submissions.map(sub => ({
    escola: sub.selectedSchool?.name.substring(0, 20) + '...',
    chromebooks: sub.technology.chromebooks,
    notebooks: sub.technology.notebooks,
    robotica: sub.technology.roboticsKits
  }));

  // Dados para gráfico de pizza - Modalidades de ensino
  const modalityCount = submissions.reduce((acc, sub) => {
    sub.teachingModalities.forEach(modality => {
      acc[modality] = (acc[modality] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const modalityData = Object.entries(modalityCount).map(([name, value]) => ({
    name,
    value
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Recursos Tecnológicos por Escola</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={technologyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="escola" 
                angle={-45}
                textAnchor="end"
                height={80}
                fontSize={12}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="chromebooks" fill="#8884d8" name="Chromebooks" />
              <Bar dataKey="notebooks" fill="#82ca9d" name="Notebooks" />
              <Bar dataKey="robotica" fill="#ffc658" name="Kits Robótica" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Modalidades de Ensino</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={modalityData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {modalityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChartsSection;
