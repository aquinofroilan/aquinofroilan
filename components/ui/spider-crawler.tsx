"use client";

import { useEffect, useRef } from "react";

// Pixel art 12x12 monochrome blueprint spider matrices
// Frame 0 & Frame 1 alternate for walking leg cadence
const SPIDER_FRAME_0 = [
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0],
    [1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1],
    [0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0],
    [1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const SPIDER_FRAME_1 = [
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0],
    [1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1],
    [0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

interface Point {
    x: number;
    y: number;
}

interface SpiderState {
    x: number;
    y: number;
    targetX: number;
    targetY: number;
    angle: number;
    speed: number;
    frame: number;
    animTick: number;
    isStartled: boolean;
    threadY: number | null; // For dropping down a silk thread
    targetThreadY: number | null;
}

export function SpiderCrawler() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        // Respect prefers-reduced-motion
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        if (mediaQuery.matches) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const handleResize = () => {
            if (!canvas) return;
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", handleResize);

        // Scan edges / borders from cards & headers
        const getNavigablePoints = (): Point[] => {
            const elements = document.querySelectorAll(
                "main > div, main > section, .border, header",
            );
            const points: Point[] = [];
            const scrollY = window.scrollY;

            elements.forEach((el) => {
                const rect = el.getBoundingClientRect();
                const top = rect.top + scrollY;
                const bottom = rect.bottom + scrollY;
                const left = rect.left;
                const right = rect.right;

                if (rect.width > 30 && rect.height > 30) {
                    // Sample perimeter corners & midpoints
                    points.push(
                        { x: left, y: top },
                        { x: right, y: top },
                        { x: right, y: bottom },
                        { x: left, y: bottom },
                        { x: (left + right) / 2, y: top },
                        { x: (left + right) / 2, y: bottom },
                    );
                }
            });

            return points.length > 0 ? points : [{ x: 100, y: 100 }, { x: width - 100, y: 100 }];
        };

        const spider: SpiderState = {
            x: 80,
            y: 90,
            targetX: 200,
            targetY: 90,
            angle: 0,
            speed: 1.5,
            frame: 0,
            animTick: 0,
            isStartled: false,
            threadY: null,
            targetThreadY: null,
        };

        const selectNewTarget = () => {
            const points = getNavigablePoints();
            // Pick a point near the current viewport
            const scrollY = window.scrollY;
            const visiblePoints = points.filter(
                (p) => p.y >= scrollY - 50 && p.y <= scrollY + height + 50,
            );
            const pool = visiblePoints.length > 0 ? visiblePoints : points;
            const next = pool[Math.floor(Math.random() * pool.length)];

            spider.targetX = next.x;
            spider.targetY = next.y - scrollY; // screen-relative coordinates
        };

        // Mouse hover interaction: proximity scuttle or thread drop
        const handleMouseMove = (e: MouseEvent) => {
            const dx = spider.x - e.clientX;
            const dy = spider.y - e.clientY;
            const dist = Math.hypot(dx, dy);

            if (dist < 90) {
                spider.isStartled = true;
                spider.speed = 4.2;

                // Chance to drop down a silk thread
                if (Math.random() > 0.6 && spider.threadY === null) {
                    spider.threadY = spider.y;
                    spider.targetThreadY = Math.min(height - 40, spider.y + 60 + Math.random() * 80);
                } else {
                    // Scuttle away in opposite direction
                    spider.targetX = Math.max(20, Math.min(width - 20, spider.x + (dx / (dist || 1)) * 160));
                    spider.targetY = Math.max(20, Math.min(height - 20, spider.y + (dy / (dist || 1)) * 160));
                }
            }
        };

        // Click interaction: startled jump
        const handleClick = (e: MouseEvent) => {
            const dx = spider.x - e.clientX;
            const dy = spider.y - e.clientY;
            if (Math.hypot(dx, dy) < 45) {
                spider.isStartled = true;
                spider.speed = 6.0;
                spider.targetX = Math.max(30, Math.min(width - 30, spider.x + (Math.random() - 0.5) * 200));
                spider.targetY = Math.max(30, Math.min(height - 30, spider.y + (Math.random() - 0.5) * 200));
            }
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        window.addEventListener("click", handleClick, { passive: true });

        // Draw pixel-art spider
        const drawSpider = (x: number, y: number, angle: number, frame: number) => {
            const matrix = frame === 0 ? SPIDER_FRAME_0 : SPIDER_FRAME_1;
            const pixelSize = 1.6;
            const size = matrix.length * pixelSize;

            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle + Math.PI / 2); // default sprite faces north

            // Cyan/blueprint accent color in dark/light mode
            ctx.fillStyle = "rgba(0, 135, 237, 0.85)";

            for (let r = 0; r < matrix.length; r++) {
                for (let c = 0; c < matrix[r].length; c++) {
                    if (matrix[r][c] === 1) {
                        ctx.fillRect(
                            c * pixelSize - size / 2,
                            r * pixelSize - size / 2,
                            pixelSize,
                            pixelSize,
                        );
                    }
                }
            }
            ctx.restore();
        };

        // Render loop
        const loop = () => {
            ctx.clearRect(0, 0, width, height);

            // Silk thread dropping logic
            if (spider.threadY !== null && spider.targetThreadY !== null) {
                ctx.beginPath();
                ctx.strokeStyle = "rgba(0, 135, 237, 0.4)";
                ctx.setLineDash([2, 2]);
                ctx.lineWidth = 1;
                ctx.moveTo(spider.x, spider.threadY);
                ctx.lineTo(spider.x, spider.y);
                ctx.stroke();
                ctx.setLineDash([]);

                // Drop down or climb back up
                if (spider.y < spider.targetThreadY) {
                    spider.y += 3.5;
                } else {
                    // Reached drop bottom, scuttle resume
                    spider.threadY = null;
                    spider.targetThreadY = null;
                    spider.isStartled = false;
                    spider.speed = 1.5;
                    selectNewTarget();
                }
            } else {
                // Normal path traversal
                const dx = spider.targetX - spider.x;
                const dy = spider.targetY - spider.y;
                const dist = Math.hypot(dx, dy);

                if (dist < 6) {
                    spider.isStartled = false;
                    spider.speed = 1.5;
                    selectNewTarget();
                } else {
                    const targetAngle = Math.atan2(dy, dx);
                    // Smooth angular rotation
                    spider.angle = targetAngle;
                    spider.x += Math.cos(targetAngle) * spider.speed;
                    spider.y += Math.sin(targetAngle) * spider.speed;

                    // Leg animation tick
                    spider.animTick++;
                    if (spider.animTick % 6 === 0) {
                        spider.frame = spider.frame === 0 ? 1 : 0;
                    }
                }
            }

            drawSpider(spider.x, spider.y, spider.angle, spider.frame);
            animationFrameId = requestAnimationFrame(loop);
        };

        // Initialize first target
        selectNewTarget();
        loop();

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("click", handleClick);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="fixed inset-0 pointer-events-none z-40 select-none"
        />
    );
}
