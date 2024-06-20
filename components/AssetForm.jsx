'use client'
import React, { useState, useEffect } from 'react';
import { postData, getData } from '@/utils/apiCalls';
import Notification from './Notification';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const AssetForm = () => {
    const [assetCategory, setAssetCategory] = useState('');
    const [assetName, setAssetName] = useState('');
    const [assetUser, setAssetUser] = useState('');
    const [assetID, setAssetID] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [brand, setBrand] = useState('');
    const [assetDescription, setAssetDescription] = useState('');
    const [supplier, setSupplier] = useState('');
    const [costPrice, setCostPrice] = useState('');
    const [purchaseDate, setPurchaseDate] = useState('');
    const [images, setImages] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [assetCategories, setAssetCategories] = useState([]);
    const [notification, setNotification] = useState(null);

    const router = useRouter();

    useEffect(() => {
        const fetchAssetCategories = async () => {
            try {
                const data = await getData('asset_category', false);
                setAssetCategories(data);
            } catch (error) {
                console.error('Error fetching Asset Category data:', error);
            }
        };

        fetchAssetCategories();
    }, []);

    const handleCategoryChange = (selectedCategory) => {
        setAssetCategory(selectedCategory);
        const selectedAssetCat = assetCategories.find(item => item.asset_category_name === selectedCategory);
        if (selectedAssetCat) {
            setSupplier(selectedAssetCat.id);
        } else {
            setSupplier('');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setSubmitting(true);
            const formData = {
                asset_name: assetName,
                purchase_date: purchaseDate,
                quantity: 1, 
                asset_cat_id: supplier,
                description: assetDescription,
                asset_user: assetUser,
                asset_id: assetID,
                manufacturer: manufacturer,
                brand: brand,
                cost_price: costPrice
            };

            await postData('assets', false, formData);
            setNotification({ type: 'success', message: 'Asset Created successfully' });
            router.push('/assets');
        } catch (error) {
            console.error('Error submitting request:', error);
            setNotification({ type: 'error', message: 'Failed to create Asset' });
        } finally {
            setTimeout(() => {
                setSubmitting(false);
            }, 1000);
        }
    };

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        setImages(files.slice(0, 4));
    };

    return (
        <div className="p-4">
            {notification &&
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                />
            }

            <form onSubmit={handleSubmit}>
                <div>
                    <h1 className='font-bold text-2xl mb-6'>New Asset</h1>
                    <div className='text-[#8898AA] py-2 mb-6'>
                        <h1 className='text-xl'>BASIC DETAILS</h1>
                        <hr />
                    </div>

                    <div className='w-full lg:w-4/5'>

                        <div className='flex flex-col md:flex-row gap-6 md:gap-10'>
                            <div className='flex flex-col w-full md:w-1/2 lg:w-4/5'>
                                <label htmlFor="assetCategory" className='py-2'>Asset Category</label>
                                <select
                                    id="assetCategory"
                                    name="assetCategory"
                                    value={assetCategory}
                                    onChange={(e) => handleCategoryChange(e.target.value)}
                                    className='w-full p-2 border border-gray-300 rounded-sm text-base'
                                    required
                                >
                                    <option disabled value="">Select</option>
                                    {assetCategories.map((item) => (
                                        <option key={item.asset_category_name} value={item.asset_category_name}>{item.asset_category_name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className='flex flex-col w-full md:w-1/2 lg:w-4/5'>
                                <label htmlFor="assetName" className='py-2'>Asset Name</label>
                                <input type="text" name="assetName"
                                    placeholder='e.g Hard Hat'
                                    id="assetName"
                                    required
                                    value={assetName}
                                    onChange={(e) => setAssetName(e.target.value)}
                                    className='w-full p-2 border border-gray-300 rounded-sm text-base' />
                            </div>
                        </div>

                        <div className='flex flex-col md:flex-row gap-6 md:gap-10'>
                            <div className='flex flex-col w-full md:w-1/2 lg:w-4/5'>
                                <label htmlFor="assetUser" className='py-2'>Asset User</label>
                                <input type="text" name="assetUser"
                                    placeholder='e.g John Doe or N/A if not applicable'
                                    id="assetUser"
                                    value={assetUser}
                                    onChange={(e) => setAssetUser(e.target.value)}
                                    className='w-full p-2 border border-gray-300 rounded-sm text-base' />
                            </div>

                            <div className='flex flex-col w-full md:w-1/2 lg:w-4/5'>
                                <label htmlFor="assetID" className='py-2'>Asset ID</label>
                                <input type="text" name="assetID"
                                    placeholder='e.g A12345 or N/A if not applicable'
                                    id="assetID"
                                    required
                                    value={assetID}
                                    onChange={(e) => setAssetID(e.target.value)}
                                    className='w-full p-2 border border-gray-300 rounded-sm text-base' />
                            </div>
                        </div>

                        <div className='flex flex-col md:flex-row gap-6 md:gap-10'>
                            <div className='flex flex-col w-full md:w-1/2 lg:w-4/5'>
                                <label htmlFor="manufacturer" className='py-2'>Manufacturer</label>
                                <input type="text" name="manufacturer"
                                    placeholder='Enter Manufacturer Here'
                                    id="manufacturer"
                                    value={manufacturer}
                                    onChange={(e) => setManufacturer(e.target.value)}
                                    className='w-full p-2 border border-gray-300 rounded-sm text-base' />
                            </div>

                            <div className='flex flex-col w-full md:w-1/2 lg:w-4/5'>
                                <label htmlFor="brand" className='py-2'>Brand</label>
                                <input type="text" name="brand"
                                    placeholder='Enter Brand Here'
                                    id="brand"
                                    required
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                    className='w-full p-2 border border-gray-300 rounded-sm text-base' />
                            </div>
                        </div>

                        <div className='flex flex-col w-full lg:w-4/5'>
                            <label htmlFor="assetDescription" className='py-2'>Asset Description</label>
                            <textarea
                                placeholder='Max. 250 characters'
                                id="assetDescription"
                                cols="30"
                                rows="5"
                                value={assetDescription}
                                onChange={(e) => setAssetDescription(e.target.value)}
                                className='w-full lg:w-3/5 p-2 border border-gray-300 rounded-sm text-base'
                            ></textarea>
                        </div>

                        <div className='text-[#8898AA] py-2'>
                            <h1 className='text-xl'>PURCHASE INFORMATION</h1>
                            <hr />
                        </div>

                        <div className='flex flex-col md:flex-row gap-6 md:gap-10'>
                            <div className='flex flex-col w-full md:w-1/2 lg:w-4/5'>
                                <label htmlFor="supplier" className='py-2'>Supplier</label>
                                <select
                                    id="supplier"
                                    name="supplier"
                                    value={supplier}
                                    onChange={(e) => setSupplier(e.target.value)}
                                    className='w-full p-2 border border-gray-300 rounded-sm text-base'
                                    required
                                >
                                    <option disabled value="">Select</option>
                                    {assetCategories.map((item) => (
                                        <option key={item.asset_category_name} value={item.asset_category_name}>{item.asset_category_name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className='flex flex-col w-full md:w-1/2 lg:w-4/5'>
                                <label htmlFor="costPrice" className='py-2'>Cost Price</label>
                                <div className="flex w-full">
                                    <select className="border border-gray-300 rounded-l-md p-2">
                                        <option value="GHC">GHC</option>
                                        <option value="USD">USD</option>
                                    </select>
                                    <input
                                        type="text"
                                        value={costPrice}
                                        onChange={(e) => setCostPrice(e.target.value)}
                                        className="border border-gray-300 rounded-r-md p-2 flex-1"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col w-full lg:w-4/5'>
                            <label htmlFor="purchaseDate" className='py-2'>Purchase Date</label>
                            <input type="date" name="purchaseDate"
                                id="purchaseDate"
                                value={purchaseDate}
                                required
                                onChange={(e) => setPurchaseDate(e.target.value)}
                                className='w-full lg:w-3/5 p-2 border border-gray-300 rounded-sm text-base' />
                        </div>

                        <div className='text-[#8898AA] py-2'>
                            <h1 className='text-xl'>ASSET IMAGES (MAX.4)</h1>
                            <hr />
                            <div className='flex flex-col w-full lg:w-4/5'>
                                <div className="border border-dashed border-gray-300 rounded-md p-4">
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="w-full"
                                    />
                                    {images.length > 0 && (
                                        <div className="mt-4 grid grid-cols-2 gap-4">
                                            {images.map((image, index) => (
                                                <div key={index} className="border border-gray-300 p-2 rounded-md">
                                                    <img
                                                        src={URL.createObjectURL(image)}
                                                        alt={`Asset ${index + 1}`}
                                                        className="w-full p-2 bg-gray-200 rounded-sm text-base"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col md:flex-row gap-4 mt-6'>
                            <Link
                                type="button"
                                className="text-black bg-secondary flex shadow-md shadow-slate-300 items-center py-2 px-3 rounded justify-center"
                                href="/assets"
                            >
                                Back
                            </Link>

                            <button
                                className="text-white bg-primary flex items-center py-2 px-3 rounded justify-center"
                                type="submit"
                                disabled={submitting}
                            >
                                {submitting ? 'Adding Asset' : 'Add Asset'}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AssetForm;
