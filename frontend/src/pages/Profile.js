import Posts from "../components/Posts";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxios from "../utils/UseAxios";
import ReactLoading from "react-loading";
import FollowingButton from "../components/FollowingButton";
const Profile = (props) => {
  const [userProfile, setUserProfile] = useState(null);
  const [reset, setReset] = useState(false);
  const api = useAxios();
  useEffect(() => {
    api
      .get(`/user/${props.match.params.username}/`)
      .then((res) => setUserProfile(res.data))
      .catch((err) => {
        console.log(err);
        setUserProfile(404);
      });
  }, []);
  if (!userProfile)
    return (
      <div className="flex justify-center">
        <ReactLoading
          type="cubes"
          color="#236df7"
          height={"20%"}
          width={"20%"}
        />
      </div>
    );
  if (userProfile === 404)
    return <div>پروفایلی با این یوزر نیم وجود ندارد</div>;
  return (
    <div className="flex justify-center">
      <div className="lg:w-6/12 md:w-9/12 w-full px-2 md:px-0 flex flex-col space-y-10 pb-8">
        <div className="flex md:flex-row flex-col space-y-3 items-center text-black space-x-3 text-xs space-x-reverse">
          <div>
            <img
              className="rounded-full h-20 w-20"
              src={userProfile.profile.profile_photo}
              alt=""
            />
          </div>
          <div className="flex flex-col items-start space-y-2">
            <div className="flex space-x-2 space-x-reverse">
              <span className="text-base font-sahelbold">
                {userProfile.username}
              </span>
              <FollowingButton following_user={userProfile} />
            </div>
            <div></div>
          </div>
        </div>
        <div className="flex md:justify-start justify-center space-x-7 space-x-reverse text-gray-600 text-base border-b-4 pb-14 border-gray-500 border-dotted">
          <span className="hover:text-black">
            توسط{" "}
            <span className="text-black font-sahelbold font-extrabold underline">
              {userProfile.profile.followers.length}
            </span>{" "}
            نفر دنبال می شود
          </span>
          <span className="hover:text-black">
            <span className="text-black font-sahelbold font-extrabold underline">
              {userProfile.profile.following.length}
            </span>{" "}
            را دنبال می کند
          </span>
        </div>
        <Posts endpoint={`/posts/user/${userProfile.username}/`} />
      </div>
    </div>
  );
};

export default Profile;
