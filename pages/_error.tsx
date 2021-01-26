import { ErrorMessage } from '../components/common/Error';

function Error({ statusCode }) {
  return <ErrorMessage statusCode={404} description="The requested page could not be found. Have you followed a broken link?" />;
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
