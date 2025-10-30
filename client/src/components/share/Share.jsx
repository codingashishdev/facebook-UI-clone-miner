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
	const [loading, setLoading] = useState(false);
	const [err, setErr] = useState(null);

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

	const mutation = useMutation({
		mutationFn: (newPost) => {
			return makeRequest.post("/posts", newPost);
		},

		onSuccess: () => {
			// Invalidate and refetch
			queryClient.invalidateQueries(["posts"]);
		},
	});

	const handleClick = async (e) => {
		e.preventDefault();
		setErr(null);
		if (!desc.trim() && !file) {
			setErr("Please add text or an image to share.");
			return;
		}

		setLoading(true);
		try {
			let imgUrl = "";
			if (file) imgUrl = await upload();
			// use mutation to create post
			mutation.mutate({ desc, img: imgUrl });
			setDesc("");
			setFile(null);
		} catch (error) {
			setErr("Failed to upload. Try again.");
		} finally {
			setLoading(false);
		}
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
							<img className="w-[100px] h-[100px] object-cover rounded-none" alt="preview" src={URL.createObjectURL(file)} />
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
						{err && <div className="text-red-500 text-sm mb-2">{err}</div>}
						<button onClick={handleClick} disabled={loading} className="border-none px-[10px] py-[8px] text-white cursor-pointer bg-[#5271ff] rounded-[3px] disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2">
							{loading ? (
								<svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
									<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
									<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
								</svg>
							) : null}
							<span>{loading ? 'Sharing...' : 'Share'}</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Share;
