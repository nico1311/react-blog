import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Heading } from 'react-bulma-components';
import Swal from 'sweetalert2';

import EditPostForm from '../components/EditPostForm';
import ApiClient from '../api/ApiClient';

function NewPost () {
  const [location, setLocation] = useLocation();

  const [post, setPost] = useState({
    title: '',
    body: ''
  });
  const [formLoading, setFormLoading] = useState(false);

  const handleSubmission = (values) => {
    setFormLoading(true);
    ApiClient.createPost(values).then((newPost) => {
      Swal.fire({
        title: 'Post created',
        icon: 'success',
        confirmButtonColor: '#3e8ed0',
        timer: 2000
      }).then(() => {
        setLocation(`/posts`);
      });
    }).catch((err) => {
      Swal.fire({
        title: 'Something went wrong',
        text: err.message,
        icon: 'error',
        confirmButtonColor: '#3e8ed0'
      });
    }).finally(() => setFormLoading(false));
  }

  const handleCancel = () => {
    setLocation('/posts');
  }

  return (
    <div className="postEdit">
      <Heading size="3">New post</Heading>
      <EditPostForm
        title={post.title}
        content={post.body}
        loading={formLoading}
        onSubmit={handleSubmission}
        onCancel={handleCancel} />
    </div>
  );
}

export default NewPost;
