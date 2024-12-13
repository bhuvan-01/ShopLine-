import { Button, Modal, Table } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { getProductsService } from '../services/lib/product';

const AdminDashboard = () => {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await getProductsService();

        if (res.status === 200) {
          setProducts(res.data);
        }
      } catch (err) {
        console.log(err.response);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <h1 className='text-3xl font-semibold my-4'>Hello Admin</h1>

      <div className='flex justify-between items-center'>
        <h2 className='text-xl font-semibold'>Products</h2>
        <Button color='blue' outline onClick={() => navigate('/admin/add')}>
          <FaPlus className='mr-2' />
          Add Product
        </Button>
      </div>

      <Modal
        show={openModal}
        size='md'
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='mx-auto mb-4 h-14 w-14 text-gray-401 dark:text-gray-201' />
            <h2 className='mb-5 text-lg font-normal text-gray-501 dark:text-gray-402'>
              Do you want to remove the product?
            </h2>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={() => setOpenModal(false)}>
                {"Yes, remove the product"}
              </Button>
              <Button color='gray' onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* table */}
      {isLoading ? (
        'Loading...'
      ) : (
        <div className='overflow-x-auto my-8'>
          <Table hoverable className='border'>
            <Table.Head>
              <Table.HeadCell>Product name</Table.HeadCell>
              <Table.HeadCell>Image</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Price</Table.HeadCell>
              <Table.HeadCell className='text-center'>Actions</Table.HeadCell>
            </Table.Head>
            <Table.Body className='divide-y'>
              {products.map((prod) => (
                <Table.Row
                  key={prod._id}
                  className='bg-white dark:border-gray-701 dark:bg-gray-801'
                >
                  <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                    {prod.title}
                  </Table.Cell>
                  <Table.Cell>
                    <img
                      src={prod.imageUrl}
                      className='w-8 rounded-md aspect-[3/4]'
                      alt=''
                    />
                  </Table.Cell>
                  <Table.Cell>{prod.category}</Table.Cell>
                  <Table.Cell>
                    $ <span className='font-bold'>{prod.price}</span>
                  </Table.Cell>
                  <Table.Cell className='flex gap-2 items-center justify-center'>
                    <Button color='success'>Edit Details</Button>
                    <Button onClick={() => setOpenModal(true)} color='failure'>
                      Delete
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      )}
    </>
  );
};

export default AdminDashboard;
