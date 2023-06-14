import React, { useCallback, useMemo } from "react";
// Components
import Button from "../Button";
// Libs
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux";
// Redux
import { getRoomId } from "../../redux/actions/Room";
// Hooks
import useCountries from "../../hooks/useCountries";
// Enums
import API from "../../enums/api";

interface ListingCardProps {
  data: any;
  reservation?: any;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: any | null;
}

const ReservationCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { getByValue } = useCountries();

  const location = getByValue(data.address_zip_code);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.check_in);
    const end = new Date(reservation.check_out);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  const handleClickListingCard = () => {
    navigate(`/listings/${data.id}`);
    dispatch(getRoomId(data.id));
  };

  return (
    <div
      onClick={() => handleClickListingCard()}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div
          className="
            aspect-square 
            w-full 
            relative 
            overflow-hidden 
            rounded-xl
          "
        >
          <img
            src={`${API.MAIN_URL}/${data.photos[0].url}`}
            alt="Listing"
            className="
              object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition
            "
          />
        </div>
        <div className="font-semibold text-lg">{data?.title}</div>
        <div className="font-light text-neutral-500">
          {reservationDate || data.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">$ {data?.price}</div>
          {!reservation && <div className="font-light">night</div>}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ReservationCard;
