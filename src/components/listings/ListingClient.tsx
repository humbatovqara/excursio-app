import React, { useCallback, useEffect, useMemo, useState } from "react";
// Components
import Container from "../Container";
import ListingHead from "./ListingHead";
import ListingInfo from "./ListingInfo";
import ListingReservation from "./ListingReservation";
// React Router
import { useNavigate } from "react-router-dom";
// Redux
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { authSlice } from "../../redux/reducers/AuthSlice";
import { postReservations } from "../../redux/actions/Reservation";
// Libs
import { Range } from "react-date-range";
import { differenceInDays, eachDayOfInterval } from "date-fns";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingClientProps {
  reservations?: any[];
  listing: any & {
    user: any;
  };
  currentUser?: any | null;
}

const getLocalTimezoneOffset = () => {
  const currentDate = new Date();
  return currentDate.getTimezoneOffset() * 60000;
};

const calculatePostTime = (date: any) => {
  const localOffset = getLocalTimezoneOffset();
  const adjustedDate = new Date(date.getTime() - localOffset);
  return adjustedDate.toISOString().split("T")[0];
};

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  reservations = [],
  currentUser,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { onOpen } = authSlice.actions;
  const {
    auth: { loginModal, loginUser },
  } = useAppSelector((state) => state);

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.check_in),
        end: new Date(reservation.check_out),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const onCreateReservation = useCallback(() => {
    if (!loginUser?.is_success) {
      return dispatch(onOpen());
    } else {
      setIsLoading(true);

      dispatch(
        postReservations({
          price: totalPrice,
          check_in: calculatePostTime(dateRange?.startDate),
          check_out: calculatePostTime(dateRange?.endDate),
          room_id: listing?.id,
        })
      );
      setDateRange(initialDateRange);
      navigate("/reservations");
    }
  }, [totalPrice, dateRange, listing?.id, navigate, loginUser, loginModal]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

  return (
    <Container>
      <div
        className="
          max-w-screen-lg 
          mx-auto
        "
      >
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.photos[0].url}
            locationValue={[listing.address_state, listing.address_city]}
            id={listing.id}
            currentUser={currentUser}
          />
          <div
            className="
              grid 
              grid-cols-1 
              md:grid-cols-7 
              md:gap-10 
              mt-6
            "
          >
            <ListingInfo
              user={currentUser.result}
              category={listing.amenities}
              description={listing.description}
              roomCount={listing.room_count}
              guestCount={listing.max_guest_count}
              bathroomCount={listing.bed_count}
              locationValue={[listing.latitude, listing.longitude]}
            />
            <div
              className="
                order-first 
                mb-10 
                md:order-last 
                md:col-span-3
              "
            >
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
