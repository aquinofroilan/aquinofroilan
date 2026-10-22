"use client";

import { useEffect, useRef } from "react";

// ─── Pixel Art Matrices ───────────────────────────────────────────────────────

// 12x12 Spider Matrices (Leg Cadence Frames)
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

// 10x8 Cricket Sprite Matrix
// Perched on top of border with feet resting on the line
const CRICKET_FRAME_IDLE = [
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 1, 1, 1, 1, 0, 0, 1],
    [0, 1, 0, 0, 1, 1, 0, 0, 1, 0],
    [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
];

// In-air catapult jump posture: legs extended backward
const CRICKET_FRAME_JUMP = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
    [1, 1, 0, 1, 1, 1, 0, 0, 0, 0],
    [1, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 1, 0],
];

// ─── Interfaces ───────────────────────────────────────────────────────────────

interface CardRect {
    left: number;
    top: number;
    right: number;
    bottom: number;
    width: number;
    height: number;
}

interface PerchBorder {
    left: number;
    right: number;
    y: number; // The top border line of the badge/card in page coords
}

interface Spider {
    cardIndex: number;
    edge: number; // 0: top, 1: right, 2: bottom, 3: left
    progress: number;
    x: number;
    y: number;
    angle: number;
    speed: number;
    frame: number;
    animTick: number;
    isJumping: boolean;
    jumpStart: { x: number; y: number };
    jumpEnd: { x: number; y: number };
    jumpArc: number;
    jumpProgress: number;
}

interface Cricket {
    perchIndex: number;
    progressOnPerch: number; // position along the top border line
    x: number;
    y: number;
    state: "idle" | "jumping";
    idleTicks: number;
    jumpStart: { x: number; y: number };
    jumpEnd: { x: number; y: number };
    jumpHeight: number;
    jumpProgress: number;
    jumpSpeed: number;
    direction: 1 | -1;
}

export function SpiderCrawler() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
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

        // 1. Scan card perimeters for Spider
        const getSpiderCards = (): CardRect[] => {
            const elements = document.querySelectorAll(
                "main > div > div, main > div > section, .border.bg-card\\/60",
            );
            const cards: CardRect[] = [];
            const scrollY = window.scrollY;

            elements.forEach((el) => {
                const rect = el.getBoundingClientRect();
                if (rect.width > 120 && rect.height > 60) {
                    cards.push({
                        left: rect.left,
                        top: rect.top + scrollY,
                        right: rect.right,
                        bottom: rect.bottom + scrollY,
                        width: rect.width,
                        height: rect.height,
                    });
                }
            });

            return cards.length > 0
                ? cards
                : [
                      {
                          left: 40,
                          top: 80,
                          right: width - 40,
                          bottom: height - 80,
                          width: width - 80,
                          height: height - 160,
                      },
                  ];
        };

        // 2. Scan top border edges of tech stack badges, cert cards, and project cards
        const getCricketPerches = (): PerchBorder[] => {
            const elements = document.querySelectorAll("[data-cricket-perch='true']");
            const perches: PerchBorder[] = [];
            const scrollY = window.scrollY;

            elements.forEach((el) => {
                const rect = el.getBoundingClientRect();
                if (rect.width > 20) {
                    perches.push({
                        left: rect.left,
                        right: rect.right,
                        y: rect.top + scrollY, // top border in page coordinates
                    });
                }
            });

            return perches.length > 0
                ? perches
                : [
                      { left: 100, right: 250, y: 300 },
                      { left: 300, right: 450, y: 300 },
                      { left: 500, right: 650, y: 300 },
                  ];
        };

        let cardBoxes = getSpiderCards();
        let perches = getCricketPerches();

        // ─── Initialize Spider (Anchored strictly to card perimeter) ─────────
        const spider: Spider = {
            cardIndex: 0,
            edge: 0,
            progress: 0.1,
            x: 0,
            y: 0,
            angle: 0,
            speed: 0.003,
            frame: 0,
            animTick: 0,
            isJumping: false,
            jumpStart: { x: 0, y: 0 },
            jumpEnd: { x: 0, y: 0 },
            jumpArc: 40,
            jumpProgress: 0,
        };

        const updateSpiderCoordsAlongEdge = () => {
            if (!cardBoxes[spider.cardIndex]) spider.cardIndex = 0;
            const c = cardBoxes[spider.cardIndex];
            const scrollY = window.scrollY;
            const top = c.top - scrollY;
            const bottom = c.bottom - scrollY;
            const left = c.left;
            const right = c.right;

            switch (spider.edge) {
                case 0: // Top edge
                    spider.x = left + spider.progress * c.width;
                    spider.y = top;
                    spider.angle = 0;
                    break;
                case 1: // Right edge
                    spider.x = right;
                    spider.y = top + spider.progress * c.height;
                    spider.angle = Math.PI / 2;
                    break;
                case 2: // Bottom edge
                    spider.x = right - spider.progress * c.width;
                    spider.y = bottom;
                    spider.angle = Math.PI;
                    break;
                case 3: // Left edge
                    spider.x = left;
                    spider.y = bottom - spider.progress * c.height;
                    spider.angle = -Math.PI / 2;
                    break;
            }
        };

        updateSpiderCoordsAlongEdge();

        // ─── Initialize Crickets perched ON TOP of badge & card borders ─────
        const crickets: Cricket[] = [0, 1, 2, 3, 4].map((i) => {
            const pIdx = i % perches.length;
            const perch = perches[pIdx];
            const progress = 0.2 + Math.random() * 0.6;
            const scrollY = window.scrollY;
            const x = perch.left + progress * (perch.right - perch.left);
            // Placed exactly on top of the border (6px above the border line)
            const y = perch.y - scrollY - 6;

            return {
                perchIndex: pIdx,
                progressOnPerch: progress,
                x,
                y,
                state: "idle",
                idleTicks: Math.floor(Math.random() * 80) + 30,
                jumpStart: { x, y },
                jumpEnd: { x, y },
                jumpHeight: 50 + Math.random() * 40,
                jumpProgress: 0,
                jumpSpeed: 0.025 + Math.random() * 0.012,
                direction: Math.random() > 0.5 ? 1 : -1,
            };
        });

        const updateCricketPositionOnPerch = (crk: Cricket) => {
            if (!perches[crk.perchIndex]) crk.perchIndex = 0;
            const perch = perches[crk.perchIndex];
            const scrollY = window.scrollY;
            crk.x = perch.left + crk.progressOnPerch * (perch.right - perch.left);
            crk.y = perch.y - scrollY - 6; // strictly perched on top of the border line
        };

        const initiateCatapultJump = (crk: Cricket, scareX?: number) => {
            crk.state = "jumping";
            crk.jumpProgress = 0;
            crk.jumpStart = { x: crk.x, y: crk.y };

            // Pick another badge or card top-border to catapult onto!
            const nextPerchIdx =
                perches.length > 1
                    ? (crk.perchIndex + Math.floor(Math.random() * (perches.length - 1)) + 1) % perches.length
                    : crk.perchIndex;

            crk.perchIndex = nextPerchIdx;
            const targetPerch = perches[nextPerchIdx];
            crk.progressOnPerch = 0.2 + Math.random() * 0.6;

            const scrollY = window.scrollY;
            const targetX = targetPerch.left + crk.progressOnPerch * (targetPerch.right - targetPerch.left);
            const targetY = targetPerch.y - scrollY - 6; // lands exactly on top of border

            if (scareX !== undefined) {
                crk.direction = (Math.sign(targetX - scareX) || 1) as 1 | -1;
            } else {
                crk.direction = targetX >= crk.x ? 1 : -1;
            }

            crk.jumpEnd = { x: targetX, y: targetY };
            crk.jumpHeight = 65 + Math.random() * 55; // high catapult trajectory
            crk.jumpSpeed = 0.026 + Math.random() * 0.012;
        };

        // ─── Mouse Interactions ──────────────────────────────────────────────
        const handleMouseMove = (e: MouseEvent) => {
            const mx = e.clientX;
            const my = e.clientY;

            // Spider startled
            const sDist = Math.hypot(spider.x - mx, spider.y - my);
            if (sDist < 80 && !spider.isJumping) {
                spider.isJumping = true;
                spider.jumpStart = { x: spider.x, y: spider.y };
                spider.jumpProgress = 0;
                spider.jumpArc = 50 + Math.random() * 40;

                const nextEdge = (spider.edge + (Math.random() > 0.5 ? 1 : 3)) % 4;
                spider.edge = nextEdge;
                spider.progress = Math.random() * 0.8 + 0.1;
                updateSpiderCoordsAlongEdge();
                spider.jumpEnd = { x: spider.x, y: spider.y };
            }

            // Crickets startled from their perch
            crickets.forEach((crk) => {
                const dist = Math.hypot(crk.x - mx, crk.y - my);
                if (dist < 85 && crk.state === "idle") {
                    initiateCatapultJump(crk, mx);
                }
            });
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });

        // ─── Drawing Utilities ────────────────────────────────────────────────
        const drawSpiderSprite = (x: number, y: number, angle: number, frame: number) => {
            const matrix = frame === 0 ? SPIDER_FRAME_0 : SPIDER_FRAME_1;
            const pixelSize = 1.6;
            const size = matrix.length * pixelSize;

            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle + Math.PI / 2);
            ctx.fillStyle = "rgba(0, 135, 237, 0.9)"; // Technical blueprint cyan

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

        const drawCricketSprite = (crk: Cricket) => {
            const matrix = crk.state === "jumping" ? CRICKET_FRAME_JUMP : CRICKET_FRAME_IDLE;
            const pixelSize = 1.4;
            const sizeW = matrix[0].length * pixelSize;
            const sizeH = matrix.length * pixelSize;

            ctx.save();
            ctx.translate(crk.x, crk.y);
            if (crk.direction === -1) {
                ctx.scale(-1, 1);
            }

            // Blueprint emerald green for crickets
            ctx.fillStyle = "rgba(16, 185, 129, 0.95)";

            for (let r = 0; r < matrix.length; r++) {
                for (let c = 0; c < matrix[r].length; c++) {
                    if (matrix[r][c] === 1) {
                        ctx.fillRect(
                            c * pixelSize - sizeW / 2,
                            r * pixelSize - sizeH / 2,
                            pixelSize,
                            pixelSize,
                        );
                    }
                }
            }
            ctx.restore();
        };

        // ─── Main Animation Loop ──────────────────────────────────────────────
        const loop = () => {
            ctx.clearRect(0, 0, width, height);

            // Re-sample coordinates on scroll
            cardBoxes = getSpiderCards();
            perches = getCricketPerches();

            // 1. Spider update & render
            if (spider.isJumping) {
                spider.jumpProgress += 0.035;
                if (spider.jumpProgress >= 1) {
                    spider.isJumping = false;
                    spider.jumpProgress = 0;
                    spider.x = spider.jumpEnd.x;
                    spider.y = spider.jumpEnd.y;
                } else {
                    const p = spider.jumpProgress;
                    const curX = spider.jumpStart.x + (spider.jumpEnd.x - spider.jumpStart.x) * p;
                    const arcY = -Math.sin(p * Math.PI) * spider.jumpArc;
                    const curY = spider.jumpStart.y + (spider.jumpEnd.y - spider.jumpStart.y) * p + arcY;
                    spider.x = curX;
                    spider.y = curY;
                }
            } else {
                spider.progress += spider.speed;
                if (spider.progress >= 1) {
                    spider.progress = 0;
                    spider.edge = (spider.edge + 1) % 4;

                    if (Math.random() > 0.7 && cardBoxes.length > 1) {
                        spider.isJumping = true;
                        spider.jumpStart = { x: spider.x, y: spider.y };
                        spider.cardIndex = (spider.cardIndex + 1) % cardBoxes.length;
                        spider.edge = 0;
                        spider.progress = 0.1;
                        updateSpiderCoordsAlongEdge();
                        spider.jumpEnd = { x: spider.x, y: spider.y };
                        spider.jumpProgress = 0;
                        spider.jumpArc = 60;
                    }
                }
                updateSpiderCoordsAlongEdge();

                spider.animTick++;
                if (spider.animTick % 6 === 0) {
                    spider.frame = spider.frame === 0 ? 1 : 0;
                }
            }

            drawSpiderSprite(spider.x, spider.y, spider.angle, spider.frame);

            // 2. Crickets update & render (Strictly perched on top of borders or in catapult arc)
            crickets.forEach((crk) => {
                if (crk.state === "idle") {
                    updateCricketPositionOnPerch(crk);

                    crk.idleTicks--;
                    if (crk.idleTicks <= 0) {
                        crk.idleTicks = Math.floor(Math.random() * 120) + 40;
                        initiateCatapultJump(crk);
                    }
                } else if (crk.state === "jumping") {
                    crk.jumpProgress += crk.jumpSpeed;
                    if (crk.jumpProgress >= 1) {
                        crk.state = "idle";
                        crk.jumpProgress = 0;
                        crk.x = crk.jumpEnd.x;
                        crk.y = crk.jumpEnd.y;
                    } else {
                        const p = crk.jumpProgress;
                        const curX = crk.jumpStart.x + (crk.jumpEnd.x - crk.jumpStart.x) * p;
                        // Catapult arc above the boxes
                        const arcY = -Math.sin(p * Math.PI) * crk.jumpHeight;
                        const curY = crk.jumpStart.y + (crk.jumpEnd.y - crk.jumpStart.y) * p + arcY;
                        crk.x = curX;
                        crk.y = curY;
                    }
                }

                drawCricketSprite(crk);
            });

            animationFrameId = requestAnimationFrame(loop);
        };

        loop();

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
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
