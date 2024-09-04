import yahooFinance from "yahoo-finance2";

import Express from "express";
import cors from "cors";
import { Offset, type KeyValue, type Record, type Topic } from "@fluvio/client";
import { createTopic, fluvio, fluvioClient, listTopic } from "./lib/fluvio";
import { fetchChartData, validateSymbol } from "./lib/lib";

const PORT = process.env.PORT || 8000;
const PARTITION = 0;

const app = Express();
app.use(
  cors({
    origin: "*",
  })
);

// To sync chart data in pipelines
app.get("/sync", async (_, res) => {
  try {
    const client = await fluvioClient();
    let topicNames = await listTopic();

    if (topicNames.length <= 0) {
      return res.json({ state: 1 });
    }

    for (let i = 0; i < topicNames.length; i++) {
      const topic = topicNames[i];

      const chartData = await fetchChartData(
        topic,
        new Date(Date.now() - 6 * 60 * 60 * 1000) // past 5 hrs
      );

      const records: KeyValue[] = chartData.map((d) => {
        return ["data", JSON.stringify(d)];
      });

      const producer = await client.topicProducer(topic);

      await producer.sendAll(records);
    }

    return res.json({ state: 1 });
  } catch (error) {
    console.log(error);
    return res.json({ state: 0 });
  }
});

// To get stream data for client side websites requires topic-id.
app.get("/stream/:topic", async (req, res) => {
  try {
    const topic = req.params.topic;

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Content-Type", "text/event-stream;");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("X-Accel-Buffering", "no");
    res.flushHeaders();

    const client = await fluvio.connect();
    const consumer = await client.partitionConsumer(
      topic.toLowerCase().replaceAll(".", "-"),
      PARTITION
    );
    await consumer.stream(Offset.FromEnd(), async (record: Record) => {
      const eventData = record.valueString();
      const responseMsg = `data: ${JSON.stringify(eventData)}\n\n`;
      res.write(responseMsg);
      res.write("\n\n");
    });

    res.on("close", () => {
      res.end();
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error,
    });
  }
});

// To get all the stocks topics
app.get("/list", async (_, res) => {
  try {
    let topics = await listTopic();
    return res.json(topics);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error,
    });
  }
});

app.get("/chart/:symbol", async (req, res) => {
  try {
    const { symbol } = req.params;

    let interval: number;
    if (req.query.interval == null) {
      interval = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).getTime();
    } else {
      interval = parseInt(req.query.interval as string);
    }

    const validate = await validateSymbol(symbol);

    if (!validate) {
      return res.status(400).json({
        error: "Symbol is not listed",
      });
    }

    // create topic with symbol
    const topicName = await createTopic(
      symbol.toLowerCase().replaceAll(".", "-")
    );

    const chart = await yahooFinance.chart(symbol, {
      period1: new Date(interval), // 1 year ago
      period2: new Date(), // Now
      interval: "1h",
    });
    const { quotes } = chart;

    return res.json({
      topic: topicName,
      quotes,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error,
    });
  }
});

app.get("/search", async (req, res) => {
  try {
    const q = req.query.q as string;

    const results = await yahooFinance.search(q);

    const { quotes } = results;

    const quotesName = quotes
      .map((quote) => {
        return quote.symbol;
      })
      .filter((n) => n);

    return res.json(quotesName);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});
