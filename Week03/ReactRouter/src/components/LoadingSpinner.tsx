export default function LoadingSpinner() {
  return (
    <div
      className="size-12 animate-spin rounded-full border-6 border-t-transparent border-[hotpink]"
      role="status"
    >
      <span className="sr-only">Loading...:D</span>
    </div>
  );
}
