import React, { useEffect, useState } from 'react';
import { useLocation, useRoute } from 'wouter';
import { Heading } from 'react-bulma-components';
import Swal from 'sweetalert2';

import ErrorBox from '../components/ErrorBox';
import EditPostForm from '../components/EditPostForm';
import ApiClient from '../api/ApiClient';

function EditPost () {
  const [match, params] = useRoute('/posts/:id/edit');
  const [location, setLocation] = useLocation();

  const [post, setPost] = useState(null);
  const [initialLoading, setInitialLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setInitialLoading(true);
    ApiClient.getPost(params.id)
    .then((post) => setPost(post))
    .catch((err) => setError(err.message))
    .finally(() => setInitialLoading(false));
  }, []);

  const handleSubmission = (values) => {
    setFormLoading(true);
    ApiClient.editPost(post.id, values).then((newPost) => {
      setPost(newPost);
      Swal.fire({
        title: 'Post edited',
        icon: 'success',
        confirmButtonColor: '#3e8ed0',
        timer: 2000
      }).then(() => {
        setLocation(`/posts/${post.id}`);
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

  if (initialLoading) return (
    <div>Loading...</div>
  );

  if (error) return (
    <ErrorBox message={error} />
  );

  if (post) return (
    <div className="postEdit">
      <Heading size="3">Edit post</Heading>
      <EditPostForm
        title={post.title}
        content={post.body}
        loading={formLoading}
        onSubmit={handleSubmission}
        onCancel={handleCancel} />
    </div>
  );

  return null;
}

export default EditPost;
