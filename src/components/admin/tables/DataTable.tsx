import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  emptyMessage?: string;
  onRowClick?: (item: T) => void;
  getRowKey: (item: T) => string;
}

export default function DataTable<T>({
  columns,
  data,
  isLoading,
  emptyMessage = 'Nenhum item encontrado',
  onRowClick,
  getRowKey,
}: DataTableProps<T>) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-foreground/40" />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-12 text-foreground/60">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-border">
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  'text-left text-xs font-mono uppercase tracking-wider text-foreground/60 py-3 px-4',
                  col.className
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={getRowKey(item)}
              onClick={() => onRowClick?.(item)}
              className={cn(
                'border-b border-border/50 transition-colors',
                onRowClick && 'cursor-pointer hover:bg-secondary/50'
              )}
            >
              {columns.map((col) => (
                <td key={col.key} className={cn('py-4 px-4', col.className)}>
                  {col.render
                    ? col.render(item)
                    : (item as Record<string, unknown>)[col.key] as ReactNode}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
