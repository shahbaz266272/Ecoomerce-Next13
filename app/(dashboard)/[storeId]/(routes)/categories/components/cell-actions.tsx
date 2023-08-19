"use client";
import React, { useState } from "react";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

import { CategoryColumn } from "./columns";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import AlertModal from "@/components/modals/alert-modal";

interface CellActionsProps {
  data: CategoryColumn;
}

const CellActions: React.FC<CellActionsProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  const [open, setopen] = useState(false);
  const [loading, setloading] = useState(false);

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Billboard Id copied to the clipboard!");
  };

  const onDelete = async () => {
    try {
      setloading(true);
      await axios.delete(`/api/${params?.storeId}/categories/${data.id}`);
      router.refresh();
      // router.push("/");
      toast.success("Category Deleted!");
    } catch (error) {
      toast.error(
        "Make Sue to remove all products using this billboard first!"
      );
    } finally {
      setloading(false);
      setopen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setopen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open Menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="cursor-pointer">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() =>
              router.push(`/${params.storeId}/categories/${data.id} `)
            }
          >
            <Edit className="mr-2 h-4 w-4" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className="mr-2 h-4 w-4" />
            Copy&nbsp;Id
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setopen(true)}>
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellActions;
