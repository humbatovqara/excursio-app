"use client";

import { useCallback, useState } from "react";
// Redux
import { useAppDispatch } from "../../hooks/redux";
import { login } from "../../redux/actions/Auth";
// API
import axios from "axios";
import API from "../../enums/api";
// Hooks
import useRegisterModal from "../../hooks/useRegisterModal";
import useLoginModal from "../../hooks/useLoginModal";
// Libs
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
// Components
import Button from "../Button";
import Input from "../inputs/Input";
import Heading from "../Heading";
import Modal from "./Modal";


const LoginModal = () => {
  const dispatch = useAppDispatch();
  const loginModal = useLoginModal();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    dispatch(login(data));
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Log in" />

      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <div className="justify-center flex flex-row items-center gap-2">
        <div>Forget your password ?</div>
        <div
          onClick={loginModal.onClose}
          className="text-neutral-800 cursor-pointer hover:underline"
        >
          Help
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
