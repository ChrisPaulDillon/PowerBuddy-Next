import React from 'react';
import { ModalDrawerForm } from '../../common/ModalDrawer';
import CreateExercise from '../forms/CreateExercise';
import CreateTemplateProgram from '../forms/CreateTemplateProgram';

export enum AdminModalEnum {
  CreateExercise,
  CreateTemplate,
  None,
}

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  modalType: AdminModalEnum;
}

const AdminModalExerciseFactory: React.FC<IProps> = ({ isOpen, onClose, modalType }) => {
  return (
    <ModalDrawerForm title="" isOpen={isOpen} onClose={onClose} size="full">
      {
        {
          [AdminModalEnum.CreateExercise]: <CreateExercise />,
          [AdminModalEnum.CreateTemplate]: <CreateTemplateProgram />,
          [AdminModalEnum.None]: <></>,
        }[modalType]
      }
    </ModalDrawerForm>
  );
};

export default AdminModalExerciseFactory;
