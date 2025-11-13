interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="text-red-600 font-semibold text-center mt-10">
      {message}
    </div>
  );
}
