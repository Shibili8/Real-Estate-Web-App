import React, { useState } from 'react';
import { Play, Video as VideoIcon, Sparkles } from 'lucide-react';

/**
 * Formats a YouTube URL into standard embed format with autoplay prevented
 */
function getEmbedUrl(url) {
  if (!url) return '';
  if (url.includes('embed/')) {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}autoplay=0&rel=0`;
  }
  // Convert youtu.be/ID
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (shortMatch && shortMatch[1]) {
    return `https://www.youtube.com/embed/${shortMatch[1]}?autoplay=0&rel=0`;
  }
  // Convert youtube.com/watch?v=ID
  const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
  if (watchMatch && watchMatch[1]) {
    return `https://www.youtube.com/embed/${watchMatch[1]}?autoplay=0&rel=0`;
  }
  return url;
}

export default function VideoPlayer({ video }) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!video || !video.url) return null;

  const isYouTube =
    video.url.includes('youtube.com') || video.url.includes('youtu.be');
  const embedUrl = getEmbedUrl(video.url);

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs">
      {/* Video Header Bar */}
      <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center flex-shrink-0">
            <VideoIcon className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">
              {video.type === 'drone' ? 'Aerial Drone Tour' : 'Virtual Walkthrough'}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              {video.title || 'Property Video Tour'}
            </h3>
          </div>
        </div>

        <span className="text-xs font-medium text-slate-500 bg-white px-3 py-1.5 rounded-full border border-slate-200 self-start sm:self-auto">
          HD Quality
        </span>
      </div>

      {/* Video Media Container */}
      <div className="relative aspect-video bg-slate-950 w-full overflow-hidden">
        {/* Custom Play Preview Overlay if not started */}
        {!isPlaying && video.thumbnail ? (
          <div className="relative w-full h-full group">
            <img
              src={video.thumbnail}
              alt={video.title || 'Video Tour'}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
              <button
                type="button"
                onClick={() => setIsPlaying(true)}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-xl shadow-rose-600/30 group-hover:scale-110 group-hover:bg-rose-700 transition-all focus:outline-none"
                aria-label="Play video walkthrough"
              >
                <Play className="w-8 h-8 fill-current ml-1" />
              </button>
            </div>
            <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-lg">
              Click to Play Tour (Sound is not autoplayed)
            </div>
          </div>
        ) : isYouTube ? (
          <iframe
            src={`${embedUrl}&autoplay=1`}
            title={video.title || 'Property Video Tour'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
            loading="lazy"
          />
        ) : (
          <video
            controls
            autoPlay
            playsInline
            className="w-full h-full object-contain"
            src={video.url}
          >
            Your browser does not support HTML video playback.
          </video>
        )}
      </div>
    </div>
  );
}
