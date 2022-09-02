import React, { useState } from 'react';
import WPAPI from 'wpapi';

function AddImageForm() {
  const [imgUrl, setImgUrl] = useState('');
  const [title, setTitle] = useState('');

  // LOCAL OOP PHP SITE
  const wp = new WPAPI({
    endpoint: 'http://localhost:10004/wp-json',
    username: 'cgteam',
    password: '55s9 uEmr OiAA Jxm3 Bhu1 JOkn',
  });

  const createPost = async (post) => {
    console.log('Img URL: ', imgUrl);

    const thePost = await wp
      .posts()
      .create({
        title: title,
        content: 'Excellent and compelling demonstration',
        status: 'publish',
        categories: [4, 35],
        tags: [128, 129],
      })
      .then((post) => {
        // Create the media record & upload your image file
        const filePath = imgUrl;
        // var filePath = '/path/to/the/image/to/upload.jpg';
        return wp
          .media()
          .file(filePath)
          .create({
            title: 'Amazing featured image',
            // This property associates our new media record with our new post:
            post: post.id,
          })
          .then((media) => {
            console.log('Media uploaded with ID #' + media);
            // Set the new media record as the post's featured media
            return wp.posts().id(post.id).update({
              featured_media: media.id,
            });
          });
      });

    console.log('The New Post:', thePost);
  };

  return (
    <div className="p-3">
      <input
        className="form-control mb-2"
        type="text"
        name=""
        id=""
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="form-control mb-2"
        type="file"
        name=""
        id=""
        onChange={(e) => setImgUrl(e.target.files[0])}
      />
      <textarea
        className="form-control mb-2"
        name=""
        id=""
        cols="30"
        rows="10"
      ></textarea>
      <button type="submit" className="btn btn-secondary" onClick={createPost}>
        Post w Image
      </button>
    </div>
  );
}

export default AddImageForm;
