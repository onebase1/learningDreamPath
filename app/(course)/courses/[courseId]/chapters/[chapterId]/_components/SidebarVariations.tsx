import React, { useState } from 'react';
import { ChevronRight, Menu, X, CheckCircle2, Circle, LockIcon } from 'lucide-react';

interface ChapterInfo {
  id: string;
  position: number;
}

interface SidebarProps {
  chapterId: string;
  courseId: string;
  currentPosition: number;
  chapters: ChapterInfo[];
  answeredChapters: string[];
  onNavigate: (chapId: string, position: number) => void;
  getDisplayPosition?: (position: number) => number;
  logo?: React.ReactNode;
}

const MinimalSidebar: React.FC<SidebarProps> = ({ 
  chapterId, 
  courseId, 
  currentPosition, 
  chapters, 
  answeredChapters = [],
  onNavigate,
  getDisplayPosition = (pos) => pos,
  logo
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Helper to determine section status
  const getSectionStatus = (position: number, chapterId: string) => {
    if (position < currentPosition) return 'completed';
    if (position === currentPosition) return 'current';
    return 'locked';
  };

  // Helper to get status colors and icons
  const getStatusStyles = (status: 'completed' | 'current' | 'locked') => {
    switch(status) {
      case 'completed':
        return {
          background: 'bg-green-100 hover:bg-green-100',
          text: 'text-green-700',
          border: 'border-l-4 border-green-500',
          icon: <CheckCircle2 size={18} className="text-green-500" />
        };
      case 'current':
        return {
          background: 'bg-blue-100 hover:bg-blue-100',
          text: 'text-blue-700',
          border: 'border-l-4 border-blue-500',
          icon: <ChevronRight size={18} className="text-blue-500" />
        };
      case 'locked':
        return {
          background: 'bg-gray-50 hover:bg-gray-50',
          text: 'text-gray-400',
          border: 'border-l-4 border-transparent',
          icon: <LockIcon size={18} className="text-gray-400" />
        };
    }
  };

  return (
    <div className={`bg-white border-r transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      
      <div className="flex items-center justify-between p-4 border-b">
        { !isCollapsed && (
          <span className="font-bold">
            Hide Sidebar
          </span>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          {isCollapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
      </div>

      
      <div className="p-4">
        {chapters.map((chapter) => {
          const status = getSectionStatus(chapter.position, chapter.id);
          const styles = getStatusStyles(status);
          
          return (
            <div
              key={chapter.id}
              className={`w-full mb-2 p-3 rounded-lg transition-all
                ${styles.background} ${styles.border}
                ${isCollapsed ? 'flex justify-center' : 'flex items-center justify-between'}
                cursor-default`}
            >
              {!isCollapsed ? (
                <>
                  <div className="flex items-center gap-3">
                    {styles.icon}
                    <span className={`text-sm font-medium ${styles.text}`}>
                      Section {getDisplayPosition(chapter.position)}
                    </span>
                  </div>
                  <span className={`text-xs ${styles.text}`}>
                    {status === 'completed' ? 'Completed' : 
                     status === 'current' ? 'Current' : 'Locked'}
                  </span>
                </>
              ) : (
                <div className={`flex flex-col items-center gap-1 ${styles.text}`}>
                  <span className="text-sm">{getDisplayPosition(chapter.position)}</span>
                  {styles.icon}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { MinimalSidebar };