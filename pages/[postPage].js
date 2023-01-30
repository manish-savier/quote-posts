import path from "path";
import Navbar from '../components/Navbar'

export async function getStaticPaths() {

  const res = await fetch('https://dummyjson.com/posts')
  const data = await res.json()
  const totalCount = data.total;

//   const paths = data.posts.map(post => ({
//     params: {postPage: post.id.toString()},
// }));

const paths = []
for(let i = 1; i <= totalCount; i++){
  paths.push({params: {postPage: i.toString()}})
}

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({params}) {

  const res = await fetch(`https://dummyjson.com/posts/${params.postPage}`)
  const post = await res.json()

  return {
    props: { post },
  }
}



const postPage = ({post}) => {


  return (<>
  <Navbar />
  {post?(<div className="container">
  <div className="posts_div postPageDiv" key={post.id}>
    <h4>{post.title}</h4>
    <p>{post.body}</p>
    </div>
</div>):(<div><p>No Post Found</p></div>)}
</>)
    
}

export default postPage;