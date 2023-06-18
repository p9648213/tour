import { Fragment } from "react";

export default function Table({ data, config, keyFn }) {
  if (!data || data.length === 0) {
    return (
      <div className="user-view__maintenance">
        <div>You haven&apos;t booked any tours yet! </div>
      </div>
    );
  }

  const renderedHeaders = config.map((column) => {
    if (column.header) {
      return <Fragment key={column.label}>{column.header()}</Fragment>;
    }

    return <th key={column.label}>{column.label}</th>;
  });

  const renderedRows = data.map((rowData) => {
    const renderedCells = config.map((column) => {
      return (
        <td className="table-cell" key={column.label}>
          {column.render(rowData)}
        </td>
      );
    });

    return <tr key={keyFn(rowData)}>{renderedCells}</tr>;
  });

  return (
    <table className="table">
      <thead>
        <tr className="table-header">{renderedHeaders}</tr>
      </thead>
      <tbody>{renderedRows}</tbody>
    </table>
  );
}
