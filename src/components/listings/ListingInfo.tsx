"use client";

import { IconType } from "react-icons";
import useCountries from "../../hooks/useCountries";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import React from "react";

const Map = React.lazy(() => import("../Map"));

interface ListingInfoProps {
  user: any;
  description: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  category: any | undefined;
  locationValue: any[];
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  category,
  locationValue,
}) => {
  const { getByValue } = useCountries();

  // const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div
          className="
            text-xl 
            font-semibold 
            flex 
            flex-row 
            items-center
            gap-2
          "
        >
          <div>Hosted by {user?.full_name}</div>
          <Avatar src={user?.image} />
        </div>
        <div
          className="
            flex 
            flex-row 
            items-center 
            gap-4 
            font-light
            text-neutral-500
          "
        >
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} beds</div>
        </div>
      </div>
      <hr />
      {category &&
        category.map((item: any) => (
          <ListingCategory
            key={item?.id}
            // icon={item.icon}
            label={item?.name}
            description={item?.description}
          />
        ))}
      <hr />
      <div
        className="
      text-lg font-light text-neutral-500"
      >
        {description}
      </div>
      <hr />
      <Map center={locationValue} />
    </div>
  );
};

export default ListingInfo;
