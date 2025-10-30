import { useState } from "react";
import { makeRequest } from "../../axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const Update = ({ setOpenUpdate, user }) => {
	const [cover, setCover] = useState(null);
	const [profile, setProfile] = useState(null);
	const [texts, setTexts] = useState({
		email: user.email,
		password: user.password,
		name: user.name,
		city: user.city,
		website: user.website,
	});

	const upload = async (file) => {
		console.log(file)
		try {
			const formData = new FormData();
			formData.append("file", file);
			const res = await makeRequest.post("/upload", formData);
			return res.data;
		} catch (err) {
			console.log(err);
		}
	};

	const handleChange = (e) => {
		setTexts((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
	};

	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: (user) => {
			return makeRequest.put("/users", user);
		},

		onSuccess: () => {
			// Invalidate and refetch
			queryClient.invalidateQueries(["user"]);
		},
	});

	const handleClick = async (e) => {
		e.preventDefault();

		let coverUrl;
		let profileUrl;
		coverUrl = cover ? await upload(cover) : user.coverPic;
		profileUrl = profile ? await upload(profile) : user.profilePic;

		mutation.mutate({ ...texts, coverPic: coverUrl, profilePic: profileUrl });
		setOpenUpdate(false);
		setCover(null);
		setProfile(null);
	};

	return (
		<div className="fixed top-0 left-0 w-screen h-screen bg-black/50 flex items-center justify-center z-[999]">
			<div className="m-auto w-2/5 h-[70%] bg-light-bg dark:bg-dark-bg p-[50px] z-[999] flex flex-col gap-5 shadow-[0px_0px_15px_1px_rgba(0,0,0,0.09)] relative mobile:w-full mobile:h-full">
				<h1 className="text-gray-300 mobile:text-xl">Update Your Profile</h1>
				<form className="flex flex-col gap-5">
					<div className="flex flex-wrap gap-[50px]">
						<label htmlFor="cover" className="flex flex-col gap-[10px] text-gray-500 text-sm">
							<span>Cover Picture</span>
							<div className="relative">
								<img
									src={
										cover
											? URL.createObjectURL(cover)
											: "/upload/" + user.coverPic
									}
									alt=""
									className="w-[100px] h-[100px] object-cover"
								/>
								<CloudUploadIcon className="absolute top-0 bottom-0 left-0 right-0 m-auto text-[30px] text-gray-300 cursor-pointer" />
							</div>
						</label>
						<input
							type="file"
							id="cover"
							style={{ display: "none" }}
							onChange={(e) => setCover(e.target.files[0])}
						/>
						<label htmlFor="profile" className="flex flex-col gap-[10px] text-gray-500 text-sm">
							<span>Profile Picture</span>
							<div className="relative">
								<img
									src={
										profile
											? URL.createObjectURL(profile)
											: "/upload/" + user.profilePic
									}
									alt=""
									className="w-[100px] h-[100px] object-cover"
								/>
								<CloudUploadIcon className="absolute top-0 bottom-0 left-0 right-0 m-auto text-[30px] text-gray-300 cursor-pointer" />
							</div>
						</label>
						<input
							type="file"
							id="profile"
							style={{ display: "none" }}
							onChange={(e) => setProfile(e.target.files[0])}
						/>
					</div>
					<label className="flex flex-col gap-[10px] text-gray-500 text-sm">Email</label>
					<input
						type="text"
						value={texts.email}
						name="email"
						onChange={handleChange}
						className="p-[5px] border-none border-b border-light-border dark:border-dark-border text-gray-500 bg-transparent"
					/>
					<label className="flex flex-col gap-[10px] text-gray-500 text-sm">Password</label>
					<input
						type="text"
						value={texts.password}
						name="password"
						onChange={handleChange}
						className="p-[5px] border-none border-b border-light-border dark:border-dark-border text-gray-500 bg-transparent"
					/>
					<label className="flex flex-col gap-[10px] text-gray-500 text-sm">Name</label>
					<input
						type="text"
						value={texts.name}
						name="name"
						onChange={handleChange}
						className="p-[5px] border-none border-b border-light-border dark:border-dark-border text-gray-500 bg-transparent"
					/>
					<label className="flex flex-col gap-[10px] text-gray-500 text-sm">Country / City</label>
					<input
						type="text"
						name="city"
						value={texts.city}
						onChange={handleChange}
						className="p-[5px] border-none border-b border-light-border dark:border-dark-border text-gray-500 bg-transparent"
					/>
					<label className="flex flex-col gap-[10px] text-gray-500 text-sm">Website</label>
					<input
						type="text"
						name="website"
						value={texts.website}
						onChange={handleChange}
						className="p-[5px] border-none border-b border-light-border dark:border-dark-border text-gray-500 bg-transparent"
					/>
					<button onClick={handleClick} className="border-none p-[10px] cursor-pointer text-white bg-[#5271ff]">Update</button>
				</form>
				<button className="absolute top-[10px] right-[20px] border-none p-[5px] cursor-pointer bg-[#5271ff] text-white" onClick={() => setOpenUpdate(false)}>
					close
				</button>
			</div>
		</div>
	);
};

export default Update;
