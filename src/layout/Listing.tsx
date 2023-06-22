import { useEffect } from "react";
import { useParams } from "react-router-dom";
// Components
import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientsOnly";
import ListingClient from "../components/listings/ListingClient";
// Redux
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { getRoomId } from "../redux/actions/Room";

function Listing() {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const {
    auth: { loginUser },
    room: { room },
  } = useAppSelector((state) => state);

  const listing = room?.result;

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ListingClient listing={listing} currentUser={loginUser} />
    </ClientOnly>
  );
}

export default Listing;
