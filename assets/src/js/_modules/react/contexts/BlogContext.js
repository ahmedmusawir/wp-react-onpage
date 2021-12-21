import React, { createContext, useState, useEffect } from 'react';
import WPAPI from 'wpapi';
export const BlogContext = createContext();

function BlogContextProvider(props) {
  const [posts, setPosts] = useState([]);
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
        // Fetch posts
        const fetchedPosts = await wp.posts().get();

        // console.log(fetchedPosts);
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
    <BlogContext.Provider value={{ posts, setPosts, deletePost, isPending }}>
      {props.children}
    </BlogContext.Provider>
  );
}

export default BlogContextProvider;
