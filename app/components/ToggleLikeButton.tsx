

function ToggleLikeButton({ isLiked, onClick }: { isLiked: boolean, onClick: (event: React.MouseEvent<HTMLButtonElement>) => void }) {
  return isLiked ? (
    <button
      onClick={onClick}
      className="bg-red-500 text-white p-2 rounded-full focus:outline-none w-8 h-8"
    >
      <img src="me-gusta.png" alt="Liked" className="w-4 h-4" />
      <i className="fas fa-heart" />
    </button>
  ) : (
    <button
      onClick={onClick}
      className="border border-gray-300 p-2 rounded-full focus:outline-none"
    >
      <img src="me-gusta.png" alt=" Not Liked" className="w-4 h-4" />
      <i className="fas fa-heart" />
    </button>
  );
}

export default ToggleLikeButton;