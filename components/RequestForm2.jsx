import React, { useState, useEffect } from 'react';
import Card from './Card';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';
import { postData, getData } from '@/utils/apiCalls'; 
import Notification from './Notification';


const RequestForm = ({ onClose }) => {
    const [itemName, setItemName] = useState('');
    const [quantityInStock, setQuantityInStock] = useState('');
    const [requestQuantity, setRequestQuantity] = useState();
    const [requestDescription, setRequestDescription] = useState('');
    const [assetId, setAssetId] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [inventoryData, setInventoryData] = useState([]);
    const [notification, setNotification] = useState(null);
    const [costPrice, setCostPrice] = useState('');

    const handleClose = () => {
        onClose();
    };

    useEffect(() => {
        const fetchInventoryData = async () => {
            try {
                const inventory = await getData('inventories', false); 
                setInventoryData(inventory);
                console.log(inventory)
            } catch (error) {
                console.error('Error fetching inventory data:', error);
            }
        };

        fetchInventoryData();
    }, []);

    const handleItemNameChange = (selectedItemName) => {
        
        setItemName(selectedItemName);
        const selectedInventoryItem = inventoryData.filter(item => item.inventory_name === selectedItemName);

        if (selectedInventoryItem) {
            setQuantityInStock(selectedInventoryItem[0].quantity.toString());
            setAssetId(selectedInventoryItem[0].asset_owner.id);
        } else {
            setQuantityInStock('');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setSubmitting(true);
            const formData = {
                user_id : 1,
                asset_id : assetId,
                quantity: parseInt(requestQuantity),
                description: requestDescription
            };
            await postData('requisitions', false, formData);
            setNotification({type: 'success', message: 'Request submitted successfully'})
        } catch (error) {
            console.error('Error submitting request:', error);
            setNotification({type: 'error', message: 'Failed to submit request'})

        } finally {
           setTimeout(() => {
            onClose();
            setSubmitting(false);
           }, 1000); 
        }
    };

    return (
        <div style={{ height: '100%', width: 'calc(100% + 20px)', overflow: 'hidden' }}>
            <div style={{ height: '100%', overflowY: 'scroll', marginRight: '-20px' }}>
        <Card className="bg-gray-400">
        <div className='flex justify-between'>
            <h1 className='font-semibold text-3xl'>Create a New Request</h1>
            <button onClick={handleClose}><Icon path={mdiClose} size={1}/></button>
        </div>
    
        {notification && 
            <Notification
                message={notification.message}
                type={notification.type}
                onClose={() => setNotification(null)}
            />
        }
    
        <form onSubmit={handleSubmit}>
            <div>
                <div className='text-[#8898AA] py-6'>
                    <h1 className='text-lg'>BASIC DETAILS</h1>
                    <hr />
                </div>
    
                <div>
                    <div className='py-3'><label htmlFor="ItemName">Item Name</label></div>
                    <select
                        id="ItemName"
                        name="itemName"
                        value={itemName}
                        onChange={(e) => handleItemNameChange(e.target.value)}
                        className='w-full sm:w-3/4 p-2 bg-white rounded-sm text-base' 
                        required
                    >
                        <option disabled value="">Select</option>
                        {inventoryData.map((item) => (
                            <option key={item.inventory_name} value={item.inventory_name}>{item.inventory_name}</option>
                        ))}
                    </select>
                </div>
    
                {/* <div className='py-5'>
                    <div className='py-3'><label htmlFor="">Quantity in Stock</label></div>
                    <input
                        type="number"
                        placeholder='e.g 40'
                        value={quantityInStock}
                        disabled
                        onChange={(e) => setQuantityInStock(e.target.value)}
                        className='w-full sm:w-3/4 p-2 bg-white rounded-sm text-base'
                        required
                    />
                </div> */}
    
                <div>
                    <div className='py-3'><label htmlFor="RequestQuantity">Request Quantity</label></div>
                    <input
                        type="number"
                        placeholder='e.g 40'
                        value={requestQuantity}
                        onChange={(e) => setRequestQuantity(e.target.value)}
                        className='w-full sm:w-3/4 p-2 bg-white rounded-sm text-base'
                        required
                    />
                </div>

                <div>
                <div className='py-3'><label htmlFor="ItemName">Cost Price</label></div>
                <div className="flex w-full sm:w-3/4">
          <select
            className="border border-gray-300 rounded-l-md p-2 bg-white"
          >
            <option value="GHC">GHC</option>
            <option value="USD">USD</option>
          </select>
          <input
            type="text"
            value={costPrice}
            onChange={(e) => setCostPrice(e.target.value)}
            className="flex-grow p-2 bg-white rounded-r-md text-base border border-gray-300"
          />
        </div>
                </div>
    
                <div className='py-5'>
                    <div className='py-3'><label htmlFor="">Request Description</label></div>
                    <textarea
                        cols="30"
                        rows="5" 
                        value={requestDescription}
                        onChange={(e) => setRequestDescription(e.target.value)}
                        className='w-full sm:w-3/4 p-2 bg-white rounded-sm text-base'
                    ></textarea>
                </div>
    
                <div className='flex space-x-5'>
                    <button
                        onClick={handleClose}
                        className="text-black bg-secondary flex shadow-md shadow-slate-300 items-center py-2 px-3 rounded"
                        type="button"
                    >
                        Cancel Request
                    </button>
    
                    <button
                        className="text-white bg-primary  flex items-center py-2 px-3 rounded"
                        type="submit"
                        disabled={submitting}
                    >
                        {submitting ? 'Sending Request' : 'Create Request'}
                    </button>
                </div>
            </div>
        </form>
    </Card>
    </div>
    </div>
    
    );
};

export default RequestForm;
