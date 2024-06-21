import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../../components/ErrorFallback";
import MarketTable from "./MarketTable";

export default function MarketPage() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <MarketTable />
    </ErrorBoundary>
  );
}
