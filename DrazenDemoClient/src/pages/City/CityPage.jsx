import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../../components/ErrorFallback";
import CityTable from "./CityTable";

export default function CityPage() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <CityTable />
    </ErrorBoundary>
  );
}
