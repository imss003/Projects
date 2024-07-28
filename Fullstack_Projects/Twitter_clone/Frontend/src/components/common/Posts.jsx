import Post from "./Post";
import PostSkeleton from "../skeleton/PostSkeleton";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const Posts = ({feedType}) => {
	const getPostEndpoint = () => {
		if(feedType == "forYou"){
			return "/api/posts/all";
		}
		else if(feedType == "following"){
			return "/api/posts/following";
		}
		else if(feedType == "posts"){
			
		}
		else{
			return "/api/posts/all";
		}
	}
	const POST_ENDPOINT = getPostEndpoint();
	const {data, isLoading, refetch, isRefetching} = useQuery({
		queryKey: ["posts"],
		queryFn: async () => {
			try {
				const res = await fetch(POST_ENDPOINT);
				const data = await res.json();
				if(data.error){
					throw new Error(error);
				}
				console.log("Posts are in posts.jsx: ", data);
				return data;
			} catch (error){
				throw new Error(error);
			}
		}
	});
	useEffect(() => {
		refetch();
	}, [feedType, refetch])
	return (
		<>
			{(isLoading || isRefetching) && (
				<div className='flex flex-col justify-center'>
					<PostSkeleton />
					<PostSkeleton />
					<PostSkeleton />
				</div>
			)}
			{!isLoading && !isRefetching && data.posts?.length === 0 && <p className='text-center my-4'>No posts in this tab. Switch 👻</p>}
			{!isLoading && !isRefetching && data.posts && (
				<div>
					{data.posts.map((p) => (
						<Post key={p._id} post={p} />
					))}
				</div>
			)}
		</>
	);
};
export default Posts;