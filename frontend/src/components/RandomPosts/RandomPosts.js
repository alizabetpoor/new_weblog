import postimg from "../../assets/images/post.jpeg";
import profileimg from "../../assets/images/profile.webp";
import styles from "./RandomPosts.module.css";
const RandomPosts = () => {
  return (
    <div className="random-posts flex flex-col">
      <p className="self-start text-gray-500">مطالب انتخابی برای شما</p>
      <div className="text-white grid grid-cols-12 gap-4">
        <div className={`relative ${styles.image} col-span-8`}>
          <img
            className={`w-full h-full object-cover rounded-lg`}
            src={postimg}
            alt=""
          />
          <div className="flex flex-col items-start absolute bottom-5 right-10">
            <h2 className="font-extrabold font-sahelbold text-xl">
              معرفی کتاب های صلحی که همه صلح ها را به باد داد
            </h2>
            <div className="flex items-center">
              <div>
                <img
                  className="rounded-full w-12 h-12"
                  src={profileimg}
                  alt=""
                />
              </div>
              <div className="break-words flex flex-col">
                <span>علیرضا فرهانی</span>
                <span>2ماه پیش</span>
              </div>
            </div>
          </div>
        </div>
        <div className={`relative ${styles.image} col-span-4`}>
          <img
            className={`w-full h-full object-cover rounded-lg`}
            src={postimg}
            alt=""
          />
          <div className="flex flex-col items-start absolute bottom-5 right-10">
            <h2 className="font-extrabold font-sahelbold text-xl">
              معرفی کتاب های صلحی که همه صلح ها را به باد داد
            </h2>
            <div className="flex items-center">
              <div>
                <img
                  className="rounded-full w-12 h-12"
                  src={profileimg}
                  alt=""
                />
              </div>
              <div className="break-words flex flex-col">
                <span>علیرضا فرهانی</span>
                <span>2ماه پیش</span>
              </div>
            </div>
          </div>
        </div>
        <div className={`relative ${styles.image} col-span-4`}>
          <img
            className={`w-full h-full object-cover rounded-lg`}
            src={postimg}
            alt=""
          />
          <div className="flex flex-col items-start absolute bottom-5 right-10">
            <h2 className="font-extrabold font-sahelbold text-xl">
              معرفی کتاب های صلحی که همه صلح ها را به باد داد
            </h2>
            <div className="flex items-center">
              <div>
                <img
                  className="rounded-full w-12 h-12"
                  src={profileimg}
                  alt=""
                />
              </div>
              <div className="break-words flex flex-col">
                <span>علیرضا فرهانی</span>
                <span>2ماه پیش</span>
              </div>
            </div>
          </div>
        </div>
        <div className={`relative ${styles.image} col-span-8`}>
          <img
            className={`w-full h-full object-cover rounded-lg`}
            src={postimg}
            alt=""
          />
          <div className="flex flex-col items-start absolute bottom-5 right-10">
            <h2 className="font-extrabold font-sahelbold text-xl">
              معرفی کتاب های صلحی که همه صلح ها را به باد داد
            </h2>
            <div className="flex items-center">
              <div>
                <img
                  className="rounded-full w-12 h-12"
                  src={profileimg}
                  alt=""
                />
              </div>
              <div className="break-words flex flex-col">
                <span>علیرضا فرهانی</span>
                <span>2ماه پیش</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandomPosts;
