"use client";

// Libs
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
// Components
import Input from "../inputs/Input";
import Heading from "../Heading";
import Modal from "./Modal";
// Redux
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { login } from "../../redux/actions/Auth";
import { authSlice } from "../../redux/reducers/AuthSlice";

const LoginModal = () => {
  const dispatch = useAppDispatch();
  const { onClose } = authSlice.actions;
  const {
    auth: { isLoading, loginModal },
  } = useAppSelector((state) => state);

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
    dispatch(login(data));
  };

  const closeModal = () => {
    dispatch(onClose());
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
          onClick={closeModal}
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
      onClose={closeModal}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
