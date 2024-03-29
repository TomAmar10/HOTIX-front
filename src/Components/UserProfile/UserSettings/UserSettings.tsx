import { User } from "../../../models/User";
import { randomProfile } from "../../../utils/file-import";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { ChangeEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import convertToBase64 from "../../../utils/convertBase64";
import useAuthService from "../../../services/authService";
import { useDispatch } from "react-redux";
import { userActions } from "../../../store/authSlice";
import Spinner from "../../UI/Spinner";
import { LanguageProfilePage } from "../../../languageControl/Language";
import "./UserSettings.scss";

interface props {
  user: User;
  data: LanguageProfilePage;
  isHighlight:boolean;
}

interface formUser extends User {
  confirm_password: string;
  new_password: string;
}

function UserSettings(props: props): JSX.Element {
  const dispatch = useDispatch();
  const user = props.user;
  const data = props.data.UserSettings;
  const authService = useAuthService();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [currentImg, setCurrentImg] = useState(user.image || randomProfile);
  const [newImage, setNewImage] = useState<string | undefined>(undefined);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isSucceeded, setIsSucceeded] = useState(false);
  const { register, handleSubmit, reset } = useForm<formUser>();
  const [error, setError] = useState("");
  const highlight = props.isHighlight ? "highlight-section" : "";

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const image = await convertToBase64(selectedFile);
      setNewImage(image);
      const imageUrl = URL.createObjectURL(selectedFile); // Create a temporary URL for the selected image
      setCurrentImg(imageUrl);
      setIsDeleted(false);
    } else {
      setNewImage(undefined);
      setCurrentImg(user.image || randomProfile);
    }
  };

  const clickOnInput = () => {
    // Simulate a click event on the hidden input element
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const deleteImage = () => {
    setCurrentImg(randomProfile);
    setNewImage(undefined);
    setIsDeleted(true);
  };
  const previousImage = () => {
    setCurrentImg(user.image || randomProfile);
    setIsDeleted(false);
  };

  const submitForm = async (details: formUser) => {
    if (details.confirm_password || details.new_password) {
      if (details.confirm_password !== details.new_password) {
        setError(data.confirmPassErr);
        return;
      }
    }
    details._id = user._id;
    const { first_name, last_name } = details;
    if (first_name) details.first_name = capitalizedName(first_name);
    if (last_name) details.last_name = capitalizedName(last_name);
    const validFormValues = Object.fromEntries(
      Object.entries(details).filter(([key, value]) => value !== "")
    );
    if (isDeleted || newImage) validFormValues.image = newImage;
    setIsPending(true);
    const result = await authService.updateUser(validFormValues as User);
    if (result.status === 201) {
      const { authorization, refreshtoken } = result.headers;
      const { image } = result.data;
      dispatch(userActions.login({ authorization, refreshtoken, image }));
      setIsSucceeded(true);
      reset();
    } else {
      if (result.msg.includes("email")) setError(data.emailErr);
      if (result.msg.includes("phone")) setError(data.phoneErr);
      if (result.status === 401) setError(data.passwordErr);
    }
    setIsPending(false);
  };

  const capitalizedName = (name: string) => {
    return name[0].toUpperCase() + name.slice(1);
  };

  const formChange = () => {
    setError("");
    setIsSucceeded(false);
  };

  return (
    <div className={`UserSettings user-page-section ${highlight}`}>
      <h4 className="section-header">{data.header}</h4>
      <hr />
      <div className="form-container">
        <form
          className="profile-form"
          onSubmit={handleSubmit(submitForm)}
          onChange={formChange}
        >
          <div className="inputs-wrapper">
            <label htmlFor="first_name">
              {data.firstName}
              <input
                type="text"
                id="first_name"
                className="form-control"
                placeholder={user.first_name}
                {...register("first_name")}
              />
            </label>
            <label htmlFor="last_name">
              {data.lastName}
              <input
                type="text"
                id="last_name"
                className="form-control"
                placeholder={user.last_name}
                {...register("last_name")}
              />
            </label>
            <label htmlFor="email">
              {data.email}
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder={user.email}
                {...register("email")}
              />
            </label>
            <label htmlFor="phone">
              {data.phone}
              <input
                type="number"
                id="phone"
                className="form-control"
                placeholder={user.phone}
                {...register("phone")}
              />
            </label>
            <label htmlFor="new_password">
              {data.newPass}
              <input
                type="password"
                id="new_password"
                className="form-control"
                {...register("new_password", { minLength: 6 })}
              />
            </label>
            <label htmlFor="confirm_password">
              {data.confirmNewPass}
              <input
                type="password"
                id="confirm_password"
                className="form-control"
                {...register("confirm_password", { minLength: 6 })}
              />
            </label>
            <label htmlFor="password">
              {data.enterPassword}
              <input
                required
                type="password"
                id="password"
                className="form-control"
                placeholder="********"
                {...register("password", { minLength: 6 })}
              />
            </label>
          </div>
          <span className="form-error">{error}</span>
          <div className="button-spinner-wrapper">
            <button className="submit-form-btn" disabled={isPending}>
              {data.save}
            </button>
            {isPending && (
              <Spinner spinnerStyle={{ width: "2rem", height: "2rem" }} />
            )}
            {isSucceeded && <span className="success-msg">{data.success}</span>}
          </div>
        </form>
        <div className="image-control">
          <input
            type="file"
            hidden
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <div className="curr-image-container" onClick={clickOnInput}>
            <img src={currentImg} className="current-image" alt="" />
            <div className="upload-icon-wrapper">
              <UploadFileIcon className="upload-icon" />
              <span className="upload-span">{data.uploadImg}</span>
            </div>
          </div>
          {currentImg === randomProfile && (
            <span className="no-img-span">{data.noImg}</span>
          )}
          <button className="change-span" onClick={clickOnInput}>
            {data.uploadProfileImg}
          </button>
          {isDeleted ? (
            <button className="previous-image-btn" onClick={previousImage}>
              {data.usePrev}
            </button>
          ) : (
            <button className="delete-image-btn" onClick={deleteImage}>
              {data.deleteImg}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserSettings;
