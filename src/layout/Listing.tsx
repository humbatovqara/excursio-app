import { useParams } from "react-router-dom";
// Static
import listings from "../enums/listing";
// Components
import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientsOnly";
import ListingClient from "../components/listings/ListingClient";
// Redux
import { useAppSelector } from "../hooks/redux";

function Listing() {
  const { id } = useParams();
  const {
    auth: { loginUser },
  } = useAppSelector((state) => state);

  const listing = listings.find((item) => item._id === Number(id));

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
