import { useAuth } from "@clerk/clerk-react";
import { Loader2, Scissors, Sparkles } from "lucide-react";
import { useState } from "react";
import { api } from "../../api/api";
import toast from "react-hot-toast";

const RemoveObject = () => {
	const [path, setPath] = useState<File>();
	const [objectDescription, setObjectDescription] = useState("");
	const [loading, setLoading] = useState(false);
	const [imgUrl, setImgUrl] = useState("");

	const { getToken } = useAuth();

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();
		// console.log("path to file: ", path);

		// if (objectDescription.split(" ").length > 1) {
		//   toast.error("Object description must be a single word");
		// }

		try {
			setLoading(true);
			const formData = new FormData();

			formData.append("image", path!);
			formData.append("prompt", objectDescription);
			const { data } = await api.post(
				"/ai/remove-object-from-image",
				formData,
				{
					headers: { Authorization: `Bearer ${await getToken()}` },
				},
			);

			if (data.success) {
				setImgUrl(data.content);
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			toast.error("Too many requests try again later");
			console.log({ error });
		}
		setLoading(false);
	};

	return (
		<div className="container h-full flex flex-wrap gap-4 overflow-y-scroll items-start text-slate-700">
			{/* Left Col */}
			<form
				onSubmit={handleSubmit}
				className="card w-full bg-white p-4 max-w-xl"
			>
				<div className="flex items-center gap-3">
					<Sparkles className="w-6 text-sky-500" />

					<h1 className="text-xl font-bold">Object Remover</h1>
				</div>
				<p className="text-sm font-medium mt-6">Upload Image</p>

				<input
					className="file-input file-input-info w-full mt-6 "
					type="file"
					accept="image/*"
					required
					onChange={(e) => {
						if (e.target.files) setPath(e.target.files[0]);
					}}
				/>

				<p className="text-xs mt-4">
					Supports JPG, PNG, and other image formats
				</p>

				<p className="text-md mt-4">Object to remove</p>

				<textarea
					className="textarea mt-4 border-sky-300 w-full border-[2px]"
					rows={1}
					placeholder="Remove the ..."
					value={objectDescription}
					onChange={(e) => setObjectDescription(e.target.value)}
				/>

				<button
					type="submit"
					disabled={loading}
					className="btn btn-block mt-6 text-white rounded-2xl bg-gradient-to-r from-sky-500 to-purple-500"
				>
					{loading ? (
						<Loader2 className="animate-spin size-5"></Loader2>
					) : (
						<Scissors className="w-5" />
					)}
					Remove Object
				</button>
			</form>
			{/* Right Col */}
			<div className="card w-full bg-white p-4 max-w-xl min-h-[24rem] max-h-[600px]">
				<div className="flex items-center gap-3">
					<Scissors className="w-6 text-sky-500" />
					<h1 className="text-xl font-bold">Processed Image</h1>
				</div>

				{!imgUrl ? (
					<div className="flex flex-1 justify-center items-center">
						<div className="text-sm flex flex-col items-center gap-5 text-gray-400">
							<Scissors className="size-9" />
							<p>Upload an image and click "Remove Object" to get started</p>
						</div>
					</div>
				) : (
					<div className="mt-3 h-full">
						<img
							src={imgUrl}
							alt="object removed"
							className="w-full h-full object-cover"
						></img>
					</div>
				)}
			</div>
		</div>
	);
};

export default RemoveObject;
