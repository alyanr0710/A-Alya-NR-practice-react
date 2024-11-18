import { useState, useEffect } from 'react';
import getAllProducts from '../../services/getAllProducts';
import Card from '../../components/Card/Card';
import Navbar from '../../components/NavBar/Navbar';
import RadioButton from '../../components/RadioButton/RadioButton';

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    let allProducts = getAllProducts();
    allProducts = allProducts.length > 0 ? allProducts : [];
    setProducts(allProducts);
    setFilteredProducts(allProducts);
  }, []);

  useEffect(() => {
    filterProducts(selectedFilter, searchQuery);
  }, [selectedFilter, searchQuery, products]);

  const filterProducts = (filter, query) => {
    let filtered = products;

    if (filter !== 'all') {
      filtered = filtered.filter(product => 
        filter === 'album' ? product.category === "album" :
        filter === 'lightstick' ? product.category === "lightstick" :
        product.category === "merchandise"
      );
    }

    if (query) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    filterProducts(selectedFilter, searchQuery);
  };

  const RadioButtonOpts = [
    {
      label: 'All',
      value: 'all'
    },
    {
      label: "Album",
      value: 'album'
    },
    {
      label: "Lightstick",
      value: 'lightstick'
    },
    {
      label: "Merchandise",
      value: 'merchandise'
    },
  ];

  return (
    <>
      <Navbar />
      <div className='px-24 py-4 gap-4 mt-4 flex-wrap'>
        <h3 className='font-medium'>Filter</h3>
        <div className='flex gap-2 flex-wrap'>
          <RadioButton
            options={RadioButtonOpts}
            defaultValue={'all'}
            onChange={(value) => setSelectedFilter(value)}
          />
        </div>
      </div>
      <div className='px-24 py-4'>
        <form onSubmit={handleSearchSubmit} className='flex'>
          <input
            type="text"
            className='bg-white border border-black text-black active:text-black focus:text-black px-4 py-2 w-full'
            placeholder='Search product...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className='bg-grey-200 text-black px-4 py-2 hover:bg-gray-200 active:bg-gray-400'>Search</button>
        </form>
      </div>
      <section className='container px-24 py-4'>
        <main className='grid grid-cols-4 gap-4'>
          {filteredProducts.map((product) => (
            <Card key={product.slug} product={product} />
          ))}
        </main>
      </section>
    </>
  );
}
