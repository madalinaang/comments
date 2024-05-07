import { useEffect, useState } from "react";
import { useGetUser } from "../hooks/useGetUser";
import { useAddComment } from "../hooks/useAddComment";
import { useAddReply } from "../hooks/useAddReply";

interface WriteCommentProps {
  id?: number;
  replyTo?: string;
  replyAdded?: () => void;
}

export default function WriteComment({
  id,
  replyTo,
  replyAdded,
}: WriteCommentProps) {
  const { data: currentUser } = useGetUser();
  const [content, setContent] = useState<string>("");
  const { mutateAsync: addComment } = useAddComment();
  const { mutateAsync: addReply } = useAddReply();

  useEffect(() => {
    replyTo && setContent("@" + replyTo + " ");
  }, [replyTo]);

  const addNewComment = () => {
    const comment: Comm = {
      id: Math.floor(Math.random() * (80000 - 10 + 1)) + 10,
      content: content,
      createdAt: new Date().toDateString(),
      score: 0,
      user: currentUser!,
      replies: [],
    };
    addComment(comment);
    setContent("");
  };

  const addNewReply = () => {
    const comment: Comm = {
      id: Math.floor(Math.random() * (80000 - 10 + 1)) + 10,
      content: content.replace("@" + replyTo + " ", ""),
      createdAt: new Date().toDateString(),
      score: 0,
      user: currentUser!,
      replies: [],
      replyingTo: replyTo,
    };
    id && addReply({ comment, id });
    setContent("");
    replyAdded && replyAdded();
  };

  const writeComment = () => {
    id === undefined ? addNewComment() : addNewReply();
  };

  return (
    <section className="write-comment">
      <img
        className="avatar-write-desktop"
        src={process.env.PUBLIC_URL + currentUser?.image.png}
        alt="avatar"
      />
      <textarea
        value={content}
        placeholder="Add a comment..."
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            writeComment();
          }
        }}
      />
      <button onClick={writeComment} className="button-write-desktop">
        {id === undefined ? "Send" : "Reply"}
      </button>
      <div className="write-comment-bottom-bar">
        <img
          src={process.env.PUBLIC_URL + currentUser?.image.png}
          alt="avatar"
        />
        <button onClick={writeComment}>
          {id === undefined ? "Send" : "Reply"}
        </button>
      </div>
    </section>
  );
}
