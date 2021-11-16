import postimg from "../../assets/images/post.jpeg";
import profileimg from "../../assets/images/profile.webp";
import styles from "./RandomPosts.module.css";
const RandomPosts = () => {
  return (
    <div className="random-posts flex flex-col w-10/12 overflow-x-auto">
      <p className="self-start text-gray-500 leading-10">
        مطالب انتخابی برای شما
      </p>
      <div className="text-white lg:grid lg:grid-cols-12 lg:gap-4 flex lg:space-x-0 space-x-3 space-x-reverse">
        <div className={`relative ${styles.image} lg:col-span-8 leading-8`}>
          <img
            className={`w-full h-full object-cover rounded-lg`}
            src={postimg}
            alt=""
          />
          <div className="flex flex-col items-start absolute bottom-5 right-10">
            <h2 className="font-extrabold font-sahelbold text-xl text-right">
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
        <div className={`relative ${styles.image} lg:col-span-4 leading-8`}>
          <img
            className={`w-full h-full object-cover rounded-lg`}
            src={postimg}
            alt=""
          />
          <div className="flex flex-col items-start absolute bottom-5 right-10">
            <h2 className="font-extrabold font-sahelbold text-xl text-right">
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
        <div className={`relative ${styles.image} lg:col-span-4 leading-8`}>
          <img
            className={`w-full h-full object-cover rounded-lg`}
            src={postimg}
            alt=""
          />
          <div className="flex flex-col items-start absolute bottom-5 right-10">
            <h2 className="font-extrabold font-sahelbold text-xl text-right">
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
        <div className={`relative ${styles.image} lg:col-span-8 leading-8`}>
          <img
            className={`w-full h-full object-cover rounded-lg`}
            src={postimg}
            alt=""
          />
          <div className="flex flex-col items-start absolute bottom-5 right-10">
            <h2 className="font-extrabold font-sahelbold text-xl text-right">
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
