import React from 'react';

interface Column {
  header: string;
  accessor: string;
  sortable?: boolean;
  Cell?: React.FC<{ row: any }>;
}

interface TableProps {
  columns: Column[];
  data: any[];
  onSort?: (key: string) => void;
  sortConfig?: { key: string; direction: 'ascending' | 'descending' } | null;
}

const Table: React.FC<TableProps> = ({ columns, data, onSort, sortConfig }) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          {columns.map((column, index) => (
            <th
              key={index}
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => column.sortable && onSort && onSort(column.accessor)}
            >
              {column.header}
              {sortConfig && sortConfig.key === column.accessor && (
                <span>{sortConfig.direction === 'ascending' ? ' ▲' : ' ▼'}</span>
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column, colIndex) => (
              <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                {column.Cell ? (
                  <column.Cell row={row} />
                ) : (
                  column.accessor.split('.').reduce((obj, key) => obj && obj[key], row)
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
