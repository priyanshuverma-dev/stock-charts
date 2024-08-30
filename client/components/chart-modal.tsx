"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { chartModalState } from "@/lib/chart-modal-state";

import { useEffect, useState } from "react";

type ChartData = {
  id: string;
  name: string;
  symbol: string;
  chartHeight: string;
  chartWidth: string;
  classNames: string | null;
};

export default function ChartModal() {
  const modal = chartModalState();

  const [data, setData] = useState<ChartData | null>(null);

  useEffect(() => {
    if (!modal.id) {
      modal.onClose();
    }
    // Fetch the chart data from the API
    async function fetchChartData() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/fetch/${modal.id}`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const chartData = await response.json();
        setData(chartData);
      } catch (error: any) {
        console.log(error);
      }
    }

    fetchChartData();
  }, [modal.id]);

  if (!data) return null;
  return (
    <AlertDialog
      open={modal.isOpen}
      onOpenChange={() => {
        modal.onClose();
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{data.name}</AlertDialogTitle>
          <AlertDialogDescription>clientId: {data.id}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Back</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
