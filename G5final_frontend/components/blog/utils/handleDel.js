import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

export const useBlogDel = (id) => {
    const router = useRouter();

    const handleDelete = async (t) => {
        try {
            const formData = new FormData();
            formData.append('Valid', 0);

            const response = await fetch(`http://localhost:3005/api/blog/${id}`, {
                method: 'PUT',
                body: formData,
            });
            if (response.ok) {
                router.push('/member/blog');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const delAlert = () => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-danger mx-1 text-white',
                cancelButton: 'btn btn-secondary text-secondary-emphasis mx-1',
            },
            buttonsStyling: false,
        });

        swalWithBootstrapButtons
            .fire({
                title: '確定要刪除此篇文章嗎？',
                showCancelButton: true,
                confirmButtonText: '刪除',
                cancelButtonText: '取消',
                reverseButtons: true,
            })
            .then((result) => {
                if (result.isConfirmed) {
                    handleDelete(); 
                } 
                console.log("取消");
            });
    };

    return delAlert;
};


