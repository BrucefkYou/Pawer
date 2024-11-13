import { useState, useEffect } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/use-auth';
import { useBlogDel } from '@/components/blog/utils/handleDel';

export default function DeleBtn({ btnName }) {
  const router = useRouter();
  const { id } = router.query;
  const { auth } = useAuth();
  const [ownerId, setOwnerId] = useState(null);
  const uid = auth.memberData.id;

  useEffect(() => {
    if (id) {
      const fetchArticle = async () => {
        try {
          const response = await fetch(`http://localhost:3005/api/blog/${id}`);
          const data = await response.json();
          const blogData = data[0];
          const memberId = blogData.MemberID;
          setOwnerId(memberId);
        } catch (error) {
          console.error('無法獲取資料', error);
        }
      };
      fetchArticle();
    }
  }, [id, auth.memberData.id]);

  const isOwner = uid === ownerId;

  const delBlog = useBlogDel(id);

  return (
    <div>
      {isOwner && (
        <div type="button" onClick={delBlog}>
          <FaTrashAlt style={{ color: '#22355c' }} />
        </div>
      )}
    </div>
  );
}
