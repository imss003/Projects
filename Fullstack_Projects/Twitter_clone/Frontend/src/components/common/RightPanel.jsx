import { Link } from "react-router-dom";
import RightPanelSkeleton from "../skeleton/RightPanelSkeleton";
import { USERS_FOR_RIGHT_PANEL } from "../../utils/db/dummy";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const RightPanel = () => {
	const {data: users, isLoading, refetch} = useQuery({
		queryKey: ['users'],
		queryFn: async () => {
			try {
				const res = await fetch("/api/users/suggested");
				const data = await res.json();
				if(data.error){
					throw new Error(data.error);
				}
				console.log("users data is: ", data);
				return data;
			} catch (error) {
				throw new Error(error);
			}
		},
		retry: false
	})
	// if(users?.length === 0){
	// 	return (<div
	// 		className="md:w-64 w-0"
	// 	>

	// 	</div>);
	// }

	console.log("users is: ", users);
	const queryClient = useQueryClient();
	
	const {mutate: followUser, isPending, isError, error} = useMutation({
		mutationFn: async(id) => {
			try {
				console.log("id is: ", id);
				const res = await fetch(`/api/users/follow/${id}`, {
					method: 'POST'
				});
				const data = await res.json();
				if(data.error){
					throw new Error(data.error);
				}
				console.log("follow data is: ", data);
				return data;
			} catch (error) {
				throw new Error(error);
			}
		},
		onSuccess: () => {
			toast.success("Followed Successfully!!");
			refetch();
			queryClient.invalidateQueries({queryKey: ["notifications"]});
		}
	})
	return (
		<div className='hidden md:w-64 lg:block my-4 mx-2'>
			{(users && users.length > 0) ? <div className='bg-[#16181C] p-4 rounded-md sticky top-2'>
				<p className='font-bold'>Who to follow</p>
				<div className='flex flex-col gap-4'>
					{/* item */}
					{isLoading && (
						<>
							<RightPanelSkeleton />
							<RightPanelSkeleton />
							<RightPanelSkeleton />
							<RightPanelSkeleton />
						</>
					)}
					{!isLoading &&
						users?.map((user) => (
							<Link
								to={`/profile/${user.username}`}
								className='flex items-center justify-between gap-4'
								key={user._id}
							>
								<div className='flex gap-2 items-center'>
									<div className='avatar'>
										<div className='w-8 rounded-full'>
											<img src={user.profileImg || "/avatar-placeholder.png"} />
										</div>
									</div>
									<div className='flex flex-col'>
										<span className='font-semibold tracking-tight truncate w-28'>
											{user.fullName}
										</span>
										<span className='text-sm text-slate-500'>@{user.username}</span>
									</div>
								</div>
								<div>
									<button
										className='btn bg-white text-black hover:bg-white hover:opacity-90 rounded-full btn-sm'
										onClick={(e) => {
											e.preventDefault();
											followUser(user._id)
										}}
									>
										{isPending ? `Following...` : 'Follow'}
									</button>
								</div>
							</Link>
						))}
				</div>
			</div> : 
			<div></div>
			}
		</div>
	);
};
export default RightPanel;