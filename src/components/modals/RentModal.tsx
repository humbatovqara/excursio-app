import React, { useMemo, useState, Suspense, useEffect } from "react";
// Redux
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { roomSlice } from "../../redux/reducers/RoomSlice";
// Components
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import CategoryInput from "../inputs/CategoryInput";
import CountrySelect from "../inputs/CountrySelect";
import ImageUpload from "../inputs/ImageUpload";
import Counter from "../inputs/Counter";
import Checkbox from "../inputs/Checkbox";
import { categories } from "../navbar/Categories";
// Libs
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { createRoom } from "../../redux/actions/Room";

const Map = React.lazy(() => import("../Map"));

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  AMENTIES = 3,
  IMAGES = 4,
  DESCRIPTION = 5,
  PRICE = 6,
}

const RentModal = () => {
  const dispatch = useAppDispatch();
  const { onRentModalOpen, onRentModalClose } = roomSlice.actions;
  const {
    room: { rentModal, allAmenties },
  } = useAppSelector((state) => state);

  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: 0,
      amenties: [],
      location: null,
      guestCount: 1,
      roomCount: 1,
      bed_count: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bedCount = watch("bed_count");
  const imageSrc = watch("imageSrc");

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

  const handleCheckboxChange = (itemId: number) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
      setValue(
        "amenties",
        selectedItems.filter((id) => id !== itemId)
      );
    } else {
      setSelectedItems([...selectedItems, itemId]);
      setValue("amenties", [...selectedItems, itemId]);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }
    console.log("Rend Modal Submit", data);
    setIsLoading(true);
    dispatch(createRoom(data));
    reset();
    setStep(STEPS.CATEGORY);
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
          <div key={item.id} className="col-span-1">
            <CategoryInput
              onClick={() => setCustomValue("category", item.id)}
              selected={category === item.id}
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

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          subtitle="What amenitis do you have?"
        />
        <Counter
          onChange={(value) => setCustomValue("guestCount", value)}
          value={guestCount}
          title="Guests"
          subtitle="How many guests do you allow?"
        />
        <hr />
        <Counter
          onChange={(value) => setCustomValue("roomCount", value)}
          value={roomCount}
          title="Rooms"
          subtitle="How many rooms do you have?"
        />
        <hr />
        <Counter
          onChange={(value) => setCustomValue("bed_count", value)}
          value={bedCount}
          title="Beds"
          subtitle="How many beds do you have?"
        />
      </div>
    );
  }

  if (step === STEPS.AMENTIES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          subtitle="What amenities do you have?"
        />
        {allAmenties.result.map((item: any) => (
          <div key={item.id} className="col-span-1">
            <Checkbox
              label={item.name}
              checked={selectedItems.includes(item.id)}
              onChange={() => handleCheckboxChange(item.id)}
            />
          </div>
        ))}
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of your place"
          subtitle="Show guests what your place looks like!"
        />
        <ImageUpload
          onChange={(value) => setCustomValue("imageSrc", value)}
          value={imageSrc}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your place?"
          subtitle="Short and sweet works best!"
        />
        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, set your price"
          subtitle="How much do you charge per night?"
        />
        <Input
          id="price"
          label="Price"
          formatPrice
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={() => dispatch(onRentModalClose())}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      title="Airbnb your home!"
      body={bodyContent}
    />
  );
};

export default RentModal;
