"use client"
import React, { useState, useEffect } from 'react';
import { postData, getData } from '@/utils/apiCalls';
import Notification from './Notification';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const InventoryForm = () => {
    const [itemName, setItemName] = useState('');
    const [requestQuantity, setRequestQuantity] = useState(0);
    const [inventoryDescription, setInventoryDescription] = useState('');
    const [inventoryCategoryId, setInventoryCategoryId] = useState('');
    const [inventoryName, setInventoryName] = useState('');
    const [inventoryUser, setInventoryUser] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [inventoryCat, setInventoryCat] = useState([]);
    const [purchaseDate, setPurchaseDate] = useState('');
    const [notification, setNotification] = useState(null);
    const [costPrice, setCostPrice] = useState('');
    const [images, setImages] = useState([]);
    const [unit, setUnit] = useState('');
    const [minLevel, setMinLevel] = useState('');
    const [maxLevel, setMaxLevel] = useState('');
    const [dimensions, setDimensions] = useState({ length: '', width: '', height: '' });
    const [weight, setWeight] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [brand, setBrand] = useState('');
    const [location, setLocation] = useState('');
    const [quantityInStock, setQuantityInStock] = useState('');
    const [reorderLevel, setReorderLevel] = useState('');

    const router = useRouter();

    useEffect(() => {
        const fetchInventoryCat = async () => {
            try {
                const invCat = await getData('inventory_category', false);
                setInventoryCat(invCat);
            } catch (error) {
                console.error('Error fetching Inventory Category data:', error);
            }
        };

        fetchInventoryCat();
    }, []);

    const handleItemNameChange = (selectedItemName) => {
        setItemName(selectedItemName);
        const selectedInventoryCat = inventoryCat.find(item => item.inventory_category_name === selectedItemName);
        if (selectedInventoryCat) {
            setInventoryCategoryId(selectedInventoryCat.id);
        } else {
            setInventoryCategoryId('');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setSubmitting(true);
            const formData = {
                inventory_name: inventoryName,
                purchase_date: purchaseDate,
                quantity: parseInt(requestQuantity),
                inventory_cat_id: inventoryCategoryId,
                description: inventoryDescription,
                unit,
                min_level: minLevel,
                max_level: maxLevel,
                dimensions,
                weight,
                manufacturer,
                brand,
                location,
                quantity_in_stock: quantityInStock,
                reorder_level: reorderLevel,
            };

            await postData('inventory', false, formData);
            setNotification({ type: 'success', message: 'Inventory Created successfully' });
            router.push('/inventory');
        } catch (error) {
            console.error('Error submitting request:', error);
            setNotification({ type: 'error', message: 'Failed to create Inventory' });
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
                    <h1 className='font-bold text-2xl mb-6'>New Inventory</h1>
                    <div className='text-[#8898AA] py-2 mb-6'>
                        <h1 className='text-xl'>BASIC DETAILS</h1>
                        <hr />
                    </div>

                    <div className='w-full lg:w-4/5'>

                        <div className='flex flex-col md:flex-row gap-6 md:gap-10'>
                            <div className='flex flex-col w-full md:w-1/2 lg:w-4/5'>
                                <label htmlFor="ItemName" className='py-2'>Inventory Category</label>
                                <select
                                    id="ItemName"
                                    name="ItemName"
                                    value={itemName}
                                    onChange={(e) => handleItemNameChange(e.target.value)}
                                    className='w-full p-2 border border-gray-300 rounded-sm text-base'
                                    required
                                >
                                    <option disabled value="">Select</option>
                                    {inventoryCat.map((item) => (
                                        <option key={item.inventory_category_name} value={item.inventory_category_name}>{item.inventory_category_name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className='flex flex-col w-full md:w-1/2 lg:w-4/5'>
                                <label htmlFor="InventoryName" className='py-2'>Inventory Name</label>
                                <input type="text" name="InventoryName"
                                    placeholder='e.g Hard Hat'
                                    id="InventoryName"
                                    required
                                    value={inventoryName}
                                    onChange={(e) => setInventoryName(e.target.value)}
                                    className='w-full p-2 border border-gray-300 rounded-sm text-base' />
                            </div>
                        </div>

                        <div className='flex flex-col md:flex-row gap-6 md:gap-10'>
                            <div className='flex flex-col w-full md:w-1/2 lg:w-4/5'>
                                <label htmlFor="Unit" className='py-2'>Unit</label>
                                <select
                                    id="Unit"
                                    name="Unit"
                                    value={unit}
                                    onChange={(e) => setUnit(e.target.value)}
                                    className='w-full p-2 border border-gray-300 rounded-sm text-base'
                                    required
                                >
                                    <option disabled value="">Select</option>
                                    <option value="pieces">Pieces (pcs)</option>
                                    <option value="kilograms">Kilograms (kg)</option>
                                    <option value="grams">Grams (g)</option>
                                    <option value="liters">Liters (L)</option>
                                    <option value="milliliters">Milliliters (mL)</option>
                                    <option value="meters">Meters (m)</option>
                                    <option value="centimeters">Centimeters (cm)</option>
                                    <option value="boxes">Boxes</option>
                                    <option value="sets">Sets</option>
                                    <option value="pairs">Pairs</option>
                                    <option value="dozens">Dozens</option>
                                    <option value="cartons">Cartons</option>
                                    <option value="rolls">Rolls</option>
                                    <option value="sheets">Sheets</option>
                                    <option value="bottles">Bottles</option>
                                    <option value="cans">Cans</option>
                                    <option value="bags">Bags</option>
                                    <option value="packs">Packs</option>
                                    <option value="units">Units</option>
                                </select>
                            </div>

                            <div className='flex flex-col md:flex-row gap-6 md:gap-10'>
                                <div className='flex flex-col w-full md:w-1/2 lg:w-4/5'>
                                    <label htmlFor="MinLevel" className='py-2'>Min Level</label>
                                    <input type="text" name="MinLevel"
                                        placeholder='e.g. 2'
                                        id="MinLevel"
                                        value={minLevel}
                                        onChange={(e) => setMinLevel(e.target.value)}
                                        className='w-full p-2 border border-gray-300 rounded-sm text-base' />
                                </div>

                                <div className='flex flex-col w-full md:w-1/2 lg:w-4/5'>
                                    <label htmlFor="MaxLevel" className='py-2'>Max Level</label>
                                    <input type="text" name="MaxLevel"
                                        placeholder='e.g. 2'
                                        id="MaxLevel"
                                        value={maxLevel}
                                        onChange={(e) => setMaxLevel(e.target.value)}
                                        className='w-full p-2 border border-gray-300 rounded-sm text-base' />
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col md:flex-row gap-6 md:gap-10'>
                            <div className='flex flex-col w-full md:w-1/2 lg:w-4/5'>
                                <label htmlFor="Dimensions" className='py-2'>Dimensions (Length, Width, Height) - Optional</label>
                                <div className='flex'>
                                    <input type="text" name="Length"
                                        placeholder='Length'
                                        id="Length"
                                        value={dimensions.length}
                                        onChange={(e) => setDimensions({ ...dimensions, length: e.target.value })}
                                        className='w-full p-2 border border-gray-300 rounded-sm text-base' />
                                    <input type="text" name="Width"
                                        placeholder='Width'
                                        id="Width"
                                        value={dimensions.width}
                                        onChange={(e) => setDimensions({ ...dimensions, width: e.target.value })}
                                        className='w-full p-2 border border-gray-300 rounded-sm text-base' />
                                    <input type="text" name="Height"
                                        placeholder='Height'
                                        id="Height"
                                        value={dimensions.height}
                                        onChange={(e) => setDimensions({ ...dimensions, height: e.target.value })}
                                        className='w-full p-2 border border-gray-300 rounded-sm text-base' />
                                    <select className="border border-gray-300 rounded-sm p-2">
                                        <option value="cm">cm</option>
                                        <option value="in">in</option>
                                    </select>
                                </div>
                            </div>

                            <div className='flex flex-col w-full md:w-1/2 lg:w-4/5'>
                                <label htmlFor="Weight" className='py-2'>Weight - Optional</label>
                                <div className='flex'>
                                    <input type="text" name="Weight"
                                        placeholder='Weight'
                                        id="Weight"
                                        value={weight}
                                        onChange={(e) => setWeight(e.target.value)}
                                        className='w-full p-2 border border-gray-300 rounded-sm text-base' />
                                    <select className="border border-gray-300 rounded-sm p-2">
                                        <option value="kg">kg</option>
                                        <option value="lb">lb</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col md:flex-row gap-6 md:gap-10'>
                            <div className='flex flex-col w-full md:w-1/2 lg:w-4/5'>
                                <label htmlFor="Manufacturer" className='py-2'>Manufacturer</label>
                                <input type="text" name="Manufacturer"
                                    placeholder='Manufacturer'
                                    id="Manufacturer"
                                    value={manufacturer}
                                    onChange={(e) => setManufacturer(e.target.value)}
                                    className='w-full p-2 border border-gray-300 rounded-sm text-base' />
                            </div>

                            <div className='flex flex-col w-full md:w-1/2 lg:w-4/5'>
                                <label htmlFor="Brand" className='py-2'>Brand</label>
                                <input type="text" name="Brand"
                                    placeholder='Brand'
                                    id="Brand"
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                    className='w-full p-2 border border-gray-300 rounded-sm text-base' />
                            </div>
                        </div>

                        <div className='flex flex-col md:flex-row gap-6 md:gap-10'>
                            <div className='flex flex-col w-full md:w-1/2 lg:w-4/5'>
                                <label htmlFor="Location" className='py-2'>Location</label>
                                <input type="text" name="Location"
                                    placeholder='Location'
                                    id="Location"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className='w-full p-2 border border-gray-300 rounded-sm text-base' />
                            </div>

                            <div className='flex flex-col w-full md:w-1/2 lg:w-4/5'>
                                <label htmlFor="QuantityInStock" className='py-2'>Quantity In Stock</label>
                                <input type="text" name="QuantityInStock"
                                    placeholder='Quantity In Stock'
                                    id="QuantityInStock"
                                    value={quantityInStock}
                                    onChange={(e) => setQuantityInStock(e.target.value)}
                                    className='w-full p-2 border border-gray-300 rounded-sm text-base' />
                            </div>
                        </div>

                        <div className='flex flex-col md:flex-row gap-6 md:gap-10'>
                            <div className='flex flex-col w-full md:w-1/2 lg:w-4/5'>
                                <label htmlFor="ReorderLevel" className='py-2'>Reorder Level</label>
                                <input type="text" name="ReorderLevel"
                                    placeholder='Reorder Level'
                                    id="ReorderLevel"
                                    value={reorderLevel}
                                    onChange={(e) => setReorderLevel(e.target.value)}
                                    className='w-full p-2 border border-gray-300 rounded-sm text-base' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <h1 className='text-xl text-[#8898AA] py-2 mb-6'>PRICING</h1>
                    <hr />
                    <div className='flex flex-col md:flex-row gap-6 md:gap-10 mt-6'>
                        <div className='flex flex-col w-full md:w-1/2 lg:w-4/5'>
                            <label htmlFor="CostPrice" className='py-2'>Cost Price</label>
                            <input type="text" name="CostPrice"
                                placeholder='e.g 2'
                                id="CostPrice"
                                required
                                value={costPrice}
                                onChange={(e) => setCostPrice(e.target.value)}
                                className='w-full p-2 border border-gray-300 rounded-sm text-base' />
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <h1 className='text-xl text-[#8898AA] py-2 mb-6'>PURCHASE DETAILS</h1>
                    <hr />
                    <div className='flex flex-col md:flex-row gap-6 md:gap-10 mt-6'>
                        <div className='flex flex-col w-full md:w-1/2 lg:w-4/5'>
                            <label htmlFor="PurchaseDate" className='py-2'>Purchase Date</label>
                            <input type="date" name="PurchaseDate"
                                placeholder='Purchase Date'
                                id="PurchaseDate"
                                required
                                value={purchaseDate}
                                onChange={(e) => setPurchaseDate(e.target.value)}
                                className='w-full p-2 border border-gray-300 rounded-sm text-base' />
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <h1 className='text-xl text-[#8898AA] py-2 mb-6'>UPLOAD IMAGES</h1>
                    <hr />
                    <div className='mt-6'>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageUpload}
                            className='w-full p-2 border border-gray-300 rounded-sm text-base'
                        />
                        {images.length > 0 && (
                            <div className='mt-2'>
                                {images.map((image, index) => (
                                    <div key={index}>{image.name}</div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-6">
                    <h1 className='text-xl text-[#8898AA] py-2 mb-6'>ADDITIONAL DETAILS</h1>
                    <hr />
                    <div className='flex flex-col w-full lg:w-4/5'>
                        <label htmlFor="InventoryDescription" className='py-2'>Description</label>
                        <textarea name="InventoryDescription"
                            id="InventoryDescription"
                            placeholder='Description'
                            required
                            value={inventoryDescription}
                            onChange={(e) => setInventoryDescription(e.target.value)}
                            className='w-full p-2 border border-gray-300 rounded-sm text-base'></textarea>
                    </div>
                </div>

                <div className='flex flex-col md:flex-row gap-4 mt-6'>
                            <Link
                                type="button"
                                className="text-black bg-secondary flex shadow-md shadow-slate-300 items-center py-2 px-3 rounded justify-center"
                                href="/inventory"
                            >
                                Back
                            </Link>

                            <button
                                className="text-white bg-primary flex items-center py-2 px-3 rounded justify-center"
                                type="submit"
                                disabled={submitting}
                            >
                                {submitting ? 'Adding Inventory' : 'Add Inventory'}
                            </button>
                        </div>
            </form>
        </div>
    );
}

export default InventoryForm;
