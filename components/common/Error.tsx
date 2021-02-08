import { Alert, AlertDescription, AlertTitle, Heading } from '@chakra-ui/react';
import React from 'react';
interface IErrorProps {
  statusCode: number;
  title?: string;
  description: string;
}
export const ErrorMessage: React.FC<IErrorProps> = ({ statusCode, title, description }) => {
  if (!title) {
    switch (statusCode) {
      case 400:
        title = 'Bad Request';
        break;
      case 401:
        title = 'Unauthorized';
        break;
      case 403:
        title = 'Forbidden';
        break;
      case 404:
        title = 'Not Found';
        break;
      default:
        title = 'Unexpected';
        break;
    }
  }
  return (
    <Alert bg="transparent" flexDirection="column" justifyContent="center" textAlign="center" height="200px">
      <Heading>{statusCode}</Heading>
      <AlertTitle mt={4} mb={1} fontSize="lg">
        {title}
      </AlertTitle>
      {description && <AlertDescription maxWidth="sm">{description}</AlertDescription>}
    </Alert>
  );
};
