"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { usePathname, useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

import { Check, ChevronsUpDown, X } from "lucide-react";
import toast from "react-hot-toast";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";

const formSchema = z.object({
  name: z.string().min(3),
  symbol: z.string().min(3),
  classNames: z.string().optional(),
  chartHeight: z.string().optional(),
  chartWidth: z.string().optional(),
});

export default function CreateChartModal() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [stocks, setStocks] = React.useState<string[]>([]);
  const [query, setQuery] = React.useState<string>("");
  const r = usePathname();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      chartHeight: "200",
      name: "",
      symbol: "",
    },
  });
  async function fetchStocks(query: string) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/search?q=${query}`
      );
      const data = await response.json();
      setStocks((prev) => data || []);
    } catch (error) {
      console.error("Failed to fetch stocks", error);
      toast.error("Failed to fetch stocks");
    }
  }

  React.useEffect(() => {
    if (query.length >= 2) {
      fetchStocks(query);
    } else {
      setStocks([]); // Clear the list if the query is too short
    }
  }, [query]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);

      const res = await fetch("/api/chart", {
        method: "POST",
        body: JSON.stringify(values),
      });

      const data = await res.json();
      if (res.status != 200) throw new Error(data.error);
      toast.success(`Chart Created!`);
      router.back();
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AlertDialog
      open={r === "/chart/create"}
      onOpenChange={(open) => !open && router.push("/dashboard")}
    >
      <AlertDialogContent>
        <AlertDialogHeader className="flex justify-between items-center flex-row">
          <AlertDialogTitle>Create Chart</AlertDialogTitle>

          <AlertDialogCancel
            disabled={loading}
            className="border-none p-1 rounded-full"
          >
            <X />
          </AlertDialogCancel>
        </AlertDialogHeader>
        <AlertDialogDescription className="!text-left">
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  disabled={loading}
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Chart Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Amazon Chart" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="symbol"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Stock Symbol</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-[200px] justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? stocks.find(
                                    (symbol) => symbol === field.value
                                  )
                                : "Select symbol"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command
                            onChange={(e: any) => setQuery(e.target.value)}
                          >
                            <CommandInput placeholder="Search symbol..." />
                            <CommandList>
                              <CommandEmpty>write to search.</CommandEmpty>
                              <CommandGroup>
                                {stocks.map((symbol) => (
                                  <CommandItem
                                    value={symbol}
                                    key={symbol}
                                    onSelect={() => {
                                      form.setValue("symbol", symbol);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        symbol === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {symbol}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button disabled={loading} type="submit" className="w-full">
                  {loading ? "Creating..." : "Create"}
                </Button>
              </form>
            </Form>
          </div>
        </AlertDialogDescription>
      </AlertDialogContent>
    </AlertDialog>
  );
}
