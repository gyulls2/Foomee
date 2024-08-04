'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  AiIcon,
  ChartIcon,
  HomeIcon,
  MealIcon,
  MyIcon,
} from '../icons/IconComponents';

// { current }: { current: string }
const BottomNav = () => {
  const pathname = usePathname();

  const menuItems = [
    { href: '/home', icon: HomeIcon, label: '홈' },
    { href: '/chart', icon: ChartIcon, label: '통계' },
    { href: '/search', icon: MealIcon, label: '음식 검색' },
    { href: '/analysis', icon: AiIcon, label: 'AI 분석' },
    { href: '/profile', icon: MyIcon, label: '마이' },
  ];

  return (
    <nav className="bg-white relative w-full">
      <ul className="flex justify-around py-3 px-1">
        {menuItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <li key={index}>
              <Link
                href={item.href}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-1">
                  <IconComponent
                    width="30"
                    height="30"
                    fill={`${item.href === pathname ? '#FF7A00' : ''}`}
                  />
                </div>
                <span
                  className={`text-xs ${item.href === pathname ? 'text-[#FF7A00]' : 'text-[#767676]'}`}
                >
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default BottomNav;
