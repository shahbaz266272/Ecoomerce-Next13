import React from "react";

import prismadb from "@/lib/prismadb";

import CategoryForm from "./components/category-form";

const CategoryPage = async ({
  params,
}: {
  params: {
    categoryId: string;
    storeId: string;
  };
}) => {
  const categories = await prismadb.category.findUnique({
    where: {
      id: params?.categoryId,
    },
  });
  const billboards = await prismadb.bilboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  console.log(billboards);
  return (
    <div className="flex-cpol">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm initialData={categories} billboards={billboards} />
      </div>
    </div>
  );
};

export default CategoryPage;
