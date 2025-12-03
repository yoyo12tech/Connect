import { useInfiniteQuery } from "@tanstack/react-query";
import Loading from "../components/loading";
import Post from "../components/post";
import CreatePost from "../components/createPost";
import { getDaPosts } from "../services/postServices";
import { useEffect } from "react";

const Feedback = () => {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: getDaPosts,
    // 👇 Tells React Query what page to load next from the API response and is passed to my queryfn as input object
    getNextPageParam: (lastPage) => {
      const info = lastPage.paginationInfo;

      if (info.nextPage <= info.numberOfPages) {
        return info.nextPage;
      }

      return undefined; // No more pages
    }
  });

  // 👇 Infinite scroll: fetch next page when user scrolls near bottom
  useEffect(() => {
    function handleScroll() {
      const bottom =
        window.innerHeight + window.scrollY >=
        document.body.scrollHeight - 6100;

      if (bottom && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }

    window.addEventListener("scroll", handleScroll); //keeps running untill coponents updates or unmounts
    return () => window.removeEventListener("scroll", handleScroll);
  },[hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading)
    return (
      <div className="mt-56">
        <Loading />
      </div>
    );

  if (error) return <h1>Error loading posts</h1>;

  return (
    <>
      <CreatePost getAllPosts={refetch} />

      <div className="pb-12">
        {data.pages.flatMap((page) => //flatMap to make all the diffrent pages arrays into 1 arrya
          page.posts.map((post) => (
            <Post key={post._id} post={post} getPosts={refetch} />
          ))
        )}

        {isFetchingNextPage && (
          <div className="mt-10">
            <Loading />
          </div>
        )}
      </div>
    </>
  );
};

export default Feedback;
