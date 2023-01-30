import Post from "../components/Post";
import Navbar from '../components/Navbar'
import { useEffect, useState } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';

export async function getStaticProps() {
  const res = await fetch(`https://dummyjson.com/posts?skip=0&limit=10`)
  const getPosts = await res.json()
  const posts = getPosts.posts;
  let postCount = getPosts.total;
  postCount = +postCount;

  return { props: { posts, postCount } }
}

const Home = ({ posts, postCount }: { posts: [], postCount: number }) => {

  const [viewPosts, setViewPosts] = useState<any[]>(posts);
  const [searchPosts, setSearchPosts] = useState<any[]>([])
  const [hasMore, setHasMore] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const totalPostCount = postCount;

  const fetchData = async () => {
    const res = await fetch(`https://dummyjson.com/posts?skip=${viewPosts.length}&limit=10`)
    const getNewPosts = await res.json()
    const newPosts = getNewPosts.posts;
    setViewPosts(prevPosts => [...prevPosts, ...newPosts]);
  }

  useEffect(() => {
    setHasMore(viewPosts.length < totalPostCount ? true : false);
  }, [viewPosts])

  const searchPost = (e: any) => {
    const value = e.target.value.toLowerCase();
    setSearchValue(value);
    const filterList = viewPosts.filter(post => post.title.toLowerCase().includes(searchValue));
    setSearchPosts(filterList);
  }


  return (<>
    <Navbar
      value={searchValue}
      searchPost={searchPost}
    />

    {searchPosts.length === 0 && !searchValue ?
      <InfiniteScroll
        dataLength={viewPosts.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <Post posts={viewPosts} />
      </InfiniteScroll> :
      <Post posts={searchPosts} />
    }
    {searchValue && searchPosts.length === 0 && <p style={{ textAlign: 'center', marginTop: '3rem' }}>No Post Found</p>}

  </>)
}

export default Home;