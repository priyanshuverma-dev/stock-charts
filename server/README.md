## Server for the stocks data stream


## Overview

This server provides two main functionalities:
1. **Current Share Price Retrieval**: Fetches the current market price of a specified stock symbol using the Yahoo Finance API.
2. **Real-time Streaming Data**: Streams real-time data from a Fluvio topic to clients via Server-Sent Events (SSE).

The server is built with Node.js, Express, and integrates with Yahoo Finance and Fluvio.

## Features

- **Price Endpoint**: Retrieve the current price of a stock. Defaults to Apple Inc. (AAPL) but can be changed via query parameters.
- **Stream Endpoint**: Stream real-time data from a specified Fluvio topic.

## Setup

### Prerequisites

- Node.js (v18 or higher recommended)
- bun (or npm)
- Fluvio client library (`@fluvio/client`)
- Yahoo Finance API library (`yahoo-finance2`)

### Installation

1. **Install dependencies**:

    ```bash
    bun install
    ```

2. **Set environment variables**:

    Ensure you have an environment variable `PORT` set, or it will default to `8080`.

### Configuration

No additional configuration is required. The server uses default settings for both endpoints.

## Usage

### Start the Server

To start the server, run:

```bash
bun dev
```


The server will start and listen on the port defined by `PORT` or default to `8080`.

### Endpoints

#### 1. Current Share Price

- **URL**: `/price`
- **Method**: `GET`
- **Query Parameters**:
  - `symbol` (optional): The stock symbol to retrieve the price for. Defaults to `AAPL` if not specified.
- **Response**:
  - `symbol`: The stock symbol.
  - `price`: The current price of the stock (with an additional random value for demonstration purposes).
  - `time`: The timestamp of the response.

**Example Request**:

```
GET http://localhost:8080/price?symbol=MSFT
```

**Example Response**:

```json
{
  "symbol": "MSFT",
  "price": 342.15,
  "time": 1692294246794
}
```

#### 2. Real-time Streaming Data

- **URL**: `/stream/:topic`
- **Method**: `GET`
- **URL Parameters**:
  - `topic`: The Fluvio topic to stream data from.
- **Response**: Streams data in Server-Sent Events (SSE) format.

**Example Request**:

```
GET http://localhost:8080/stream/my-topic
```

**Example Response**:

```sse
{"symbol":"MSFT","price": 342.15,"time": 1692294246794}

{"symbol":"MSFT","price": 344.11,"time": 1692294246795}
```

## Error Handling

- For `/price`: Returns a `500` status code and error message if there is an issue retrieving the price.
- For `/stream`: Returns a `500` status code and error message if there is an issue with streaming.
