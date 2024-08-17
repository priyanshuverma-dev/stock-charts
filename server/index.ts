import yahooFinance from "yahoo-finance2";

import Express from "express";
import cors from "cors";
import Fluvio, { Offset, type Record, type Topic } from "@fluvio/client";

const PORT = process.env.PORT || 8080;

const app = Express();
app.use(cors());

// To get current price of share (default to APPL) can be changed if add query `?symbol=MSFT`
app.get("/price", async (req, res) => {
  try {
    let symbol: string;
    if (req.query.symbol == null) {
      symbol = "AAPL";
    } else {
      symbol = String(req.query.symbol);
    }

    const quote = await yahooFinance.quote(symbol);
    const { regularMarketPrice } = quote;

    const payload = {
      symbol: symbol,
      price: regularMarketPrice,
      time: Date.now(),
    };

    return res.json(payload);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error,
    });
  }
});

const PARTITION = 0;
const fluvio = new Fluvio();

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
    const consumer = await client.partitionConsumer(topic, PARTITION);
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
    await fluvio.connect();
    let admin = await fluvio.admin();
    let topicsStr = await admin.listTopic();

    let topics = JSON.parse(topicsStr);

    let payload = topics.map((topic: Topic) => {
      return {
        name: topic.name,
      };
    });

    return res.json(payload);
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
