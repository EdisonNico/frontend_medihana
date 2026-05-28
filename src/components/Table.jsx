import React from 'react'
import '../styles/tables.css'

const Table = ({ columns, data, actions }) => {
  return (
    <div className="table-responsive">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((col, idx) => (
              <th key={idx}>{col.label}</th>
            ))}
            {actions && <th>Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIdx) => (
            <tr key={row.id || rowIdx}>
              {columns.map((col, colIdx) => (
                <td key={colIdx}>{row[col.key]}</td>
              ))}
              {actions && (
                <td className="actions-cell">
                  {actions.map((action, i) => (
                    <button
                      key={i}
                      className={`action-btn ${action.className}`}
                      onClick={() => action.handler(row)}
                    >
                      {action.icon} {action.label}
                    </button>
                  ))}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table