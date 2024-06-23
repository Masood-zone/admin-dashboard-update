import { useQuery } from "react-query";
import axios from "axios";
import { Button } from "../../components/ui/button";
import DataTable from "./table/table";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { useModal } from "../../lib/utils/useModal";
import Loader, { ButtonLoading } from "../../components/loader";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { useForm } from "react-hook-form";
import { useState } from "react";
const fetchInventory = async () => {
  const res = await axios.get("http://localhost:3000/products");
  return res.data;
};

function Inventory() {
  const {
    data: inventory,
    isLoading,
    error,
  } = useQuery("inventory", fetchInventory);
  const { showDelete, toggleCancel } = useModal();
  const [loading, setLoading] = useState(false);
  const columns: ColumnDef<Products>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("price")}</div>
      ),
    },
    {
      accessorKey: "expiry_date",
      header: "Expiry Date",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("expiry_date")}</div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      enableHiding: false,
      cell: ({ row }) => {
        const ledger = row?.original;
        return (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">open menu</span>
                  <MoreVertical className="h-5 w-5 rounded-full bg-[#434BB4] text-white" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="border-none" align="end">
                <DropdownMenuItem
                  onClick={() => {
                    console.log("Delete", ledger.id);
                    toggleCancel();
                  }}
                  className="text-red-600"
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {showDelete && (
              <main className="fixed inset-0 z-[1] bg-black bg-opacity-50 flex flex-col items-center justify-center">
                {/* Delete modal content */}
                <div className="bg-white p-5 rounded-lg w-[455px] h-auto">
                  <div className="flex flex-col items-center justify-center">
                    <h2 className="text-2xl font-bold font-inter text-center py-3">
                      Are you sure you want to delete this ledger?
                    </h2>
                    <p className="text-lg text-center py-3">
                      <span className="text-red-600">Warning:</span> deleting
                      your ledger is irreversible. This action cannot be undone.
                    </p>
                  </div>
                  <div className="flex justify-end mt-4">
                    <button
                      className="shadow m-2 font-medium"
                      onClick={() => {
                        toggleCancel();
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="shadow m-2 font-medium text-red-600"
                      onClick={() => {
                        console.log("Delete", ledger.id);
                        toggleCancel();
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </main>
            )}
          </>
        );
      },
    },
  ];
  const { register, handleSubmit, reset } = useForm<Products>();
  const onSubmit = async (data: Products) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/products", data);
      setLoading(false);
      reset();
      return response.data;
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col items-start">
      <div className="bg-white shadow-lg rounded-2xl w-full">
        <div className="flex items-center justify-between p-4 border-b-2 ">
          <h2 className="text-2xl uppercase">Main Inventory</h2>
          <div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>+ Inventory</Button>
              </DialogTrigger>
              <DialogContent className="">
                <DialogHeader>
                  <DialogTitle className="text-2xl">Add Inventory</DialogTitle>
                  <DialogDescription className="text-base">
                    Add more product inventories to your store.
                  </DialogDescription>
                </DialogHeader>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="grid gap-4 py-4"
                >
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-left text-base">
                      Name
                    </Label>
                    <Input
                      {...register("name")}
                      id="name"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="price" className="text-left text-base">
                      Price
                    </Label>
                    <Input
                      {...register("price")}
                      id="price"
                      type="number"
                      defaultValue="1"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label
                      htmlFor="expiry_date"
                      className="text-left text-base"
                    >
                      Expiry Date
                    </Label>
                    <Input
                      {...register("expiry_date")}
                      id="expiry_date"
                      type="date"
                      className="col-span-3"
                    />
                  </div>
                  <DialogFooter>
                    {loading ? (
                      <ButtonLoading loading={loading} />
                    ) : (
                      <Button className="w-full" type="submit">
                        Add
                      </Button>
                    )}
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="m-5">
          {isLoading && (
            <div className="flex items-center justify-center h-96">
              <Loader />
            </div>
          )}
          {error && (
            <div className="flex items-center justify-center h-96 text-xl">
              <p>
                Error: <span className="text-red-600">{error.message}</span>
              </p>
            </div>
          )}
          {inventory !== undefined ? (
            <DataTable data={inventory} columns={columns} />
          ) : null}
          {/* <DataTable data={inventory} columns={columns} /> */}
        </div>
      </div>
    </section>
  );
}

export default Inventory;
