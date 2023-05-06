"use client";

// Libs
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
// Components
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { user } from "../../redux/actions/Auth";
import { authSlice } from "../../redux/reducers/AuthSlice";

const RegisterModal = () => {
  const dispatch = useAppDispatch();
  const { onRegisterClose } = authSlice.actions;
  const {
    auth: { isLoading, registerModal },
  } = useAppSelector((state) => state);

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
    dispatch(user(data));
  };

  const closeModal = () => {
    dispatch(onRegisterClose());
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
          onClick={closeModal}
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
      onClose={closeModal}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
