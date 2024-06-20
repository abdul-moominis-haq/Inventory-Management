'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { MdMenu, MdOutlineMenuOpen } from 'react-icons/md';
import { MdDashboard,  MdInventory2,  MdOutlineSettings, MdPerson } from 'react-icons/md';
import { TiCloudStorage } from "react-icons/ti";
import styles from '../styles/Sidebar.module.css'; 
import { usePathname } from 'next/navigation';
import Icon from '@mdi/react';
import { mdiAlphaSBoxOutline, mdiBagPersonalTag, mdiFileEdit, mdiInvoiceList,mdiTextBoxOutline } from '@mdi/js';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const pathname = usePathname();

  const isActive = (path) => {
    return pathname === path;
  };

  const MenuIcon = collapsed ? <MdMenu className={`${styles.iconOnly}`} /> : <MdOutlineMenuOpen size={24}/>;
  
  const menuItems = [
    {
      title: "Dashboard",
      path: "/",
      icon: <MdDashboard />,
    },
    {
      title: "Assets",
      path: "/assets",
      icon: <Icon path={mdiBagPersonalTag} size={0.7}/>,
    },
    {
      title: "Inventory",
      path: "/inventory",
      icon: <MdInventory2 />,
    },
    {
      title: "Purchasing",
      path: "/purchasing",
      icon: <Icon path={mdiTextBoxOutline} size={0.7} />,
    },
    {
      title: "Requisition",
      path: "/requisition",
      icon: <Icon path={mdiFileEdit} size={0.7} />,
    },
    {
        title: "Invoicing",
        path: "/invoicing",
        icon: <Icon path={mdiInvoiceList} size={0.7} />,
      }
  ];

  const settingsItems = [
    {
      title: "System Settings",
      path: "/settings",
      icon: <MdOutlineSettings />,
    },
    {
      title: "Manage Accounts",
      path: "/accounts",
      icon: <MdPerson />,
    },
    {
      title: "Backup Information",
      path: "/backup",
      icon: <TiCloudStorage />,
    }
  ]

  return (
    <div className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
      
      <div className='flex align-center justify-around text-textc font-bold'>
        {!collapsed && <span>LogoIpsum</span>}
        <button onClick={toggleSidebar}>
          {MenuIcon}
        </button>
      </div>

    
      <ul className={styles.menuList}>
        {menuItems.map((item, index) => (
          <Link href={item.path} key={item.title}>
          <li key={index} className={`${styles.menuItem} ${collapsed ? styles.collapsedItem : ''} ${isActive(item.path) ? styles.activeItem : ''}`}>
            
              <div className={`${styles.menuLink}`}>                
                {collapsed ? (
                  <div className={styles.iconOnly}>{item.icon}</div>
                ) : (
                  <>
                    <div className='pr-3'>
                        {item.icon}
                    </div>
                    {item.title}
                  </>
                )}
              </div>
            
          </li>
        </Link>
        ))}
      </ul>
    
    <hr />
    <br />
    
        <div className='flex align-center justify-around text-lg text-textc'>
            {collapsed ? <Icon path={mdiAlphaSBoxOutline} size={0.8}/> : <span className='text-textc text-left'> Settings</span>} 
        </div>

        <ul className={styles.menuList}>
        {settingsItems.map((item, index) => (
          <li key={index} className={`${styles.menuItem} ${collapsed ? styles.collapsedItem : ''}`}>
            <Link href={item.path}>
              <div className={styles.menuLink}>
                {collapsed ? (
                  <div className={styles.iconOnly}>{item.icon}</div>
                ) : (
                  <>
                    <div className='pr-3'>
                        {item.icon}
                    </div>
                    {item.title}
                  </>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>

    </div>
  );
};

export default Sidebar;
