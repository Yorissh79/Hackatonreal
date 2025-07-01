import React, { useState } from 'react';
import {
    Shield,
    Settings,
    Users,
    BarChart3,
    Moon,
    Sun,
    Bell,
    HelpCircle,
    LogOut,
    ChevronUp,
    Globe,
    Lock,
    Activity
} from 'lucide-react';
import useDarkMode from '../../hooks/useDarkmode'; // Import the dark mode hook

const AdminFooter = ({
                         onLogout = () => {},
                         systemStats = {
                             activeUsers: 1247,
                             systemLoad: 23,
                             uptime: '99.9%'
                         }
                     }) => {
    // Use the dark mode hook instead of props
    const { isDarkMode, toggleDarkMode } = useDarkMode();

    const [isExpanded, setIsExpanded] = useState(false);
    const [notifications, setNotifications] = useState(3);

    const footerLinks = [
        {
            category: 'Admin Tools',
            links: [
                { name: 'User Management', icon: Users, href: '/admin/users' },
                { name: 'System Settings', icon: Settings, href: '/admin/settings' },
                { name: 'Analytics', icon: BarChart3, href: '/admin/analytics' },
                { name: 'Security', icon: Shield, href: '/admin/security' }
            ]
        },
        {
            category: 'Support',
            links: [
                { name: 'Documentation', icon: HelpCircle, href: '/docs' },
                { name: 'System Status', icon: Activity, href: '/status' },
                { name: 'Privacy Policy', icon: Lock, href: '/privacy' },
                { name: 'Terms of Service', icon: Globe, href: '/terms' }
            ]
        }
    ];

    const quickActions = [
        { name: 'Notifications', icon: Bell, count: notifications, action: () => {} },
        { name: 'Dark Mode', icon: isDarkMode ? Sun : Moon, action: toggleDarkMode },
        { name: 'Logout', icon: LogOut, action: onLogout }
    ];

    return (
        <footer className={`
      relative border-t transition-all duration-300 ease-in-out
      ${isDarkMode
            ? 'bg-gray-900 border-gray-800'
            : 'bg-white border-gray-200'
        }
      ${isExpanded ? 'pb-4' : 'pb-0'}
    `}>
            {/* Expandable Content */}
            <div className={`
        overflow-hidden transition-all duration-300 ease-in-out
        ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
      `}>
                <div className="container mx-auto px-4 py-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                        {/* Footer Links */}
                        {footerLinks.map((section, index) => (
                            <div key={index} className="space-y-4">
                                <h3 className={`
                  text-sm font-semibold uppercase tracking-wide
                  ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}
                `}>
                                    {section.category}
                                </h3>
                                <ul className="space-y-2">
                                    {section.links.map((link, linkIndex) => (
                                        <li key={linkIndex}>
                                            <a
                                                href={link.href}
                                                className={`
                          flex items-center space-x-2 text-sm transition-colors duration-200
                          hover:translate-x-1 transform transition-transform
                          ${isDarkMode
                                                    ? 'text-gray-400 hover:text-white'
                                                    : 'text-gray-600 hover:text-gray-900'
                                                }
                        `}
                                                role="button"
                                                tabIndex={0}
                                            >
                                                <link.icon size={14} />
                                                <span>{link.name}</span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                        {/* System Stats */}
                        <div className="space-y-4">
                            <h3 className={`
                text-sm font-semibold uppercase tracking-wide
                ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}
              `}>
                                System Status
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                  <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Active Users
                  </span>
                                    <span className={`text-sm font-medium ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                    {systemStats.activeUsers.toLocaleString()}
                  </span>
                                </div>
                                <div className="flex items-center justify-between">
                  <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    System Load
                  </span>
                                    <span className={`text-sm font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                    {systemStats.systemLoad}%
                  </span>
                                </div>
                                <div className="flex items-center justify-between">
                  <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Uptime
                  </span>
                                    <span className={`text-sm font-medium ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                    {systemStats.uptime}
                  </span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="space-y-4">
                            <h3 className={`
                text-sm font-semibold uppercase tracking-wide
                ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}
              `}>
                                Quick Actions
                            </h3>
                            <div className="space-y-2">
                                {quickActions.map((action, index) => (
                                    <button
                                        key={index}
                                        onClick={action.action}
                                        className={`
                      flex items-center justify-between w-full px-3 py-2 rounded-lg
                      text-sm transition-all duration-200 transform hover:scale-105
                      ${isDarkMode
                                            ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white'
                                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900'
                                        }
                    `}
                                        role="button"
                                        tabIndex={0}
                                        aria-label={action.name}
                                    >
                                        <div className="flex items-center space-x-2">
                                            <action.icon size={16} />
                                            <span>{action.name}</span>
                                        </div>
                                        {action.count && (
                                            <span className={`
                        px-2 py-1 rounded-full text-xs font-medium
                        ${isDarkMode
                                                ? 'bg-red-500 text-white'
                                                : 'bg-red-100 text-red-800'
                                            }
                      `}>
                        {action.count}
                      </span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer Bar */}
            <div className={`
        px-4 py-3 border-t
        ${isDarkMode
                ? 'bg-gray-800 border-gray-700'
                : 'bg-gray-50 border-gray-200'
            }
      `}>
                <div className="container mx-auto flex items-center justify-between">

                    {/* Left Side - Logo/Brand */}
                    <div className="flex items-center space-x-3">
                        <div className={`
              w-8 h-8 rounded-lg flex items-center justify-center
              ${isDarkMode
                            ? 'bg-blue-600 text-white'
                            : 'bg-blue-100 text-blue-600'
                        }
            `}>
                            <Shield size={16} />
                        </div>
                        <div>
                            <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                Admin Panel
                            </p>
                            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                v2.1.0 • Last updated 2 hours ago
                            </p>
                        </div>
                    </div>

                    {/* Center - System Health Indicator */}
                    <div className="hidden md:flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              All systems operational
            </span>
                    </div>

                    {/* Right Side - Expand Toggle */}
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className={`
              flex items-center space-x-2 px-3 py-2 rounded-lg
              transition-all duration-200 transform hover:scale-105
              ${isDarkMode
                            ? 'bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white'
                            : 'bg-white hover:bg-gray-100 text-gray-700 hover:text-gray-900'
                        }
              focus:outline-none focus:ring-2 focus:ring-offset-2
              ${isDarkMode ? 'focus:ring-blue-500' : 'focus:ring-blue-500'}
            `}
                        role="button"
                        tabIndex={0}
                        aria-label={isExpanded ? 'Collapse footer' : 'Expand footer'}
                        aria-expanded={isExpanded}
                    >
            <span className="text-sm font-medium">
              {isExpanded ? 'Less' : 'More'}
            </span>
                        <ChevronUp
                            size={16}
                            className={`
                transition-transform duration-300
                ${isExpanded ? 'rotate-180' : 'rotate-0'}
              `}
                        />
                    </button>
                </div>
            </div>

            {/* Bottom Copyright Bar */}
            <div className={`
        px-4 py-2 text-center border-t
        ${isDarkMode
                ? 'bg-gray-900 border-gray-800'
                : 'bg-gray-100 border-gray-200'
            }
      `}>
                <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    © 2025 Hotel Management System. All rights reserved. |
                    <span className="mx-1">Made with ❤️ for administrators</span>
                </p>
            </div>
        </footer>
    );
};

export default AdminFooter;