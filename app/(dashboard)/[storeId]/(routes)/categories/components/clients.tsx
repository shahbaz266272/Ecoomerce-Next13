"use client";

import React from "react";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { CategoryColumn, columns } from "./columns";
import { ApiList } from "@/components/ui/api-list";

interface billboardProps {
  data: CategoryColumn[];
}

const CategoriesClient: React.FC<billboardProps> = ({ data }) => {

   const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Categories (${data?.length})`}
          description="Manage categories for your store"
        />

        <Button onClick={() => router.push(`/${params.storeId}/categories/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add&nbsp;New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
      <Heading title="API" description="Api calls for categories" />
      <Separator />
      <ApiList entityName="categories" entityIdName="categoriesId" />
    </>
  );
};

export default CategoriesClient;
