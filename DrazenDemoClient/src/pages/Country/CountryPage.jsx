import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../../components/ErrorFallback";
import CountryTable from "./CountryTable";
import { countryService } from "./countryService";

export default function CountryPage() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <CountryTable service={countryService} />
    </ErrorBoundary>
  );
}
