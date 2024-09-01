# StockViz

## Realtime - Stock Charts with Fluvio

This repository contains a complete system for fetching and visualizing real-time stock market data. It includes:

1. **Server**: A backend service for fetching stock prices.
2. **Client**: A web application for displaying stock price charts.
3. **Fluvio**: Configuration files for Fluvio cloud deployment.

## Demo

[Live Preview](https://stockviz.vercel.app/)

[Vote on Quira ✅️](https://quira.sh/repo/priyanshuverma-dev-stock-charts-843820386?utm_source=copy&utm_share_context=quests_creators)

[Youtube link](https://youtu.be/juJXBffE9jw)

## Overview

- **Server**: Provides a REST API to get current stock prices and a streaming endpoint for real-time updates. (uses [Fluvio](https://www.fluvio.io/))
- **Client**: A React-based application that visualizes stock prices using Recharts and Tailwind CSS.
- **Fluvio**: YAML configuration files used to define the sources to sync data and Docker files. (for [Fluvio](https://www.fluvio.io/))

## Setup Instructions

#### Server

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

#### Client

1. **Navigate to the Client Directory**

   ```bash
   cd client
   ```

2. **Create a `.env` File**

   In the `client` directory of the project, create a file named .env with the following content:

   ```env
   AUTH_SECRET="changeMe"
   AUTH_GITHUB_ID="<github-id>"
   AUTH_GITHUB_SECRET="<github-secret>"
   NEXT_PUBLIC_SERVER_URL="http://localhost:8000"
   NEXT_PUBLIC_URL="http://localhost:3000"
   DATABASE_URL="<mongodb>"
   ```

3. **Install Dependencies**

   ```bash
   bun install
   ```

4. **Generate Prisma Schema**

   ```bash
   npx prisma db push
   ```

5. **Run the Development Server**

   ```bash
   bun dev
   ```

   The client application will be available at `http://localhost:3000`.

#### Fluvio

1. **Navigate to the Fluvio Directory**

   ```bash
   cd fluvio
   ```

2. **Install Required Fluvio Package**

   ```bash
   cdk hub download infinyon/http-source@0.3.8
   ```

3. **Create a Topic**

   ```bash
   fluvio topic create stocks-sinker
   ```

4. **Deploy Sinker**

   ```bash
   cdk deploy start --ipkg ./infinyon-http-source-0.3.8.ipkg -c ./sinker.yml
   ```

### Widget Scripts

To see widget open `widget/index.html` in root and change its `div` id with locally created id and
open in browser.

You will find widget scripts in `widget/dist/` to add to your website.
You need to build widget again after any change in `widget` folder by:

```bash
bun run build
```
