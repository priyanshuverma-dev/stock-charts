"use client";

import { Chart } from "@prisma/client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { ExpandIcon } from "lucide-react";
import { chartModalState } from "@/lib/chart-modal-state";

const fetchData = async (): Promise<Chart[]> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/chart/getall`);

    if (res.status === 200) {
      const data = await res.json();
      return data as Chart[];
    } else {
      console.error("Failed to fetch charts", res.status);
      return [];
    }
  } catch (error) {
    console.error("Error fetching charts:", error);
    return [];
  }
};

export default function ChartsGrid() {
  const [charts, setCharts] = useState<Chart[]>([]);
  const [loading, setLoading] = useState(true);

  const modal = chartModalState();
  useEffect(() => {
    const loadCharts = async () => {
      const data = await fetchData();
      setCharts(data);
      setLoading(false);
    };

    loadCharts();
  }, []);

  if (loading) {
    return (
      <div className="text-sm text-muted-foreground">Loading charts...</div>
    );
  }

  return (
    <>
      {charts.length <= 0 ? (
        <div className="text-sm text-muted-foreground">No Charts</div>
      ) : (
        charts.map((chart) => (
          <Card key={chart.id} className="mb-4">
            <CardHeader>
              <CardTitle>{chart.name}</CardTitle>
              <CardDescription>
                For {chart.symbol.toUpperCase()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Last updated: {new Date(chart.updatedAt).toLocaleDateString()}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => modal.onOpen(chart.id)}
                >
                  <ExpandIcon className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </>
  );
}
