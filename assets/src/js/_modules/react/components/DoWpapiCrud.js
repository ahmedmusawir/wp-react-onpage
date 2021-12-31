import React, { useEffect, useState } from 'react';
import WPAPI from 'wpapi';
import Loader from 'react-loader-spinner';

function DoWpapiCrud() {
  const [posts, setPosts] = useState([]);
  const [isPending, setIsPending] = useState(false);

  const wp = new WPAPI({
    endpoint: 'http://localhost:10004/wp-json',
    username: 'moose',
    password: 'xZeL OGcT X393 LGz7 Agfo FWnL',
  });

  // const wp = new WPAPI({
  //   endpoint: 'http://localhost:10004/wp-json',
  //   username: 'cgteam',
  //   password: '8gLw rmzE hQhZ av4L 1ljg x119',
  // });
  // SETTING CPT ROUTE
  wp.flag = wp.registerRoute('wp/v2', '/flag/(?P<id>\\d+)');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsPending(true);
        // DELETE CUSTOM POST TYPE: FLAG w/ ACF
        // const fetchedPosts = await wp.posts();
        const fetchedPosts = await wp.posts().id(1079).delete();
        // const fetchedPosts = await wp.flag().id(1079).delete();
        console.log(fetchedPosts);
        setPosts(fetchedPosts);
        setIsPending(false);
      } catch (e) {
        console.log('ERROR:', e);
        return [];
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="list-group">
      <section className="list-group">
        {isPending && (
          <div className="text-center">
            <Loader type="Bars" color="red" height={100} width={100} />
          </div>
        )}

        {JSON.stringify(posts, null, 2)}
      </section>
    </div>
  );
}

export default DoWpapiCrud;
