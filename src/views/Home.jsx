import React, { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { Box, Button, Heading } from 'react-bulma-components';
import Swal from 'sweetalert2';

import ErrorBox from '../components/ErrorBox';
import ApiClient from '../api/ApiClient';

function Home () {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    ApiClient.getAllPosts().then((posts) => {
      setPosts(posts);
    }).catch((err) => {
      setError(err.message);
    });
  }, []);

  const toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });

  const handleDeletion = (id) => {
    Swal.fire({
      title: 'Delete this post?',
      showCancelButton: true,
      confirmButtonColor: '#f14668',
      confirmButtonText: 'Delete',
      cancelButtonColor: '#3e8ed0',
      cancelButtonText: `Cancel`,
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return ApiClient.deletePost(id).catch((err) => {
          Swal.showValidationMessage(`Something went wrong: ${err.message}`)
        });
      }
    }).then((result) => {
      if (result.isConfirmed) {
        setPosts(posts.filter((post) => post.id !== id));
        toast.fire({
          icon: 'success',
          title: 'Post deleted'
        });
      }
    });
  }

  if (error) return (
    <ErrorBox message={error} />
  );

  return (
    <div>
      <Heading size="3">Posts</Heading>
      <div className="posts">
        {posts.map((post) => (
          <Box key={post.id}>
            <div style={{display: 'flex'}}>
              <div style={{display: 'flex', flex: 1}}>
                <Link href={`/posts/${post.id}`} style={{fontWeight: 'bold'}}>
                  {post.title}
                </Link>
              </div>
              <div style={{display: 'flex', gap: 3}}>
                <Button
                  size="small"
                  color="primary"
                  renderAs={Link}
                  href={`/posts/${post.id}`}
                >
                  View
                </Button>
                <Button
                  size="small"
                  color="info"
                  renderAs={Link}
                  href={`/posts/${post.id}/edit`}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  color="danger"
                  onClick={() => handleDeletion(post.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </Box>
        ))}
      </div>
    </div>
  );
}

export default Home;
