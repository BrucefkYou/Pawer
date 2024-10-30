import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';

export default function ColIcon({
  id = '',
  fav = false,
  color = '',
  handleToggleFav = () => {},
}) {
  return (
    <button
      onClick={() => handleToggleFav(id)}
      aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
      style={{
        all: 'unset', // 移除所有預設樣式
        cursor: 'pointer',
      }}
    >
      {fav ? <BsBookmarkFill color={`${color}`} /> : <BsBookmark />}
    </button>
  );
}
