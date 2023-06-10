import { useEffect } from "react";
// Components
import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientsOnly";
import TripsClient from "../components/listings/TripsClient";
// Redux
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { getReservations } from "../redux/actions/Reservation";

const TripsPage = () => {
  const dispatch = useAppDispatch();

  const {
    auth: { loginUser },
    reservation: { reservations },
  } = useAppSelector((state) => state);

  useEffect(() => {
    dispatch(getReservations());
  }, []);

  if (!loginUser?.is_success) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );
  }

  if (reservations?.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No reservations found"
          subtitle="Looks like you havent reserved any trips."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <TripsClient
        reservations={reservations}
        currentUser={loginUser?.result}
      />
    </ClientOnly>
  );
};

export default TripsPage;
