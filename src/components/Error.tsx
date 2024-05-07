interface ErrorProps {
  error: Error;
}

export default function Error({ error }: ErrorProps) {
  return <div className="error">Error found: {error.message}</div>;
}
