import React, { useState, useEffect } from 'react';
import CommentCard from './CommentCard';
import { FetchApi } from '../../api/Common';

const CommentsSection = () => {
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 3; // Comentarios por página

  // Función para obtener los comentarios desde la API
  const fetchComments = async () => {
    const response = await FetchApi({
      path: 'api/comentario/listar', // Ajusta este endpoint según tu API
      method: 'GET',
    });

    if (response.code === 200 && response.data) {
      setComments(response.data);
    } else {
      console.error(response.message);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  // Cálculo para paginación
  const lastCommentIndex = currentPage * commentsPerPage;
  const firstCommentIndex = lastCommentIndex - commentsPerPage;
  const currentComments = comments.slice(firstCommentIndex, lastCommentIndex);

  // Cambiar página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-5xl font-bold mb-6 justify-center text-gray-800">Comentarios de Clientes</h1>

      <div className="grid grid-cols-3 gap-4">
        {currentComments.map((comment) => (
          <CommentCard key={comment.idComentario} comment={comment} />
        ))}
      </div>

      <div className="flex justify-center mt-6">
        {[1, 2, 3].map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`px-4 py-2 mx-1 ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-white border border-blue-500 text-blue-500'}`}>
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CommentsSection;
