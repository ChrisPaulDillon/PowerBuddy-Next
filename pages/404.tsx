import { ErrorMessage } from '../components/common/Error';

export default function Custom404() {
  return <ErrorMessage statusCode={404} description="The requested page could not be found. Have you followed a broken link?" />;
}
