import { useRouteError } from "react-router-dom";
import MainNavigation from "../../components/MainNavigation";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <MainNavigation />
      <div>
        <h1>An error occurred!</h1>
        <p>404: Could not find this page.</p>
      </div>
    </>
  );
}
