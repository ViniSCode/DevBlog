import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Post } from "../../components/Post";
import { database } from "../../services/firebase";
import './styles.scss';

type changePage = {
  event: {
    selected: number;
  }
}

type FirebasePosts = Record<string, { 
  text: string;
  title: string;
  user: {
    authorId: string;
    avatar: string;
    name: string;
  }
}>

type PostsType = {
  id: string;
  text: string;
  title: string;
  user: {
    authorId: string;
    avatar: string;
    name: string;
  }
}

export function Posts () {
  const [posts, setPosts] = useState<PostsType[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  
  useEffect( () => {
    const postRef = database.ref("posts");

    postRef.on('value', posts => {
      const databasePosts =  posts.val();
      const firebasePosts: FirebasePosts = databasePosts ?? {};
      const parsedPost = Object.entries(firebasePosts).map(([key, value]) => {
        return {
          id: key,
          text: value.text,
          title: value.title,
          user: {
            authorId: value.user.authorId,
            avatar: value.user.avatar,
            name: value.user.name,
          }
        }
      });

      setPosts(parsedPost.reverse());
    })

    return () => {
      postRef.off('value');
    }
   
  }, [])

  const postsPerPage = 5;
  const pagesVisited = pageNumber * postsPerPage;

  const displayPosts = posts.slice(pagesVisited, pagesVisited + postsPerPage)
  .map((post) => {
    return(
      <Post 
        key={post.id}
        postId={post.id}
        text={post.text}
        title={post.title}
        user={post.user}
      />
    )
  });

  const pageCount = Math.ceil(posts.length / postsPerPage);
  const changePage = ({selected}: { selected: number }) => {
    setPageNumber(selected);
  };

  return (
    <>
      <div className="posts-container">
      { displayPosts }
      </div>

      <ReactPaginate 
        previousLabel={"Prev"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBtn"}
        previousLinkClassName={"previousBtn"}
        nextLinkClassName={"nextBtn"}
        activeClassName={"activeBtn"}
      />
    </>
  );
}