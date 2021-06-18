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
      const response = await fetch(`${this.baseUrl}/${path}`, {
        method
      });
      if (!response.ok) return Promise.reject(new Error(`Request failed with status ${response.status}`));
      const body = await response.json();
      return body;
    } catch (err) {
      Promise.reject(err);
    }
  }

  /** Fetch all posts
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

}

export default ApiClient;
