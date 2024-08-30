import yahooFinance from "yahoo-finance2";

export const fetchChartData = async (
  symbol: string,
  time: string | number | Date
) => {
  const chart = await yahooFinance.chart(symbol, {
    period1: time,
    period2: new Date(), // Now
    interval: "15m",
  });

  const { quotes } = chart;

  return quotes;
};
export const validateSymbol = async (symbol: string) => {
  const quote = await yahooFinance.quote(symbol);

  if (quote == undefined) {
    return false;
  } else {
    return true;
  }
};
