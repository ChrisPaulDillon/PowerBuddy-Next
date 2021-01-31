import { ErrorMessage } from '../components/common/Error';

function Error({ statusCode }) {
  return <ErrorMessage statusCode={404} description="The requested page could not be found. Have you followed a broken link?" />;
}

export default Error;
