import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { AddPatientWizard } from './AddPatientWizard';

interface AddPatientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddPatientDialog({ open, onOpenChange }: AddPatientDialogProps) {
  const handleComplete = () => {
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[75vw] max-w-[75vw] sm:w-[75vw] sm:max-w-[75vw] max-h-[90vh] overflow-y-auto p-0">
        <DialogTitle className="sr-only">Add New Patient</DialogTitle>
        <DialogDescription className="sr-only">
          Complete the 6-step wizard to onboard a new patient
        </DialogDescription>
        <div className="p-6">
          <AddPatientWizard onComplete={handleComplete} onCancel={handleCancel} />
        </div>
      </DialogContent>
    </Dialog>
  );
}