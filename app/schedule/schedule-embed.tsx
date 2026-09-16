'use client';

import { useEffect, useRef, useState } from 'react';

export function ScheduleEmbed({ scheduleUrl }: { scheduleUrl: string }) {
  const embedUrl = `${scheduleUrl}?embed=true&mode=table&theme=light&tbg=true`;
  const frame = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState<number>();

  useEffect(() => {
    function resize(event: MessageEvent) {
      if (event.origin !== new URL(scheduleUrl).origin || event.source !== frame.current?.contentWindow) return;
      const data = event.data;
      if (data?.type !== 'resize' || typeof data.height !== 'number' || !Number.isFinite(data.height) || data.height <= 0) return;
      setHeight(Math.max(320, Math.min(20000, Math.ceil(data.height) + 32)));
    }
    window.addEventListener('message', resize);
    return () => window.removeEventListener('message', resize);
  }, [scheduleUrl]);

  return (
    <iframe
      ref={frame}
      className="schedule-embed"
      src={embedUrl}
      title="The Collaborative Bakersfield Jiu Jitsu class schedule"
      style={height ? { height } : undefined}
    />
  );
}
