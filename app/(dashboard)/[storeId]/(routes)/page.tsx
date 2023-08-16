import prismadb from "@/lib/prismadb";
import React from "react";

interface DashboardProps {
  params: { storeId: string };
}

const DashboardPage: React.FC<DashboardProps> = async ({ params }) => {
  const store = await prismadb.store.findFirst({
    where: {
      id: params?.storeId,
    },
  });

  return (
    <div>
      Active Store is <span className="text-green-500">{store?.name}</span>
    </div>
  );
};

export default DashboardPage;
