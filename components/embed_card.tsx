"use client";
import React, { useEffect } from "react";

interface EmbedCardProps {
  badge_id: string;
}

const EmbedCard = ({ badge_id }: EmbedCardProps) => {
  useEffect(() => {
    const loadScript = () => {
      const scriptId = "credly-embed-script";

      if (document.getElementById(scriptId)) return;

      const script = document.createElement("script");
      script.id = scriptId;
      script.type = "text/javascript";
      script.async = true;
      script.src = "//cdn.credly.com/assets/utilities/embed.js";

      document.body.appendChild(script);
    };

    loadScript();
  }, []);

  return (
    <div
      data-iframe-width="150"
      data-iframe-height="270"
      data-share-badge-id={badge_id}
      data-share-badge-host="https://www.credly.com"
    ></div>
  );
};

export default EmbedCard;
