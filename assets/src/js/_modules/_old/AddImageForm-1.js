import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import WPAPI from 'wpapi';
import { BlogContext } from '../contexts/BlogContext';

function AddImageForm() {
  const [imgUrl, setImgUrl] = useState('');
  const [title, setTitle] = useState('');
  // const imgUrl =
  // 'C:\\Users\\UserPictures\\2020-09IMG-ac27fd30ab99171eeed799af99f6c850-V.jpg';

  // LOCAL OOP PHP SITE
  const wp = new WPAPI({
    endpoint: 'http://localhost:10004/wp-json',
    username: 'cgteam',
    password: '55s9 uEmr OiAA Jxm3 Bhu1 JOkn',
  });

  // REMOTE DIGITAL SUPPORT STAFF SITE ON VPS
  // const wp = new WPAPI({
  //   endpoint: 'https://digitalsupportstaff.com/wp-json',
  //   username: 'cgteam',
  //   password: 'H3sF 1U0d n7RP A6iV wMGS GUBG',
  // });

  const createPost = async (post) => {
    console.log('Img URL: ', imgUrl);
    const filePath = imgUrl;

    // UPLOADING IMAGE
    const uploadedImage = await wp.media().file(filePath).create({
      title: 'Amazing featured image',
      // This property associates our new media record with our new post:
      // post: post.id, // DID NOT WORK
    });

    const newPost = await wp.posts().create({
      title: title,
      content: 'Excellent and compelling demonstration',
      featured_media: uploadedImage.id,
      status: 'publish',
      categories: [4, 35],
      tags: [128, 129],
    });

    console.log('New Post:', newPost);
    // .then((post) => {
    //   console.log('Post ID: ', post.id);
    //   console.log('Post CATS: ', post.categories);
    //   console.log('Post TAGS: ', post.tags);
    //   // Create the media record & upload your image file
    //   const filePath = imgUrl;
    //   // var filePath = '/path/to/the/image/to/upload.jpg';
    //   return wp
    //     .media()
    //     .file(filePath)
    //     .create({
    //       title: 'Amazing featured image',
    //       // This property associates our new media record with our new post:
    //       post: post.id,
    //     })
    //     .then((media) => {
    //       console.log('Media uploaded with ID #' + media);
    //     });
    // });
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
