import React from "react";
// Components
import ClientOnly from "../components/ClientsOnly";
import Container from "../components/Container";
import EmptyState from "../components/EmptyState";
import listings from "../enums/listing";
import ListingCard from "../components/listings/ListingCard";
// Redux
import { useAppDispatch, useAppSelector } from "../hooks/redux";

const Home = () => {
  const dispatch = useAppDispatch();
  const {
    auth: { loginUser },
  } = useAppSelector((state) => state);

  if (listings.length == 0) {
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
          {listings.map((listing: any) => (
            <ListingCard
              currentUser={loginUser}
              key={listing._id}
              data={listing}
            />
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
};

export default Home;
