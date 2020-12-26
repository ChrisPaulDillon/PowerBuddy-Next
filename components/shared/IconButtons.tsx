import React from 'react';
import { MdDeleteForever } from 'react-icons/md';
import PbIconButton from '../common/IconButtons';

interface IIconButtonProps {
  label: string;
  onClick: () => void;
  isDisabled: boolean;
}

export const TrashIconButton: React.FC<IIconButtonProps> = ({ label, onClick, isDisabled }) => {
  return <PbIconButton label={label} Icon={MdDeleteForever} color="red.500" fontSize="20px" onClick={onClick} isDisabled={isDisabled} />;
};
