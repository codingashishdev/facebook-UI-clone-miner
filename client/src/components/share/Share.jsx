import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
const Share = () => {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const { currentUser } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newPost) => {
      return makeRequest.post("/posts", newPost);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    if (file) imgUrl = await upload();
    mutation.mutate({ desc, img: imgUrl });
    setDesc("");
    setFile(null);
  };

  return (
    <div className="shadow-[0px_0px_25px_-10px_rgba(0,0,0,0.38)] rounded-[20px] bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text mb-5">
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center flex-[3]">
            <img src={"/upload/" + currentUser.profilePic} alt="" className="w-10 h-10 rounded-full object-cover" />
            <input
              type="text"
              placeholder={`What's on your mind ${currentUser.name}?`}
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
              className="border-none outline-none px-[10px] py-5 bg-transparent w-[60%] text-light-text dark:text-dark-text"
            />
          </div>
          <div className="flex-1 flex justify-end">
            {file && (
              <img className="w-[100px] h-[100px] object-cover rounded-none" alt="" src={URL.createObjectURL(file)} />
            )}
          </div>
        </div>
        <hr className="my-5 border-none h-[0.5px] bg-light-border dark:bg-dark-border" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file">
              <div className="flex items-center gap-[10px] cursor-pointer">
                <img src={Image} alt="" className="h-5" />
                <span className="text-xs text-gray-500">Add Image</span>
              </div>
            </label>
            <div className="flex items-center gap-[10px] cursor-pointer">
              <img src={Map} alt="" className="h-5" />
              <span className="text-xs text-gray-500">Add Place</span>
            </div>
            <div className="flex items-center gap-[10px] cursor-pointer">
              <img src={Friend} alt="" className="h-5" />
              <span className="text-xs text-gray-500">Tag Friends</span>
            </div>
          </div>
          <div>
            <button onClick={handleClick} className="border-none px-[5px] py-[5px] text-white cursor-pointer bg-[#5271ff] rounded-[3px]">
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
