import React from 'react';

const CommentCard = ({ comment }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mb-4 h-full flex flex-col justify-between">
      <div>
        <h3 className="text-md font-semibold text-gray-800">{comment.nombrePersona}</h3>
        <p className="text-gray-500 text-sm text-gray-600">{comment.textoComentario}</p>
      </div>
      <p className="text-gray-400 text-xs mt-4">Publicado: {new Date(comment.createdAt).toLocaleDateString()}</p>
    </div>
  );
};

export default CommentCard;
