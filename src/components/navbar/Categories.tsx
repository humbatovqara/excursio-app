"use client";

// Router
import { useLocation, useSearchParams } from "react-router-dom";
// Icons
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiBarn,
  GiBoatFishing,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import { IoDiamond } from "react-icons/io5";
import { FaSkiing } from "react-icons/fa";
// Components
import Container from "../Container";
import CategoryBox from "../CategoryBox";

export const categories = [
  {
    id: 1,
    label: "Beach",
    icon: TbBeach,
    description: "This property is close to beach",
  },
  {
    id: 2,
    label: "Windmills",
    icon: GiWindmill,
    description: "This property has windmills",
  },
  {
    id: 3,
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This property is modern",
  },
  {
    id: 4,
    label: "Countryside",
    icon: TbMountain,
    description: "This property is in the countryside",
  },
  {
    id: 5,
    label: "Pools",
    icon: TbPool,
    description: "This property has a pool",
  },
  {
    id: 6,
    label: "Islands",
    icon: GiIsland,
    description: "This property is on an island",
  },
  {
    id: 7,
    label: "Lake",
    icon: GiBoatFishing,
    description: "This property is close to a lake",
  },
  {
    id: 8,
    label: "Skiing",
    icon: FaSkiing,
    description: "This property has skiing activities",
  },
  {
    id: 9,
    label: "Castles",
    icon: GiCastle,
    description: "This property is in a castle",
  },
  {
    id: 10,
    label: "Camping",
    icon: GiForestCamp,
    description: "This property has camping activities",
  },
  {
    id: 11,
    label: "Cave",
    icon: GiCaveEntrance,
    description: "This property is in cave",
  },
  {
    id: 12,
    label: "Barns",
    icon: GiBarn,
    description: "This property is in the barn",
  },
  {
    id: 13,
    label: "Lux",
    icon: IoDiamond,
    description: "This property is luxurious",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category");
  const pathname = location.pathname;
  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="
              flex 
              flex-row 
              pt-4 
              items-center 
              justify-between 
              overflow-x-auto"
      >
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            selected={category === item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
