import {useState, useEffect} from 'react';
import {NavLink} from '@remix-run/react';

import type {ParentEnhancedMenuItem} from '~/lib/utils';
import {ChildEnhancedMenuItem} from '~/lib/utils';

import {Link} from './Link';
type SubMenuProps = {
  items: ParentEnhancedMenuItem[];
  title: string;
  side: 'right' | null;
};

function SubMenu({items, title, side = null}: SubMenuProps) {
  const [isSubMenuOpen, setSubMenuOpen] = useState(false);
  const handleMouseEnter = () => {
    setSubMenuOpen(!isSubMenuOpen);
  };

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`relative inline-block group px-5`}>
      <Link
        to="#"
        className="font-bold footer_font"
        onMouseOver={handleMouseEnter}
      >
        {title}
      </Link>
      <div
        className={`absolute ${
          isSubMenuOpen ? '' : 'hidden'
        } mt-2 space-y-2 divide-y divide-white border rounded-md shadow-lg text-bold ${
          scrolled
            ? 'backdrop-blur-md bg-white/30'
            : 'bg-primary dark:bg-contrast'
        }`}
      >
        {items.map((subItem) => {
          return (
            <NavLink
              key={subItem.id}
              to={subItem.url}
              className="block px-4 py-2 text-sm text-contrast dark:text-white fade_in"
              style={activeLinkStyle}
            >
              {subItem.title}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

function activeLinkStyle({
  isActive,
  isPending,
}: {
  isActive: boolean;
  isPending: boolean;
}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
  };
}

/*
<div className="flex flex-row justify-between items-center w-full mb-3 mt-5">
            <FaInstagram className="" />
            <FaWhatsapp className="" />
            <FaLinkedinIn className="" />
            <FaPinterestP className="" />
            <FaTwitter className="" />
        </div>
        <div className="border-b-2 w-full"></div>
        <div className="mt-3 w-full">Account</div>
*/

export default SubMenu;
