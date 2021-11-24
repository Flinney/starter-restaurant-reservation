import React from "react";
import { useHistory } from "react-router";
import { unassignTable } from "../../utils/api";

export default function FinishButton({ status, table, loadDashboard }) {
  const history = useHistory();

  async function handleClick() {
    console.log("You made it here.");
    return window.confirm(
      "Is this table ready to seat new guests? This cannot be undone."
    )
      ? await handleFinish(table.table_id)
      : null;
  }

  async function handleFinish(table_id) {
    await unassignTable(table_id);
    loadDashboard();
    history.push("/dashboard");
  }

  return (
    status === "Occupied" && (
      <td>
        <button
          data-table-id-finish={table.table_id}
          type="button"
          onClick={handleClick}
          className="btn btn-sm btn-primary"
        >
          Finish
        </button>
      </td>
    )
  );
}
