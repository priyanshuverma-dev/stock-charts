import Fluvio, { type Topic } from "@fluvio/client";

const fluvio = new Fluvio();

const fluvioClient = async () => await fluvio.connect();
const fluvioAdmin = async () => {
  await fluvio.connect();
  return await fluvio.admin();
};

const listTopic = async (): Promise<string[]> => {
  const admin = await fluvioAdmin();
  let topicsStr = await admin.listTopic();

  let topics = JSON.parse(topicsStr);

  let payload: string[] = topics.map((topic: Topic) => {
    return topic.name;
  });

  const rmIndx = payload.findIndex((t) => t == "stocks-sinker");
  payload.splice(rmIndx, 1);

  return payload;
};

const createTopic = async (topic: string) => {
  const admin = await fluvioAdmin();
  const topics = await listTopic();

  if (topics.includes(topic)) {
    return topic;
  } else {
    const name = await admin.createTopic(topic);
    return name;
  }
};

export { fluvio, fluvioAdmin, fluvioClient, createTopic, listTopic };
