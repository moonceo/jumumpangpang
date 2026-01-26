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
import { RefreshCw, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface OrderTableProps {
    data: Order[];
    columns: ColumnDef<Order>[];
    onTrackingClick?: (order: Order) => void;
    onWarehouseClick?: (order: Order) => void;
    onSourcingClick?: (order: Order) => void;
    onHistoryClick?: (order: Order) => void;
    onSourcingManagementClick?: (order: Order) => void;
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
    viewMode
}: OrderTableProps) {
    const [sorting, setSorting] = React.useState<SortingState>([
        { id: "orderDate", desc: true }
    ]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [expanded, setExpanded] = React.useState({});

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
        onRowSelectionChange: setRowSelection,
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
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 flex-1 max-w-xl">


                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground mr-2">마지막 업데이트: 방금 전</span>
                </div>
            </div>

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
                                        className="group"
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
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}
