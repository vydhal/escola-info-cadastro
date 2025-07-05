
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SchoolCensusSubmission } from '@/types/school';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { School, Users, Monitor, Wifi, Printer, Router } from 'lucide-react';

interface SubmissionDetailsModalProps {
  submission: SchoolCensusSubmission | null;
  onClose: () => void;
}

const SubmissionDetailsModal = ({ submission, onClose }: SubmissionDetailsModalProps) => {
  if (!submission) return null;

  return (
    <Dialog open={!!submission} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <School className="w-5 h-5" />
            {submission.selectedSchool?.name}
          </DialogTitle>
          <DialogDescription>
            INEP: {submission.selectedSchool?.inep} | 
            Submetido por {submission.submittedBy} em {format(submission.submittedAt, 'dd/MM/yyyy', { locale: ptBR })}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações Gerais */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informações Gerais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Total de Salas de Aula</p>
                  <p className="text-xl font-semibold">{submission.classroomsCount}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Modalidades de Ensino</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {submission.teachingModalities.map((modality) => (
                      <Badge key={modality} variant="secondary">
                        {modality}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tecnologia */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Monitor className="w-5 h-5" />
                Recursos Tecnológicos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <Monitor className="w-8 h-8 mx-auto text-blue-600 mb-2" />
                  <p className="text-2xl font-bold">{submission.technology.chromebooks}</p>
                  <p className="text-sm text-gray-600">Chromebooks</p>
                </div>
                <div className="text-center">
                  <Monitor className="w-8 h-8 mx-auto text-green-600 mb-2" />
                  <p className="text-2xl font-bold">{submission.technology.notebooks}</p>
                  <p className="text-sm text-gray-600">Notebooks</p>
                </div>
                <div className="text-center">
                  <Router className="w-8 h-8 mx-auto text-orange-600 mb-2" />
                  <p className="text-2xl font-bold">{submission.technology.modems}</p>
                  <p className="text-sm text-gray-600">Modems</p>
                </div>
                <div className="text-center">
                  <Printer className="w-8 h-8 mx-auto text-purple-600 mb-2" />
                  <p className="text-2xl font-bold">{submission.technology.printers}</p>
                  <p className="text-sm text-gray-600">Impressoras</p>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Kits de Robótica</p>
                  <p className="text-lg font-semibold">{submission.technology.roboticsKits}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Modems Defeituosos</p>
                  <p className="text-lg font-semibold text-red-600">{submission.technology.defectiveModems}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Wifi className={`w-5 h-5 ${submission.technology.hasSchoolInternet ? 'text-green-600' : 'text-red-600'}`} />
                  <div>
                    <p className="text-sm text-gray-600">Internet na Escola</p>
                    <p className={`font-semibold ${submission.technology.hasSchoolInternet ? 'text-green-600' : 'text-red-600'}`}>
                      {submission.technology.hasSchoolInternet ? 'Sim' : 'Não'}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detalhes das Salas */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="w-5 h-5" />
                Detalhes das Salas de Aula
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {submission.classrooms.map((classroom, index) => (
                  <div key={classroom.id} className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-3">Sala {index + 1}</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Tomadas</p>
                        <p className="font-semibold">{classroom.outlets}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">TVs</p>
                        <p className="font-semibold">{classroom.tvs}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Cadeiras</p>
                        <p className="font-semibold">{classroom.chairs}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Capacidade</p>
                        <p className="font-semibold">{classroom.studentCapacity} alunos</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Internet</p>
                        <p className={`font-semibold ${classroom.hasInternet ? 'text-green-600' : 'text-red-600'}`}>
                          {classroom.hasInternet ? 'Sim' : 'Não'}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Ar Condicionado</p>
                        <p className={`font-semibold ${classroom.hasAirConditioning ? 'text-green-600' : 'text-red-600'}`}>
                          {classroom.hasAirConditioning ? 'Sim' : 'Não'}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Ventiladores</p>
                        <p className="font-semibold">{classroom.fans}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubmissionDetailsModal;
