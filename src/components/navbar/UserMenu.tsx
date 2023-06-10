import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
// Icons
import { AiOutlineMenu } from "react-icons/ai";
// Components
import MenuItem from "./MenuItem";
import Avatar from "../Avatar";
// Redux
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { roomSlice } from "../../redux/reducers/RoomSlice";
import { authSlice } from "../../redux/reducers/AuthSlice";
import { logout } from "../../redux/actions/Auth";
import { getReservations } from "../../redux/actions/Reservation";

const UserMenu = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { onOpen, onRegisterOpen } = authSlice.actions;
  const { onRentModalOpen } = roomSlice.actions;
  const {
    auth: { loginUser, loginModal },
    room: { rentModal },
  } = useAppSelector((state) => state);

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const openLoginModal = () => {
    dispatch(onOpen());
  };

  const openRegisterModal = () => {
    dispatch(onRegisterOpen());
  };

  const onRent = useCallback(() => {
    if (!loginUser?.is_success) {
      return dispatch(onOpen());
    }

    dispatch(onRentModalOpen());
  }, [loginUser, loginModal, rentModal]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="hidden
            md:block
            text-sm 
            font-semibold 
            py-3 
            px-4 
            rounded-full 
            hover:bg-neutral-100 
            transition 
            cursor-pointer"
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className="
                p-4
                md:py-1
                md:px-2
                border-[1px] 
                border-neutral-200 
                flex 
                flex-row 
                items-center 
                gap-3 
                rounded-full 
                cursor-pointer 
                hover:shadow-md 
                transition
                "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="absolute 
                rounded-xl 
                shadow-md
                w-[40vw]
                md:w-3/4 
                bg-white 
                overflow-hidden 
                right-0 
                top-12 
                text-sm"
        >
          <div className="flex flex-col cursor-pointer">
            {loginUser?.is_success ? (
              <>
                <MenuItem onClick={() => {}} label="My trips" />
                <MenuItem onClick={() => {}} label="My favorites" />
                <MenuItem
                  onClick={() => {
                    navigate("/reservations");
                    toggleOpen();
                  }}
                  label="My reservations"
                />
                <MenuItem onClick={() => {}} label="My properties" />
                <MenuItem
                  onClick={() => dispatch(onRentModalOpen())}
                  label="Airbnb my home"
                />
                <hr />
                <MenuItem
                  onClick={() => {
                    dispatch(logout());
                    toggleOpen();
                  }}
                  label="Logout"
                />
              </>
            ) : (
              <>
                <MenuItem onClick={openLoginModal} label="Login" />
                <MenuItem onClick={openRegisterModal} label="Sign up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
