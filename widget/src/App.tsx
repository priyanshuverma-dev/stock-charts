import { useEffect, useState } from "react";
import StockChart from "./components/StockChart";
import { CLIENT_URL } from "./data";

interface Props {
  clientId: string;
}

interface ChartData {
  symbol: string;
  classNames: string;
}

function App({ clientId }: Props) {
  const [data, setData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the chart data from the API
    async function fetchChartData() {
      try {
        const response = await fetch(`${CLIENT_URL}/api/fetch/${clientId}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const chartData = await response.json();
        setData(chartData);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchChartData();
  }, [clientId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return null;

  return (
    <>
      <StockChart symbol={data.symbol} classNames={data.classNames} />
    </>
  );
}

export default App;
