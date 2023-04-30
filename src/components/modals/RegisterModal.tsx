"use client";

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "../../hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";
import API from "../../enums/api";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      bio: "",
      role_id: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post(`${API.MAIN_URL}/users/`, data)
      .then(() => {
        registerModal.onClose();
      })
      .catch((error) => {
        toast.error("Something went wrong !");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to SmarTour" subtitle="Create an account" />
      <Input
        id="full_name"
        label="Full Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
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
      <Input
        id="bio"
        label="Bio"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="role_id"
        label="Role"
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
        <div>Already have an account ?</div>
        <div
          onClick={registerModal.onClose}
          className="text-neutral-800 cursor-pointer hover:underline"
        >
          Log In
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
