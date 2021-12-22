import React, { useEffect, useState } from 'react';
import WPAPI from 'wpapi';
import Loader from 'react-loader-spinner';
import parser from 'react-html-parser';

function DoWpapiOne() {
  const [posts, setPosts] = useState([]);
  const [isPending, setIsPending] = useState(false);

  const wp = new WPAPI({
    endpoint: 'http://localhost:10004/wp-json',
    username: 'cgteam',
    password: '8gLw rmzE hQhZ av4L 1ljg x119',
  });
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsPending(true);
        // Fetch posts
        // const fetchedPosts = await wp.posts().get();
        // Fetch Category
        const fetchedPosts = await wp.categories().get();
        // Fetch Category
        // const fetchedPosts = await wp.categories().get();
        // Fetch Pages
        // const fetchedPosts = await wp.categories().get();
        // Fetch Custom Post Types
        // const fetchedPosts = await wp.categories().get();
        // Fetch Users
        // const fetchedPosts = await wp.categories().get();
        // Fetch Posts by Status
        // const fetchedPosts = await wp.categories().get();
        // Fetch Search by Text
        // const fetchedPosts = await wp.categories().get();
        // Fetch Posts Ordered by Title
        // const fetchedPosts = await wp.categories().get();
        // Fetch Posts by Category ID
        // const fetchedPosts = await wp.categories().get();
        // Fetch Posts by Category Slugs
        // const fetchedPosts = await wp.categories().get();

        console.log(fetchedPosts);
        setPosts(fetchedPosts);
        setIsPending(false);
      } catch (e) {
        // print error
        console.log(e);
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

        {/* POSTS BY CATEGORY SLUG */}
        {/* {posts.map((post) => (
          <li key={post.id} className="list-group-item">
            {parser(post.content.rendered)}{' '}
            <span className="badge badge-warning pill p-2">
              SLUG: {post.slug}
            </span>
            <span className="badge badge-success pill p-2">ID: {post.id}</span>
            <span className="badge badge-info pill p-2 ml-2">
              CatID:{' '}
              {post.categories.map((cat) => {
                return cat + ', ';
              })}
            </span>
          </li>
        ))} */}

        {/* POSTS BY CATEGORY ID */}
        {/* {posts.map((post) => (
          <li key={post.id} className="list-group-item">
            {parser(post.content.rendered)}{' '}
            <span className="badge badge-warning pill p-2">
              SLUG: {post.slug}
            </span>
            <span className="badge badge-success pill p-2">ID: {post.id}</span>
            <span className="badge badge-info pill p-2 ml-2">
              CatID:{' '}
              {post.categories.map((cat) => {
                return cat + ', ';
              })}
            </span>
          </li>
        ))} */}

        {/* POSTS ORDERED BY TITLE */}
        {/* {posts.map((post) => (
          <li key={post.id} className="list-group-item">
            {parser(post.content.rendered)}{' '}
            <span className="badge badge-warning pill p-2">
              SLUG: {post.slug}
            </span>
            <span className="badge badge-success pill p-2">ID: {post.id}</span>
            <span className="badge badge-info pill p-2 ml-2">
              CatID:{' '}
              {post.categories.map((cat) => {
                return cat + ', ';
              })}
            </span>
          </li>
        ))} */}

        {/* SEARCH POSTS BY TEXT */}
        {/* {posts.map((post) => (
          <li key={post.id} className="list-group-item">
            {parser(post.content.rendered)}{' '}
            <span className="badge badge-warning pill p-2">
              SLUG: {post.slug}
            </span>
            <span className="badge badge-success pill p-2">ID: {post.id}</span>
            <span className="badge badge-info pill p-2 ml-2">
              CatID:{' '}
              {post.categories.map((cat) => {
                return cat + ', ';
              })}
            </span>
          </li>
        ))} */}

        {/* POSTS BY PUBLISH STATUS */}
        {/* {posts.map((post) => (
          <li key={post.id} className="list-group-item">
            {parser(post.content.rendered)}{' '}
            <span className="badge badge-warning pill p-2">
              SLUG: {post.slug}
            </span>
            <span className="badge badge-success pill p-2">ID: {post.id}</span>
            <span className="badge badge-info pill p-2 ml-2">
              CatID:{' '}
              {post.categories.map((cat) => {
                return cat + ', ';
              })}
            </span>
          </li>
        ))} */}

        {/* PAGE BY SLUG */}
        {/* {posts.map((post) => (
          <li key={post.id} className="list-group-item">
            {parser(post.content.rendered)}{' '}
            <span className="badge badge-warning pill p-2">
              SLUG: {post.slug}
            </span>
            <span className="badge badge-success pill p-2">ID: {post.id}</span>
            <span className="badge badge-info pill p-2 ml-2">
              CatID:{' '}
              {post.categories.map((cat) => {
                return cat + ', ';
              })}
            </span>
          </li>
        ))} */}

        {/* SETTINGS ONLY */}
        {/* {posts.map((post) => (
          <li key={post.id} className="list-group-item">
            {parser(post.content.rendered)}{' '}
            <span className="badge badge-warning pill p-2">
              SLUG: {post.slug}
            </span>
            <span className="badge badge-success pill p-2">ID: {post.id}</span>
            <span className="badge badge-info pill p-2 ml-2">
              CatID:{' '}
              {post.categories.map((cat) => {
                return cat + ', ';
              })}
            </span>
          </li>
        ))} */}

        {/* USERS ONLY */}
        {/* {posts.map((post) => (
          <li key={post.id} className="list-group-item">
            {parser(post.content.rendered)}{' '}
            <span className="badge badge-warning pill p-2">
              SLUG: {post.slug}
            </span>
            <span className="badge badge-success pill p-2">ID: {post.id}</span>
            <span className="badge badge-info pill p-2 ml-2">
              CatID:{' '}
              {post.categories.map((cat) => {
                return cat + ', ';
              })}
            </span>
          </li>
        ))} */}

        {/* CUSTOM POST TYPES ONLY */}
        {/* {posts.map((post) => (
          <li key={post.id} className="list-group-item">
            {parser(post.content.rendered)}{' '}
            <span className="badge badge-warning pill p-2">
              SLUG: {post.slug}
            </span>
            <span className="badge badge-success pill p-2">ID: {post.id}</span>
            <span className="badge badge-info pill p-2 ml-2">
              CatID:{' '}
              {post.categories.map((cat) => {
                return cat + ', ';
              })}
            </span>
          </li>
        ))} */}

        {/* PAGES ONLY */}
        {/* {posts.map((post) => (
          <li key={post.id} className="list-group-item">
            {parser(post.content.rendered)}{' '}
            <span className="badge badge-warning pill p-2">
              SLUG: {post.slug}
            </span>
            <span className="badge badge-success pill p-2">ID: {post.id}</span>
            <span className="badge badge-info pill p-2 ml-2">
              CatID:{' '}
              {post.categories.map((cat) => {
                return cat + ', ';
              })}
            </span>
          </li>
        ))} */}

        {/* CATEGORIES ONLY */}
        {posts.map((cat) => (
          <li key={cat.id} className="list-group-item">
            {parser(cat.name)}{' '}
            <span className="badge badge-warning pill p-2 mr-2">
              SLUG: {cat.slug}
            </span>
            <span className="badge badge-success pill p-2">ID: {cat.id}</span>
            <span className="badge badge-info pill p-2 ml-2">
              Taxonomy: {cat.taxonomy}
            </span>
          </li>
        ))}

        {/* POSTS ONLY */}
        {/* {posts.map((post) => (
          <li key={post.id} className="list-group-item">
            {parser(post.content.rendered)}{' '}
            <span className="badge badge-warning pill p-2">
              SLUG: {post.slug}
            </span>
            <span className="badge badge-success pill p-2">ID: {post.id}</span>
            <span className="badge badge-info pill p-2 ml-2">
              CatID:{' '}
              {post.categories.map((cat) => {
                return cat + ', ';
              })}
            </span>
          </li>
        ))} */}
      </section>
    </div>
  );
}

export default DoWpapiOne;
