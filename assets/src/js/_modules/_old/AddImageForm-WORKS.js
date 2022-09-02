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
    const filePath = imgUrl;

    // UPLOADING IMAGE
    const uploadedImage = await wp.media().file(filePath).create({
      title: 'My awesome image',
      alt_text: 'an image of something awesome',
      caption: 'This is the caption text',
      description: 'More explanatory information',
    });

    console.log('Uploaded Image ID:', uploadedImage.id);

    const newPost = await wp.posts().create({
      title: title,
      content: 'Excellent and compelling demonstration',
      featured_media: uploadedImage.id,
      status: 'publish',
      categories: [157, 30],
      tags: [374, 375],
    });

    console.log('New Post:', newPost);
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
