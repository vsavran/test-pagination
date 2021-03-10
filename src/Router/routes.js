export const ROOT = '/'

export const POST = postId => `${ROOT}posts/${postId || ':postId'}`
