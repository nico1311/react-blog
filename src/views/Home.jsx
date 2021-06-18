import React, { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { Box, Button, Heading } from 'react-bulma-components';

import ApiClient from '../api/ApiClient';

function Home () {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    ApiClient.getAllPosts().then((posts) => {
      setPosts(posts);
    }).catch((err) => {
      console.error(err);
    });
  }, []);

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
                <Button size="small" color="info">Edit</Button>
                <Button size="small" color="danger">Delete</Button>
              </div>
            </div>
          </Box>
        ))}
      </div>
    </div>
  );
}

export default Home;
