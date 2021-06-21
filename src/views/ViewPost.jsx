import React, { useEffect, useState } from 'react';
import { useRoute } from 'wouter';
import { Heading } from 'react-bulma-components';

import ErrorBox from '../components/ErrorBox';
import ApiClient from '../api/ApiClient';

function ViewPost () {
  const [match, params] = useRoute('/posts/:id');

  const [post, setPost] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    ApiClient.getPost(params.id).then((post) => {
      setPost(post);
    })
    .catch((err) => setError(err.message))
    .finally(() => setLoading(false));
  }, []);

  if (isLoading) return (
    <div>Loading...</div>
  );

  if (error) return (
    <ErrorBox message={error} />
  );

  if (post) return (
    <div className="postView">
      <Heading size="3">{post.title}</Heading>
      <p>
        {post.body}
      </p>
    </div>
  );

  return null;
}

export default ViewPost;
