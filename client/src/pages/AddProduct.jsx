import {
  Button,
  FileInput,
  Label,
  Select,
  TextInput,
  Textarea,
} from 'flowbite-react';
import { useState } from 'react';
import { addProductService } from '../services/lib/admin';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AddProduct = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    title: '',
    description: '',
    price: '',
    category: 'men',
    brand: '',
    imageUrl: '',
  });
  const { title, description, price, category, brand } = values;

  const handleFileInputChange = (e) => {
    setValues({
      ...values,
      imageUrl: e.target.files[0],
    });
  };

  const handleInputChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('file', values.imageUrl);
      formData.append(
        'upload_preset',
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
      );

      const imgRes = await axios.post(
        'https://api.cloudinary.com/v1_1/deka7fwoz/image/upload',
        formData
      );

      const res = await addProductService({
        ...values,
        imageUrl: imgRes.data.secure_url,
      });

      console.log(res);

      if (res.status === 201) {
        navigate('/admin');
        toast.success('Product added');
      }
    } catch (err) {
      console.log('Error in Adding Product: ', err.response);
    }
  };

  return (
    <div>
      <h2 className='text-xl font-semibold mt-8'>Add Product</h2>

      <div className='mb-8'>
        <form
          onSubmit={handleFormSubmit}
          className='w-[90%] my-4 block max-w-[480px] '
        >
          {/* title */}
          <div className='my-4'>
            <Label className='my-2 block' htmlFor='title' value='Your title' />
            <TextInput
              id='title'
              name='title'
              placeholder='Enter title of product'
              type='text'
              value={title}
              onChange={handleInputChange}
              required
            />
          </div>
          {/* description */}
          <div className='my-4'>
            <Label
              className='my-2 block'
              htmlFor='description'
              value='Product description'
            />

            <Textarea
              id='description'
              name='description'
              placeholder='Enter the product description'
              value={description}
              onChange={handleInputChange}
              required
              rows={4}
            />
          </div>
          {/* price */}
          <div className='my-4'>
            <Label
              className='my-2 block'
              htmlFor='price'
              value='Product price'
            />
            <TextInput
              id='price'
              name='price'
              placeholder='Enter price'
              type='text'
              value={price}
              onChange={handleInputChange}
              required
            />
          </div>
          {/* category */}
          <div className='my-4'>
            <Label
              className='my-2 block'
              htmlFor='category'
              value='Product category'
            />

            <Select
              name='category'
              id='category'
              required
              defaultValue={category}
              onChange={handleInputChange}
            >
              <option value='M'>Men</option>
              <option value='Women'>Women</option>
              <option value='Boy'>Boy</option>
              <option value='Girl'>Girl</option>
            </Select>
          </div>

          {/* brand */}
          <div className='my-4'>
            <Label
              className='my-2 block'
              htmlFor='brand'
              value='Product brand'
            />
            <TextInput
              id='brand'
              name='brand'
              placeholder='Enter the brand'
              type='text'
              value={brand}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* image */}
          <div className='my-4'>
            <Label
              className='mb-2 block'
              htmlFor='file-upload'
              value='Product Image'
            />

            <FileInput id='file-upload' onChange={handleFileInputChange} />
          </div>
          <Button className='w-full' type='submit' color='blue'>
            Add product
          </Button>
        </form>
      </div>
    </div>
  );
};
export default AddProduct;
