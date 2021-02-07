import React from 'react';
import { IconButton } from '@chakra-ui/react';
import { PbToolTip } from './ToolTips';
import { IconType } from 'react-icons';
import { SizeType } from '../../types/unionTypes';

interface IProps {
  label: string;
  Icon: IconType;
  onClick: () => void;
  fontSize?: string;
  color?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  size?: SizeType;
}

const PbIconButton: React.FC<IProps> = ({ label, Icon, onClick, fontSize, color, isDisabled, isLoading, size, ...rest }) => {
  return (
    <PbToolTip label={label}>
      <IconButton
        aria-label=""
        icon={<Icon />}
        size={size ?? 'sm'}
        isRound
        variant="ghost"
        onClick={onClick}
        fontSize={fontSize ?? '20px'}
        color={color}
        isDisabled={isDisabled ?? false}
        isLoading={isLoading ?? false}
        {...rest}
      />
    </PbToolTip>
  );
};

export default PbIconButton;
