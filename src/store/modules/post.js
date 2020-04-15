export default {
  actions: {
    async fetchPosts( ctx, limit = 3 ) {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=${limit}`
      );
      const posts = await res.json();

      ctx.commit('updatePosts', posts)
    }
  },
  mutations: {
    updatePosts(state, posts) {
      state.posts = posts;
    },

    createPost(state, newPost) {
      state.posts.unshift(newPost)
    }
  },
  state: {
    posts: []
  },
  getters: {
    validPosts(state) {
      return state.posts.filter(post => {
        return post.title && post.body
      })
    },
    allPosts(state) {
      return state.posts
    },
    postsCount(state, getters) {
      return getters.validPosts.length
    }
  },
}