# Stock Chart Client

This project provides a real-time stock price chart for various stock symbols using data streamed from a backend server. It leverages React, Recharts, and Tailwind CSS for UI and styling.

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18 or later)
- [fluvio cli](https://www.fluvio.io/)

## Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

2. **Install Dependencies**

   Using bun:

   ```bash
   bun install
   ```

3. **Configure Environment**

   Ensure you have a running backend server at `http://localhost:8080` that provides stock price data via SSE (Server-Sent Events) at the endpoint `/stream/{symbol}`.

4. **Run the Development Server**

   Start the development server:

   Using Yarn:

   ```bash
   yarn dev
   ```

   Or using npm:

   ```bash
   npm run dev
   ```

   Your application will be available at `http://localhost:3000`.

5. **Usage**

   - **Default Symbol**: The chart will display data for the stock symbol specified in the URL query parameter, e.g., `?symbol=appl`. If no symbol is specified, it defaults to `appl`.
   - **Toggle Other Charts**: Use the "Show Other Charts" button to display additional stock charts.

## Key Files

- **`StockChart.tsx`**: Main component for rendering the stock price chart.
- **`StockSwitch.tsx`**: Component for toggling between different stock charts.

## Troubleshooting

- **Backend Server**: Ensure the backend server is running and accessible at `http://localhost:8080`. Verify the endpoint `/stream/{symbol}` is correctly providing data.
- See Readme of every section `http-sources`, `server`.
