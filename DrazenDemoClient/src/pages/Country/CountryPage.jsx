import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../../components/ErrorFallback";
import CountryTable from "./CountryTable";

export default function CountryPage() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <CountryTable />
    </ErrorBoundary>
  );
}
