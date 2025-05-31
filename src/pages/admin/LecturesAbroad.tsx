
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Eye, Calendar, MapPin } from 'lucide-react';
import { useLecturesAbroad } from '@/hooks/useLecturesAbroad';
import LectureForm from '@/components/admin/lectures/LectureForm';
import LectureView from '@/components/admin/lectures/LectureView';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const AdminLecturesAbroad = () => {
  const { language } = useLanguage();
  const { lectures, isLoading, deleteLecture } = useLecturesAbroad();
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showView, setShowView] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleEdit = (lecture) => {
    setSelectedLecture(lecture);
    setShowForm(true);
  };

  const handleView = (lecture) => {
    setSelectedLecture(lecture);
    setShowView(true);
  };

  const handleDelete = async () => {
    if (deleteId) {
      await deleteLecture(deleteId);
      setDeleteId(null);
    }
  };

  const getTitle = (lecture) => {
    return language === 'np' ? (lecture.title_np || lecture.title_en) : lecture.title_en;
  };

  const getLocation = (lecture) => {
    return language === 'np' ? (lecture.location_np || lecture.location_en) : lecture.location_en;
  };

  const getDate = (lecture) => {
    return language === 'np' ? (lecture.date_np || lecture.date_en) : lecture.date_en;
  };

  const getBadge = (lecture) => {
    return language === 'np' ? (lecture.badge_np || lecture.badge_en) : lecture.badge_en;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Lectures Abroad Management</h1>
          <Button onClick={() => {
            setSelectedLecture(null);
            setShowForm(true);
          }}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Lecture
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-8">Loading lectures...</div>
        ) : (
          <div className="grid gap-6">
            {lectures.map((lecture) => (
              <Card key={lecture.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        {getBadge(lecture) && (
                          <Badge variant="outline">{getBadge(lecture)}</Badge>
                        )}
                        <Badge variant={lecture.type === 'recent' ? 'default' : 'secondary'}>
                          {lecture.type}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl">{getTitle(lecture)}</CardTitle>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleView(lecture)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleEdit(lecture)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setDeleteId(lecture.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{getLocation(lecture)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{getDate(lecture)}</span>
                    </div>
                    {lecture.lecture_images?.length > 0 && (
                      <p className="text-sm text-gray-500">
                        {lecture.lecture_images.length} image(s) attached
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}

            {lectures.length === 0 && (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-gray-500">No lectures found. Create your first lecture to get started.</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Form Dialog */}
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {selectedLecture ? 'Edit Lecture' : 'Add New Lecture'}
              </DialogTitle>
            </DialogHeader>
            <LectureForm 
              lecture={selectedLecture} 
              onClose={() => {
                setShowForm(false);
                setSelectedLecture(null);
              }} 
            />
          </DialogContent>
        </Dialog>

        {/* View Dialog */}
        <Dialog open={showView} onOpenChange={setShowView}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Lecture Details</DialogTitle>
            </DialogHeader>
            {selectedLecture && (
              <LectureView 
                lecture={selectedLecture} 
                onClose={() => {
                  setShowView(false);
                  setSelectedLecture(null);
                }} 
              />
            )}
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation */}
        <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the lecture
                and all associated images.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AdminLayout>
  );
};

export default AdminLecturesAbroad;
