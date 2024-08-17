import StockChart from "@/components/StockChart";
import StockSwitch from "@/components/StockSwitch";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex p-2 flex-col justify-center h-screen items-center">
      <main>
        <h1>Welcome to the Stock Charts</h1>
        <StockChart />
        <div className="mt-4">
          <p className="text-lg font-medium text-gray-700">Other Stocks</p>
          <StockSwitch />
        </div>
      </main>

      <footer>
        <p>
          Powered by{" "}
          <Link className="text-blue-500" href={"https://www.fluvio.io"}>
            Fluvio
          </Link>{" "}
          Realtime Data flow.
        </p>
      </footer>
    </div>
  );
}
