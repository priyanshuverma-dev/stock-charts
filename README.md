# Realtime - Stock Charts with Fluvio

This repository contains a complete system for fetching and visualizing real-time stock market data. It includes:

1. **Server**: A backend service for fetching stock prices.
2. **Client**: A web application for displaying stock price charts.
3. **HTTP Sources**: Configuration files for defining data sources.

## Demo Video

[Youtube link](https://youtu.be/juJXBffE9jw)

## Overview

- **Server**: Provides a REST API to get current stock prices and a streaming endpoint for real-time updates. (uses [fluvio](https://www.fluvio.io/))
- **Client**: A React-based application that visualizes stock prices using Recharts and Tailwind CSS.
- **HTTP Sources**: YAML configuration files used to define the sources from which data is fetched. (for [fluvio](https://www.fluvio.io/))

## Project Structure

```
/
├── server/
│   ├── index.ts           # Main server code
│   └── README.md          # Server setup and usage
├── client/
│   ├── components/
│   │   │
│   │   ├── StockChart.tsx  # Main chart component
│   │   └── StockSwitch.tsx  # Component for toggling stock charts
│   ├── tailwind.config.js  # Tailwind CSS configuration
│   ├── package.json       # Client dependencies and scripts
│   └── README.md          # Client setup and usage
└── http-sources/
    ├── example-source.yml  # Example YAML file for defining HTTP sources
    ├── deploy.sh          # Script for deploying and creating Fluvio topics
    └── README.md          # HTTP sources setup and usage
```

## Setup Instructions

### Server

1. **Navigate to the Server Directory**

   ```bash
   cd server
   ```

2. **Install Dependencies**

   ```bash
   bun install
   ```

3. **Run the Server**

   ```bash
   bun dev
   ```

   The server will be available at `http://localhost:8080`.

4. **API Endpoints**

   - **Get Price**: `GET /price?symbol={symbol}`
   - **Stream Data**: `GET /stream/{topic}`

### Client

1. **Navigate to the Client Directory**

   ```bash
   cd client
   ```

2. **Install Dependencies**

   ```bash
   bun install
   ```

3. **Run the Development Server**

   ```bash
   bun dev
   ```

   The client application will be available at `http://localhost:3000`.

4. **Usage**

   - **Default Symbol**: The chart defaults to the symbol `appl`. Specify a different symbol with the query parameter, e.g., `?symbol=amzn`.
   - **Toggle Charts**: Use the button to show or hide additional stock charts.

### HTTP Sources

1. **Navigate to the HTTP Sources Directory**

   ```bash
   cd http-sources
   ```

2. **Install Required Fluvio Package** (optional `deploy.sh` installs it automatically)

   ```bash
   cdk hub download infinyon/http-source@0.3.8
   ```

3. **Give execution Permission to `deploy.sh`**

   ```bash
   chmod +x deploy_and_create_topics.sh
   ```

4. **Deploy and Create Topics**

   Use the provided script to deploy sources and create topics based on the YAML configuration files:

   ```bash
   ./deploy.sh
   ```

## HTTP Sources Configuration

- **YAML Files**: Place your source configuration files in the `http-sources` directory. Follow the format provided in `example-source.yml`.
