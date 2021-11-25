import React, { useState } from "react";
import { listReservations } from "../utils/api";
import ReservationTable from "../dashboard/reservationTable/ReservationTable";
import ErrorAlert from "../layout/ErrorAlert";

export default function Search() {
  const [reservations, setReservations] = useState([]);
  const [display, setDisplay] = useState(false);
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState(null);

  function changeHandler(e) {
    setMobile(e.target.value);
  }

  async function searchHandler(e) {
    e.preventDefault();
    const ac = new AbortController();
    try {
      const reservations = await listReservations(
        { mobile_number: mobile },
        ac.signal
      );
      setReservations(reservations);
      setDisplay(true);
    } catch (error) {
      setError(error);
    }
    return () => ac.abort();
  }

  return (
    <>
      <ErrorAlert error={error} />
      <div>
        <form onSubmit={searchHandler}>
          <input
            name="mobile_number"
            id="mobile_number"
            onChange={changeHandler}
            placeholder="Enter a customer's phone number"
            value={mobile}
            className="form-control"
            required
          />
          <button type="submit" className="btn btn-primary">
            Find
          </button>
        </form>
      </div>
      {display && (
        <div>
          {reservations.length ? (
            <ReservationTable reservations={reservations} />
          ) : (
            <h3>No reservations found</h3>
          )}
        </div>
      )}
    </>
  );
}
