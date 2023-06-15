import React from "react";
// Icons
import { BiSearch } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { searchSlice } from "../../redux/reducers/SearchSlice";

const Search = () => {
  const dispatch = useAppDispatch();
  const {
    search: { searchModal },
  } = useAppSelector((state) => state);
  const { onOpen } = searchSlice.actions;

  return (
    <div
      onClick={() => dispatch(onOpen())}
      className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer"
    >
      <div className="flex flex-row items-center justify-between">
        <div className="text-sm font-semibold px-6">Anywhere</div>
        <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
          Any Week
        </div>
        <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row item-center gap-3">
          <div className="hidden sm:block">Add Guests</div>
          <div className="p-2 bg-teal-500 rounded-full text-white">
            <BiSearch size={10} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
