import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../../components/ErrorFallback";
import CityTable from "./CityTable";
import { cityService } from "./cityService";

export default function CityPage() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <CityTable service={cityService} />
    </ErrorBoundary>
  );
}
