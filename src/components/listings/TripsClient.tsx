"use client";
import { useCallback, useState } from "react";
// Libs
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux";
// Components
import Heading from "../Heading";
import Container from "../Container";
import ReservationCard from "./ReservationCard";
// Redux
import { deleteReservations } from "../../redux/actions/Reservation";

interface TripsClientProps {
  reservations: any;
  currentUser?: any;
}

const TripsClient: React.FC<TripsClientProps> = ({
  reservations,
  currentUser,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      dispatch(deleteReservations(id));
    },
    [navigate]
  );

  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Where you've been and where you're going"
      />
      <div
        className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
      >
        {reservations?.result.map((reservation: any) => (
          <ReservationCard
            key={reservation.id}
            data={reservation.room}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default TripsClient;
