import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { TiChevronRight } from 'react-icons/ti';
import { TextXs } from './Texts';

export interface IBreadcrumbInput {
  name: string;
  href: string;
}

interface IBreadcrumbBaseProps {
  values: Array<IBreadcrumbInput>;
}

export const BreadcrumbBase: React.FC<IBreadcrumbBaseProps> = ({ values, ...rest }) => {
  const router = useRouter();
  let lastIndex = values.length - 1;

  return (
    <Breadcrumb spacing="8px" separator={<TiChevronRight color="gray.500" />} alignContent="start" px={4} pb={['6', '4', '0', '0']} {...rest}>
      {values.map((val, idx) => (
        <BreadcrumbItem key={idx} isCurrentPage={idx === lastIndex ? true : false}>
          <BreadcrumbLink onClick={() => router.push(val.href)} fontWeight={idx === lastIndex ? 'bold' : 'normal'} isTruncated>
            <TextXs>{val.name}</TextXs>
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};
