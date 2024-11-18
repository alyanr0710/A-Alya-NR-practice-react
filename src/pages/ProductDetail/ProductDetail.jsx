import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/NavBar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button/Button";
import formatToIDRCurrency from "../../utils/formatToIDRCurrency";
import getAllProducts from "../../services/getAllProducts";

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState();
  const [selectedVersion, setSelectedVersion] = useState('');

  useEffect(() => {
    const allProducts = getAllProducts();
    const product = allProducts.find(prod => prod.slug === slug);
    setProduct(product);
  }, [slug]);

  const handleVersionChange = (e) => {
    setSelectedVersion(e.target.value);
  };

  const renderVersionOptions = () => {
    if (!product) return null;

    switch (product.slug) {
      case 'enhypen-album-romance-untold-full-ver':
      case 'enhypen-album-romance-untold-arcanium-ver':
      case 'enhypen-album-romance-untold-concessio-ver':
      case 'enhypen-album-romance-untold-inceptio-ver':
        return (
          <>
            <option value=''>Select a version</option>
            <option value='inceptio'>INCEPTIO Ver.</option>
            <option value='arcanum'>ARCANUM Ver.</option>
            <option value='concessio'>CONCESSIO Ver.</option>
          </>
        );
      case 'baemon-drip-tag-ver':
        return (
          <>
            <option value=''>Select a version</option>
            <option value='pharita'>Pharita</option>
            <option value='ahyeon'>Ahyeon</option>
            <option value='rami'>Rami</option>
            <option value='rora'>Rora</option>
            <option value='asa'>Asa</option>
            <option value='ruka'>Ruka</option>
            <option value='chiquita'>Chiquita</option>
          </>
        );
      default:
        return <option value=''>No versions available</option>;
    }
  };

  if (!product) {
    return (
      <>
        <h1 className="flex w-full h-full text-center items-center justify-center text-4xl text-pink-600">PRODUCT NOT FOUND.</h1>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className='flex px-24 py-4 gap-[48px] items-center'>
        <Link to='/'>
          <FontAwesomeIcon icon={faArrowLeftLong} className="mb-0 text-[40px]" />
        </Link>
        <h4 className='text-[32px] font-medium'>{product.name ?? 'No Label'}</h4>
      </div>
      <div className='flex gap-[30px] px-24'>
        <div className=''>
          <img src={product.imageUrl ?? (product.name ?? 'No Name')} alt={product.name ?? 'No Name'} className='block w-full h-full max-w-[700px] max-h-[500px] object-cover' />
        </div>
        <div className='flex flex-col gap-[20px]'>
          <span className='text-[40px] font-medium'>{formatToIDRCurrency(product.price) ?? `Not For Sale`}</span>
          <div className='mb-4'>
            <label htmlFor='version' className='block text-gray-700'>Select Version</label>
            <select id='version' className='w-full px-4 py-2 border rounded mt-2' value={selectedVersion} onChange={handleVersionChange}>
              {renderVersionOptions()}
            </select>
          </div>
          {product.stock > 0 ? (
            product.stock <= 25 ? (
              <>
                <Button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 p-4 bg-gray-500 text-center hover:bg-gray-700 text-black active:bg-gray-900"
                >
                  <FontAwesomeIcon icon={faCartShopping} className="mb-0" />
                  <span>Add to cart</span>
                </Button>
                <span className='font-medium text-yellow-300 mt-2'>Available, almost out of stock</span>
              </>
            ) : (
              <>
                <Button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 p-4 bg-gray-300 text-center hover:bg-gray-400 text-black active:bg-gray-200"
                >
                  <FontAwesomeIcon icon={faCartShopping} className="mb-0" />
                  <span>Add to cart</span>
                </Button>
                <span className='font-medium text-green-500 mt-2'>Available</span>
              </>
            )
          ) : (
            <div>
              <Button
                type="button"
                className="inline-flex items-center justify-center gap-2 p-4 bg-gray-300 text-center"
              >
                <FontAwesomeIcon icon={faCartShopping} className="mb-0 text-black" />
                <span className="text-black">Add to cart</span>
              </Button>
            </div>
          )}

          <span className='font-medium'>Description</span>
          <p className='max-w-[500px]'>{product.description ?? 'No description.'}</p>
        </div>
      </div>
    </>
  );
}
