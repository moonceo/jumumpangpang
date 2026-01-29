"use client";

import * as React from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    getExpandedRowModel,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExpandableRowContent } from "./expandable-row-content";
import { Order } from "@/types/order";
import { RefreshCw, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface OrderTableProps {
    data: Order[];
    columns: ColumnDef<Order>[];
    onTrackingClick?: (order: Order) => void;
    onWarehouseClick?: (order: Order) => void;
    onSourcingClick?: (order: Order) => void;
    onHistoryClick?: (order: Order) => void;
    onSourcingManagementClick?: (order: Order) => void;
    onPCCClick?: (order: Order) => void;
    onMemoSave?: (order: Order, memo: string) => void;
    onRowSelectionChange?: (rowSelection: Record<string, boolean>) => void;
    onDomesticTrackingClick?: (order: Order) => void;
    onAddSourcingClick?: (order: Order) => void;
    onPayShippingClick?: (order: Order) => void;
    viewMode?: 'NEW' | 'WAITING' | 'SHIPPING' | 'CLAIMS' | 'ALL';
}

export function OrderTable({
    data,
    columns,
    onTrackingClick,
    onWarehouseClick,
    onSourcingClick,
    onHistoryClick,
    onSourcingManagementClick,
    onPCCClick,
    onMemoSave,
    onRowSelectionChange,
    onDomesticTrackingClick,
    onAddSourcingClick,
    onPayShippingClick,
    viewMode
}: OrderTableProps) {
    const [sorting, setSorting] = React.useState<SortingState>([
        { id: "orderDate", desc: true }
    ]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({
        select: viewMode === 'NEW'
    });
    const [expanded, setExpanded] = React.useState({});
    const [rowSelection, setRowSelection] = React.useState({});

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: (updaterOrValue) => {
            const next = typeof updaterOrValue === 'function' ? updaterOrValue(rowSelection) : updaterOrValue;
            setRowSelection(next);
            onRowSelectionChange?.(next as Record<string, boolean>);
        },
        onExpandedChange: setExpanded,
        getExpandedRowModel: getExpandedRowModel(),
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            expanded,
        },
    });

    return (
        <div className="w-full space-y-4">

            <div className="rounded-md border bg-white dark:bg-zinc-900">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="bg-muted/50 hover:bg-muted/50">
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className="text-xs font-semibold h-9">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <React.Fragment key={row.id}>
                                    <TableRow
                                        data-state={row.getIsSelected() && "selected"}
                                        className="group cursor-pointer hover:bg-muted/30 transition-colors"
                                        onClick={() => row.toggleExpanded()}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id} className="py-2">
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                    {/* Expanded Row Content */}
                                    {row.getIsExpanded() && (
                                        <TableRow>
                                            <TableCell colSpan={columns.length} className="p-0 border-t">
                                                <ExpandableRowContent
                                                    order={row.original}
                                                    onTrackingClick={onTrackingClick}
                                                    onWarehouseClick={onWarehouseClick}
                                                    onSourcingClick={onSourcingClick}
                                                    onHistoryClick={onHistoryClick}
                                                    onSourcingManagementClick={onSourcingManagementClick}
                                                    onPCCClick={onPCCClick}
                                                    onMemoSave={onMemoSave}
                                                    onDomesticTrackingClick={onDomesticTrackingClick}
                                                    onAddSourcingClick={onAddSourcingClick}
                                                    onPayShippingClick={onPayShippingClick}
                                                    viewMode={viewMode}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </React.Fragment>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    주문이 없습니다.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    총 {table.getFilteredRowModel().rows.length}개의 주문이 있습니다.
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ChevronLeft className="h-4 w-4" />
                        <span className="sr-only">Previous Page</span>
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <ChevronRight className="h-4 w-4" />
                        <span className="sr-only">Next Page</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}
