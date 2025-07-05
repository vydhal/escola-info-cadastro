
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Eye } from 'lucide-react';
import { SchoolCensusSubmission } from '@/types/school';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface SubmissionsTableProps {
  submissions: SchoolCensusSubmission[];
}

const SubmissionsTable = ({ submissions }: SubmissionsTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalityFilter, setModalityFilter] = useState('all');

  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch = submission.selectedSchool?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         submission.selectedSchool?.inep.includes(searchTerm);
    
    const matchesModality = modalityFilter === 'all' || 
                           submission.teachingModalities.includes(modalityFilter);

    return matchesSearch && matchesModality;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submissões do Censo Escolar</CardTitle>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar por nome da escola ou INEP..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={modalityFilter} onValueChange={setModalityFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filtrar modalidade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as modalidades</SelectItem>
              <SelectItem value="Anos iniciais">Anos iniciais</SelectItem>
              <SelectItem value="Anos Finais">Anos Finais</SelectItem>
              <SelectItem value="EJA">EJA</SelectItem>
              <SelectItem value="Integral">Integral</SelectItem>
              <SelectItem value="Bilingue">Bilíngue</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Escola</TableHead>
                <TableHead>INEP</TableHead>
                <TableHead>Salas</TableHead>
                <TableHead>Modalidades</TableHead>
                <TableHead>Submetido por</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubmissions.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell className="font-medium">
                    {submission.selectedSchool?.name}
                  </TableCell>
                  <TableCell>{submission.selectedSchool?.inep}</TableCell>
                  <TableCell>{submission.classroomsCount}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {submission.teachingModalities.slice(0, 2).map((modality) => (
                        <Badge key={modality} variant="secondary" className="text-xs">
                          {modality}
                        </Badge>
                      ))}
                      {submission.teachingModalities.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{submission.teachingModalities.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{submission.submittedBy}</TableCell>
                  <TableCell>
                    {format(submission.submittedAt, 'dd/MM/yyyy', { locale: ptBR })}
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      <Eye className="mr-2 h-4 w-4" />
                      Ver detalhes
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {filteredSubmissions.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">Nenhuma submissão encontrada com os filtros aplicados.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SubmissionsTable;
