import './AnnouncementBar.css';

export default function AnnouncementBar({ settings }) {
  if (!settings?.announcement?.isActive) return null;
  return (
    <div className="announcement-bar">
      <span>{settings.announcement.text || 'Coming soon to the West Island of Montreal'}</span>
    </div>
  );
}
