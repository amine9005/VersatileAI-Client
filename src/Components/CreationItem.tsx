import { useState } from "react";
import Markdown from "react-markdown";
import type { creationDataType } from "../lib/types";

const CreationItem = ({ item }: { item: creationDataType }) => {
	const [expanded, setExpanded] = useState(false);
	if (item.type === "image") {
		console.log(item.content);
	}
	return (
		<div
			onClick={() => setExpanded(!expanded)}
			className="container p-4 max-w-5xl bg-white border border-gray-200 rounded-lg cursor-pointer"
		>
			<div className="flex justify-between items-center gap-4">
				<div>
					<h2 className="text-lg font-bold">{item.prompt}</h2>
					<p className=" text-gray-500">
						{item.type} - {new Date(item.created_at).toLocaleDateString()}
					</p>
				</div>
				<button className="btn btn-ghost bg-blue-300 rounded-full hover:bg-blue-300">
					{item.type}
				</button>
			</div>

			{expanded && (
				<div>
					{item.type === "image" ? (
						<div>
							<img
								src={item.content}
								alt="AI generated image"
								className="w-full mt-3 max-w-md"
							/>
						</div>
					) : (
						<div className="mt-3 h-full overflow-y-scroll text-sm text-slate-700">
							<div className="reset-tw">
								<Markdown>{item.content}</Markdown>
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default CreationItem;
