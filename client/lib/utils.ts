import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const codeSnippet = `
<-- Add both in your website css in head and script in body -->
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/gh/priyanshuverma-dev/stock-charts/widget/dist/bundle.css"
/>

<script
  src="https://cdn.jsdelivr.net/gh/priyanshuverma-dev/stock-charts/widget/dist/bundle.js"
  >
</script>

<-- Add a div anywhere you want to embed chart -->
<-- replace 'chart-id' from the one you get from dashboard -->

<div id="chart-id"></div>


`;
