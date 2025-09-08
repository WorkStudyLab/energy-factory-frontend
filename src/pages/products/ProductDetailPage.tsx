import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>상품 상세</h1>
      <p>상품 ID: {id}</p>
      <p>상품의 자세한 정보를 확인할 수 있습니다.</p>
    </div>
  );
};

export default ProductDetailPage;
