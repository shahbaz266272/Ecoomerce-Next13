import prismadb from "@/lib/prismadb";
import React from "react";
import SizeForm from "./components/size-form";

const BillboardPage = async ({
  params,
}: {
  params: {
    sizeId: string;
  };
}) => {
  const sizes = await prismadb.size.findUnique({
    where: {
      id: params?.sizeId,
    },
  });

  return (
    <div className="flex-cpol">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm initialData={sizes} />
      </div>
    </div>
  );
};

export default BillboardPage;
