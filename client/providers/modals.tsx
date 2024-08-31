"use client";

import AuthModal from "@/components/auth-modal";
import CreateChartModal from "@/components/create-chart-form";
import ChartModal from "@/components/chart-modal";
import React, { useEffect, useState } from "react";
import { chartModalState } from "@/lib/chart-modal-state";

const ModalsProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  const modal = chartModalState();
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <AuthModal />
      <CreateChartModal />
      {modal.id != undefined && <ChartModal />}
    </>
  );
};

export default ModalsProvider;
