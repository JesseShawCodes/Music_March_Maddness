export default function WarningMessage({message}) {
  return (
    <div className="alert alert-warning border-0" role="alert">
      <strong>Warning:</strong> {message || "We are actively working to improve this experience, but some features may not work as expected. Thank you for your patience!"}
    </div>
  );
}
