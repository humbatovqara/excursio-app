import React, { useEffect } from "react";
// Components
import ClientOnly from "../components/ClientsOnly";
import Container from "../components/Container";
import EmptyState from "../components/EmptyState";
import ListingCard from "../components/listings/ListingCard";
// Redux
import { useAppSelector } from "../hooks/redux";

const Home = () => {
  const {
    auth: { loginUser },
    room: { allRooms },
  } = useAppSelector((state) => state);

  if (allRooms?.result?.length == 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div
          className="
            pt-24
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
          {allRooms?.result?.map((listing: any) => (
            <ListingCard
              currentUser={loginUser}
              key={listing.id}
              data={listing}
            />
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
};

export default Home;
