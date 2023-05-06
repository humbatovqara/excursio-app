import React, { useMemo, useState, Suspense, useEffect } from "react";
// Redux
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { authSlice } from "../../redux/reducers/AuthSlice";
// Components
// import Map from "../Map";
import Modal from "./Modal";
import Heading from "../Heading";
import CategoryInput from "../inputs/CategoryInput";
import CountrySelect from "../inputs/CountrySelect";
import { categories } from "../navbar/Categories";
// Libs
import { FieldValues, useForm } from "react-hook-form";

const Map = React.lazy(() => import("../Map"));

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const dispatch = useAppDispatch();
  const { onRentModalOpen, onRentModalClose } = authSlice.actions;
  const {
    auth: { rentModal },
  } = useAppSelector((state) => state);

  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [currentLocation, setCurrentLocation] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("category");
  const location = watch("location");

  useEffect(() => {
    setIsMapLoading(true);
    setCurrentLocation(location);
  }, [location]);
  useEffect(() => {
    setIsMapLoading(false);
  }, [currentLocation]);

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }

    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />
      <div
        className="
          grid 
          grid-cols-1 
          md:grid-cols-2 
          gap-3
          max-h-[50vh]
          overflow-y-auto
        "
      >
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />
        <Suspense fallback={<div>Loading...</div>}>
          {!isMapLoading && <Map center={location?.latlng} />}
        </Suspense>
      </div>
    );
  }

  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={() => dispatch(onRentModalClose())}
      onSubmit={onNext}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      title="Airbnb your home!"
      body={bodyContent}
    />
  );
};

export default RentModal;
