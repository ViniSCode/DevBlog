import { useEffect, useState } from 'react';
import { database } from '../../services/firebase';
import { useAuth } from './../../hooks/useAuth';
import './styles.scss';

export function Comments ( {slug} ) {
  const { user} = useAuth();
  const databaseSlug = slug.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
  const [postComments,setPostComments] = useState();

  useEffect( ()=> { 
    const commentsRef = database.ref(`posts/${databaseSlug}`);
    commentsRef.on('value', comment => {
      // transforma obj em array
      const databaseComments = comment.val();
      const firebaseComments = databaseComments.comments ?? {};

      const parsedComments = Object.entries(firebaseComments).map(([key, value]) => {
        return { 
          id: key,
          content: value.content,
          author: value.author
        }
      });

      setPostComments(parsedComments.reverse());
    })

    return () => {
      commentsRef.off('value');
    }
  }, [databaseSlug, user?.id]);


  return (
    <>
      {
        postComments && (
          postComments.map( comment => {
            return (
              <div key={comment.id} className="comment">
              <p>{comment.content}</p>
              <footer>
                <div className="user-info">
                  <img src={comment.author.avatar} alt={comment.author.name} />
                  <span>{comment.author.name}</span>
                </div>
                {/* <div>{children}</div> */}
              </footer>
            </div>
            )
          })
        )
      }
    </>
  );
}