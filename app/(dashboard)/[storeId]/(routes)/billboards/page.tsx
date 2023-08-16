import React from "react";
import { format } from "date-fns";

import BillboardClient from "./components/clients";

import prismadb from "@/lib/prismadb";
import { BillBoardColumn } from "./components/columns";

const Billboards = async ({ params }: { params: { storeId: string } }) => {
  const billboards = await prismadb.bilboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBillboard: BillBoardColumn[] = billboards?.map((item) => ({
    id: item?.id,
    label: item?.label,
    createdAt: format(item?.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboard} />
      </div>
    </div>
  );
};

export default Billboards;
