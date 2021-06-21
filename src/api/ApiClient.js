class ApiClient {
  static baseUrl = 'https://jsonplaceholder.typicode.com';

  /**
   * @typedef {Object} Post
   * @property {number} id - Post ID
   * @property {number} userId - Author ID
   * @property {string} title - Post title
   * @property {string} body - Post content
   */

  /**
   * Wrapper function to perform API calls.
   * @param {string} path
   * @param {string} [method='GET']
   * @param {Object} [body]
   * @returns {Promise<Object>}
   */
  static async call (path, method = 'GET', body) {
    try {
      /** @type {RequestInit} */
      const init = { method };
      if (['POST', 'PATCH', 'PUT'].includes(method)) {
        init.body = JSON.stringify(body);
        init.headers = {
          'Content-type': 'application/json; charset=UTF-8'
        }
      }
      const response = await fetch(`${this.baseUrl}/${path}`, init);
      if (!response.ok) return Promise.reject(new Error(`Request failed with status ${response.status}`));
      const responseData = await response.json();
      return responseData;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Create a post
   * @param {number} id
   * @param {Partial<Post>} body
   * @returns {Promise<Post>}
   */
   static createPost(body) {
    return this.call(`posts`, 'POST', body);
  }

  /**
   * Fetch all posts
   * @returns {Promise<Post[]>}
   */
  static getAllPosts () {
    return this.call('posts');
  }

  /**
   * Fetch a post by ID
   * @param {number} id
   * @returns {Promise<Post>}
   */
  static getPost(id) {
    return this.call(`posts/${id}`);
  }

  /**
   * Edit a post by ID
   * @param {number} id
   * @param {Partial<Post>} body
   * @returns {Promise<Post>}
   */
   static editPost(id, body) {
    return this.call(`posts/${id}`, 'PATCH', body);
  }

  /**
   * Delete a post by ID
   * @param {number} id
   * @returns {Promise<Object>}
   */
  static deletePost(id) {
    return this.call(`posts/${id}`, 'DELETE');
  }

}

export default ApiClient;
