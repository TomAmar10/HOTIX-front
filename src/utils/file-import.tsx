import topHeaderImage from "../assets/crowd-at-show.webp";
import googleImage from "../assets/google-image.png";
import MasterCard from "../assets/mastercard-logo.png";
import Google from "../assets/google-image.png";
import Visa from "../assets/visa-logo.png";
import AmericanExpress from "../assets/american-express-logo.png";
import randomProfile from "../assets/random-profile.png";

const logoImages: any = {
  masterCard: MasterCard,
  google: Google,
  visa: Visa,
  americanExpress: AmericanExpress,
};

export { topHeaderImage, googleImage, logoImages, randomProfile };

  // //
  // function imageToFile(imageSrc: any, fileName: any) {
  //   return fetch(imageSrc)
  //     .then((response) => response.blob())
  //     .then((blob) => new File([blob], fileName, { type: blob.type }));
  // }
  // const clickMe = async () => {
  //   imageToFile(myImage, "theatre.jpeg").then((res) => {
  //     convertToBase64(res).then((image) => {
  //       axios.post("http://localhost:3200/hotix/api/categories/single/add", {
  //         name: "Theatre",
  //         image,
  //       });
  //     });
  //   });
  // };
  // //