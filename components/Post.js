import Link from 'next/link'

const Post = ({posts}) => {

    return (<div className="container">
      {posts.map(post=><Link key={post.id} style={{ textDecoration: 'none' }} href={`/${post.id}`}><div className="posts_div">
        <h4>{post.title}</h4>
        <p>{post.body.substr(0, 95)}...</p>
        </div></Link>)}
    </div>)
}

export default Post;