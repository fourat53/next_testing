"use client";

import { createProduct } from "@/actions/ProductActions";
import { createOrder } from "@/actions/OrderActions";
import { createUser } from "@/actions/UserActions";
import { createCart } from "@/actions/CartActions";

import { Select, type SelectOption } from "@/components/form-items/select";
import { Input } from "@/components/form-items/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { IconPlus } from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

const roleItems: SelectOption[] = [
  { label: "User", value: "USER" },
  { label: "Admin", value: "ADMIN" },
  { label: "Guest", value: "GUEST" },
];

const orderStatusItems: SelectOption[] = [
  { label: "Pending", value: "PENDING" },
  { label: "Processing", value: "PROCESSING" },
  { label: "Shipped", value: "SHIPPED" },
  { label: "Delivered", value: "DELIVERED" },
  { label: "Cancelled", value: "CANCELLED" },
];

export default function CreateButton() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  let entity = "";
  if (pathname.includes("/users")) entity = "user";
  else if (pathname.includes("/products")) entity = "product";
  else if (pathname.includes("/orders")) entity = "order";
  else if (pathname.includes("/carts")) entity = "cart";

  if (!entity) return null;

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (entity === "user") {
      await createUser(formData);
    } else if (entity === "product") {
      await createProduct(formData);
    } else if (entity === "order") {
      await createOrder(formData);
    } else if (entity === "cart") {
      await createCart(formData);
    }

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-xl">
          <IconPlus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Create New {entity.charAt(0).toUpperCase() + entity.slice(1)}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 pt-2">
          {entity === "user" && (
            <>
              <Input
                id="firstName"
                name="firstName"
                label="First Name"
                required
              />
              <Input id="lastName" name="lastName" label="Last Name" required />
              <Input
                id="email"
                name="email"
                type="email"
                label="Email"
                required
              />
              <Select
                label="Role"
                name="role"
                defaultValue="USER"
                placeholder="Select role"
                items={roleItems}
              />
            </>
          )}

          {entity === "product" && (
            <>
              <Input id="name" name="name" label="Name" required />
              <Input id="brand" name="brand" label="Brand" />
              <Input
                id="price"
                name="price"
                type="number"
                label="Price ($)"
                step="0.01"
                defaultValue={5}
                required
              />
              <Input
                id="inventory"
                name="inventory"
                type="number"
                label="Inventory"
                defaultValue={1}
                required
              />
              <Input id="description" name="description" label="Description" />
            </>
          )}

          {entity === "order" && (
            <>
              <Input
                id="orderDate"
                name="orderDate"
                type="date"
                label="Order Date"
                defaultValue={Date.now()}
                required
              />
              <Input
                id="totalAmount"
                name="totalAmount"
                type="number"
                label="Total Amount ($)"
                step="1"
                defaultValue={1}
                required
              />
              <Select
                label="Order Status"
                name="orderStatus"
                defaultValue="PENDING"
                placeholder="Select status"
                items={orderStatusItems}
              />
              <Input
                id="userId"
                name="userId"
                type="number"
                label="User ID"
                required
              />
            </>
          )}

          {entity === "cart" && (
            <>
              <Input
                id="userId"
                name="userId"
                type="number"
                label="User ID"
                required
              />
              <Input
                id="totalAmount"
                name="totalAmount"
                type="number"
                label="Total Amount ($)"
                step="1"
                defaultValue={1}
                required
              />
            </>
          )}

          <div className="w-full pt-4">
            <Button type="submit" className="w-full">
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
