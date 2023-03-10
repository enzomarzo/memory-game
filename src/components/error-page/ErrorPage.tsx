import { useRouteError } from "react-router-dom";

type ErrorResponse = {
  status: number;
  statusText: string;
  message?: string;
  error: {
    message: string;
    stack: string;
  };
};

export default function ErrorPage() {
  const error = useRouteError() as ErrorResponse;

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error?.message}</i>
      </p>
    </div>
  );
}
