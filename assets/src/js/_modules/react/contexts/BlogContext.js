import React, { createContext, useState, useEffect } from 'react';
import WPAPI from 'wpapi';
export const BlogContext = createContext();

function BlogContextProvider(props) {
  const [posts, setPosts] = useState([]);
  const [pageNumber, setPageNumber] = useState(2);
  const [totalPages, setTotalPages] = useState(1);
  const [isPending, setIsPending] = useState(false);

  const wp = new WPAPI({
    endpoint: 'http://localhost:10004/wp-json',
    username: 'cgteam',
    password: '8gLw rmzE hQhZ av4L 1ljg x119',
  });

  useEffect(() => {
    async function fetchPosts() {
      try {
        setIsPending(true);
        // FETCHING POSTS
        const fetchedPosts = await wp.posts().get();
        // console.log(fetchedPosts);

        // GETTING TOTAL PAGES
        const totalPages = fetchedPosts._paging.totalPages;
        setTotalPages(totalPages);

        setPosts(fetchedPosts);
        setIsPending(false);
      } catch (e) {
        // print error
        console.log(e);
        return [];
      }
    }

    fetchPosts();
  }, []);

  const fetchMorePosts = async (pageNumber) => {
    const request = wp.posts();

    if (pageNumber > 1) {
      request.page(pageNumber);
    }

    const posts = await request.get();

    return {
      posts,
      nextPageNumber:
        posts._paging.totalPages > pageNumber ? pageNumber + 1 : null,
    };
  };

  const handleLoadMore = async () => {
    const snapshot = await fetchMorePosts(pageNumber);
    // console.log('HANDLE MORE', pageNumber);
    setIsPending(true);

    setPageNumber(snapshot.nextPageNumber);
    setPosts([
      // Preserve previous WordPress posts
      ...posts,

      // Add new WordPress posts
      ...snapshot.posts,
    ]);

    setIsPending(false);
  };

  const deletePost = async (id) => {
    setIsPending(true);

    await wp
      .posts()
      .id(id)
      .delete()
      .then((res) => {
        console.log(res);
        setPosts(posts.filter((post) => post.id !== res.id));
        setIsPending(false);
      });
  };

  return (
    <BlogContext.Provider
      value={{
        posts,
        setPosts,
        deletePost,
        handleLoadMore,
        totalPages,
        pageNumber,
        isPending,
      }}
    >
      {props.children}
    </BlogContext.Provider>
  );
}

export default BlogContextProvider;
