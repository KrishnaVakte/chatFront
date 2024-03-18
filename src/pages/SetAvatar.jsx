import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import loader from "../assets/loader.gif";
import "./SetAvatar.css";
import { host } from "../data";
import toast from "react-hot-toast";

const SetAvatar = () => {
  const photo = [
    "https://png.pngtree.com/thumb_back/fh260/background/20230612/pngtree-man-wearing-glasses-is-wearing-colorful-background-image_2905240.jpg",

    "https://png.pngtree.com/thumb_back/fh260/background/20230612/pngtree-photoshop-effect-with-a-woman-and-sunglasses-image_2905239.jpg",

    "https://png.pngtree.com/thumb_back/fh260/background/20230614/pngtree-young-man-in-sunglasses-is-wearing-neon-colors-image_2931162.jpg",

    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGvFEb3GCTOVlkqD61fyjSOHmZs8Bjya1BmhQU6FK2DiNk2nGQ-8CbSCbjx-pD3-V-kL8&usqp=CAU",

    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIjkmpvs7IAPJy_ZHGB2euS_OWSgRPgbrO5e3u6_SC4Q4Dnuye0igKJTxgwEjZQZGLXMI&usqp=CAU",

    "https://png.pngtree.com/thumb_back/fh260/background/20230527/pngtree-woman-with-neon-glasses-and-sunglasses-image_2686184.jpg",

    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShWwZX-9JdQzgfSSJEHrIfTCqQV-EJm6kY6Wj7ExvTykrGTzKaHf8-GjPrFMG4TbEVfVU&usqp=CAU",

    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy8z6FYdK_NK37ZxomZ8INm2Ch604jk-_V4w&usqp=CAU",

    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZsj_cxa-BcqeJ6E5e8VLmzOR_2JW2kY9hv2R_wwMiCJxonN80DXrV60-vso-SFptB5CM&usqp=CAU",

    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQulMZB0sNe1L-JPcXigWD1LJJx5Z2Wcp2nghIbNezt3VbWZNSXySBmpkndzawzGtZdVA&usqp=CAU",

    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyRmrrQTEiHsa8XA8FoDisyy8VgxtdxgCdddKjWf-tBZtnu0_CT0lwjnJoZRcNlNiWWQY&usqp=CAU",

    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq6Kk0pzeAx9JRxXBWwEcoRrqeVEZreffz9qe680Kaic97-st2byEVO1TqnEGa_7QCpSk&usqp=CAU",

    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3c5YuHbWCf4VvrDdOCOHtP06D0cRI2UEgvN3MORLmra7TXCpT6CTgwARgBzaMK5f2lW8&usqp=CAU",

    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNEN5d6wZzMW2XXSy6wpuqVfbaz2-2-ZdXfnHnzVPgxB78N1bPa4SJUBNBqDKruYQFLCM&usqp=CAU",

    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN0mOFfwMm7UF5-vO31iAA_6yqBe7VSFnc8mq_1laQD2C9dqMAWhuZ6HznVomSFve9_oc&usqp=CAU",

    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo3TsiU5skwX_Ow2O0Yt7o-Kdnh_XOy6ntFw&usqp=CAU",

    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZFHl15TFF-3gI7CHlPH6h97UDaPvKe-ffIw&usqp=CAU",

    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8OTNmkN3ndsLAqU8c0VSjhzZkXjhGNPHWhw&usqp=CAU",
  ];

  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    }
  }, []);

  const fetchData = async () => {
    try {
      const data = [];
      for (let i = 0; i < photo.length; i++) {
        const response = await axios.get(photo[i]);
        data.push(response.config.url); // Push the URL string instead of response data
      }
      setAvatars(data);
    } catch (error) {
      console.error("Error fetching avatars:", error);
      // Handle errors
    }
  };

  useEffect(() => {
    fetchData();

    const loaderInterval = setInterval(() => {
      setIsLoading(false);
      clearInterval(loaderInterval); // Stop the interval after 5 seconds
    }, 3000);

    return () => clearInterval(loaderInterval);
  }, []);

  const setprofilepicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("please select avatar");
    } else {
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));
      const { data } = await axios.post(
        `${host}/api/setavatar/${user._id}`,
        {
          image: avatars[selectedAvatar],
        }
      );

      console.log(data);

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.AvatarImage = data.image;
        localStorage.setItem("chat-app-user", JSON.stringify(user));
        toast.success("Avatar is Set");
        navigate("/");
      } else {
        setTimeout(function () {
          toast.error("Error in setting avatar");
        }, 500);
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="container">
          <img src={loader} alt="loader" className="loader" />
        </div>
      ) : (
        <div className="container">
          <div className="title-container">
            <h1>Pick an avatar as your profile picture</h1>
          </div>

          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={`${avatar}`}
                    alt="avatar"
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>

          <button
            className="submit-btn"
            onClick={() => {
              setprofilepicture();
            }}
          >
            Set As Profile Picture
          </button>
        </div>
      )}
    </>
  );
};

export default SetAvatar;
