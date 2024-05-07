import Loading from "./components/Loading";
import Error from "./components/Error";
import { useGetComments } from "./hooks/useGetComments";
import CommentsContainer from "./components/CommentsContainer";

export default function Comments() {
  const { data: comments, isLoading, error } = useGetComments();

  return (
    <main className="comments">
      {error && <Error error={error} />}
      {isLoading && <Loading />}
      {comments && <CommentsContainer comments={comments} />}
    </main>
  );
}
