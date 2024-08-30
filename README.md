# StockViz

## Realtime - Stock Charts with Fluvio

This repository contains a complete system for fetching and visualizing real-time stock market data. It includes:

1. **Server**: A backend service for fetching stock prices.
2. **Client**: A web application for displaying stock price charts.
3. **Fluvio**: Configuration files for fluvio cloud deployment.

## Demo Video

[Youtube link](https://youtu.be/juJXBffE9jw)

## Overview

- **Server**: Provides a REST API to get current stock prices and a streaming endpoint for real-time updates. (uses [fluvio](https://www.fluvio.io/))
- **Client**: A React-based application that visualizes stock prices using Recharts and Tailwind CSS.
- **Fluvio**: YAML configuration files used to define the sources to sync data and docker files. (for [fluvio](https://www.fluvio.io/))

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

   The server will be available at `http://localhost:5000`.

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

### Fluvio

1. **Navigate to the Fluvio Directory**

   ```bash
   cd fluvio
   ```

2. **Install Required Fluvio Package**

   ```bash
   cdk hub download infinyon/http-source@0.3.8
   ```

3. **Create a topic**

   ```bash
   fluvio topic create stocks-sinker
   ```

4. **Deploy Sinker**
   ```bash
   cdk deploy start --ipkg ./infinyon-http-source-0.3.8.ipkg -c ./sinker.yml
   ```

### Widget Scripts

You will find widget Scripts in `widget/dist/` to add in website.
