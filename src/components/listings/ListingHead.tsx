"use client";
import API from "../../enums/api";
import useCountries from "../../hooks/useCountries";
import Heading from "../Heading";
import HeartButton from "../HeartButton";

interface ListingHeadProps {
  title: string;
  locationValue: any[];
  imageSrc: string;
  id: string;
  currentUser?: any | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  locationValue,
  imageSrc,
  id,
  currentUser,
}) => {
  const { getByValue } = useCountries();

  // const location = getByValue(locationValue);

  return (
    <>
      <Heading
        title={title}
        subtitle={`${locationValue[0]}, ${locationValue[1]}`}
      />
      <div
        className="
          w-full
          overflow-hidden 
          rounded-xl
          relative
        "
      >
        <img
          src={`${API.MAIN_URL}/${imageSrc}`}
          className="object-fill object-center w-full"
          alt="Image"
        />
        {/* <div
          className="
            absolute
            top-5
            right-5
          "
        >
          <HeartButton listingId={id} currentUser={currentUser} />
        </div> */}
      </div>
    </>
  );
};

export default ListingHead;
