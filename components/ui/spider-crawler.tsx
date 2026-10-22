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
// Antennae, body, folded jumping hind legs
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

// In-air jump posture: legs extended backward
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

interface Spider {
    cardIndex: number;
    // Edge walking parameters: 0: top, 1: right, 2: bottom, 3: left
    edge: number;
    progress: number; // 0 to 1 along current edge
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
    cardIndex: number;
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

        // Scan all card boxes on the page for Spider
        const getSpiderCards = (): CardRect[] => {
            // Include hero columns and standard blueprint cards
            const elements = document.querySelectorAll(
                "[data-hero-column='true'], main > div > div, main > div > section, .border.bg-card\\/60",
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

        // Scan strictly the 3 Hero columns: // identity, // stack, and // metrics
        const getHeroCards = (): CardRect[] => {
            const elements = document.querySelectorAll("[data-hero-column='true']");
            const heroCards: CardRect[] = [];
            const scrollY = window.scrollY;

            elements.forEach((el) => {
                const rect = el.getBoundingClientRect();
                if (rect.width > 60 && rect.height > 60) {
                    heroCards.push({
                        left: rect.left,
                        top: rect.top + scrollY,
                        right: rect.right,
                        bottom: rect.bottom + scrollY,
                        width: rect.width,
                        height: rect.height,
                    });
                }
            });

            return heroCards.length > 0 ? heroCards : getSpiderCards().slice(0, 3);
        };

        let cardBoxes = getSpiderCards();
        let heroBoxes = getHeroCards();

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
                case 0: // Top edge: Left to Right
                    spider.x = left + spider.progress * c.width;
                    spider.y = top;
                    spider.angle = 0;
                    break;
                case 1: // Right edge: Top to Bottom
                    spider.x = right;
                    spider.y = top + spider.progress * c.height;
                    spider.angle = Math.PI / 2;
                    break;
                case 2: // Bottom edge: Right to Left
                    spider.x = right - spider.progress * c.width;
                    spider.y = bottom;
                    spider.angle = Math.PI;
                    break;
                case 3: // Left edge: Bottom to Top
                    spider.x = left;
                    spider.y = bottom - spider.progress * c.height;
                    spider.angle = -Math.PI / 2;
                    break;
            }
        };

        updateSpiderCoordsAlongEdge();

        // ─── Initialize Crickets strictly in Hero Columns: Identity, Stack, Metrics ───
        const crickets: Cricket[] = [0, 1, 2, 3].map((i) => {
            const cardIdx = i % (heroBoxes.length || 1);
            const c = heroBoxes[cardIdx] || cardBoxes[0];
            const scrollY = window.scrollY;
            const x = c.left + 15 + Math.random() * Math.max(10, c.width - 30);
            const y = c.top - scrollY + 15 + Math.random() * Math.max(10, c.height - 30);

            return {
                cardIndex: cardIdx,
                x,
                y,
                state: "idle",
                idleTicks: Math.floor(Math.random() * 80) + 30,
                jumpStart: { x, y },
                jumpEnd: { x, y },
                jumpHeight: 50 + Math.random() * 40,
                jumpProgress: 0,
                jumpSpeed: 0.024 + Math.random() * 0.015,
                direction: Math.random() > 0.5 ? 1 : -1,
            };
        });

        // ─── Mouse Interactions ──────────────────────────────────────────────
        const handleMouseMove = (e: MouseEvent) => {
            const mx = e.clientX;
            const my = e.clientY;

            // Spider startled: jump across to next edge or another box
            const sDist = Math.hypot(spider.x - mx, spider.y - my);
            if (sDist < 80 && !spider.isJumping) {
                spider.isJumping = true;
                spider.jumpStart = { x: spider.x, y: spider.y };
                spider.jumpProgress = 0;
                spider.jumpArc = 50 + Math.random() * 40;

                // Pick adjacent edge on same or next card
                const nextEdge = (spider.edge + (Math.random() > 0.5 ? 1 : 3)) % 4;
                spider.edge = nextEdge;
                spider.progress = Math.random() * 0.8 + 0.1;
                updateSpiderCoordsAlongEdge();
                spider.jumpEnd = { x: spider.x, y: spider.y };
            }

            // Crickets catapult jump when mouse comes near
            crickets.forEach((crk) => {
                const dist = Math.hypot(crk.x - mx, crk.y - my);
                if (dist < 90 && crk.state === "idle") {
                    initiateCatapultJump(crk, mx, my);
                }
            });
        };

        const initiateCatapultJump = (crk: Cricket, scareX?: number, scareY?: number) => {
            crk.state = "jumping";
            crk.jumpProgress = 0;
            crk.jumpStart = { x: crk.x, y: crk.y };

            // Confine crickets strictly to hero columns (or jump between adjacent hero columns!)
            const targetColIdx =
                Math.random() > 0.4 && heroBoxes.length > 1
                    ? (crk.cardIndex + (Math.random() > 0.5 ? 1 : heroBoxes.length - 1)) % heroBoxes.length
                    : crk.cardIndex;

            crk.cardIndex = targetColIdx;
            const c = heroBoxes[targetColIdx] || cardBoxes[0];
            const scrollY = window.scrollY;

            // Catapult trajectory away from scare point or to adjacent card
            let targetX: number;
            let targetY: number;

            if (scareX !== undefined && scareY !== undefined) {
                const awayDir = Math.sign(crk.x - scareX) || (Math.random() > 0.5 ? 1 : -1);
                crk.direction = awayDir as 1 | -1;
                targetX = Math.max(c.left + 15, Math.min(c.right - 15, crk.x + awayDir * (90 + Math.random() * 70)));
                targetY = Math.max(c.top - scrollY + 15, Math.min(c.bottom - scrollY - 15, crk.y + (Math.random() - 0.5) * 50));
            } else {
                // Natural catapult leap across box items
                crk.direction = Math.random() > 0.5 ? 1 : -1;
                targetX = Math.max(c.left + 15, Math.min(c.right - 15, c.left + 15 + Math.random() * Math.max(10, c.width - 30)));
                targetY = Math.max(c.top - scrollY + 15, Math.min(c.bottom - scrollY - 15, c.top - scrollY + 15 + Math.random() * Math.max(10, c.height - 30)));
            }

            crk.jumpEnd = { x: targetX, y: targetY };
            crk.jumpHeight = 60 + Math.random() * 50; // Big catapult arc
            crk.jumpSpeed = 0.026 + Math.random() * 0.012;
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
            ctx.fillStyle = "rgba(0, 135, 237, 0.9)"; // Technical cyan/blue

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
            const pixelSize = 1.5;
            const sizeW = matrix[0].length * pixelSize;
            const sizeH = matrix.length * pixelSize;

            ctx.save();
            ctx.translate(crk.x, crk.y);
            if (crk.direction === -1) {
                ctx.scale(-1, 1);
            }

            // Green technical blueprint hue for crickets
            ctx.fillStyle = "rgba(16, 185, 129, 0.9)";

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

            // Re-sample card positions on scroll
            cardBoxes = getSpiderCards();
            heroBoxes = getHeroCards();

            // 1. Update & Render Spider (Strictly anchored to card perimeters)
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
                    // Parabolic arc for startled jump
                    const arcY = -Math.sin(p * Math.PI) * spider.jumpArc;
                    const curY = spider.jumpStart.y + (spider.jumpEnd.y - spider.jumpStart.y) * p + arcY;
                    spider.x = curX;
                    spider.y = curY;
                }
            } else {
                spider.progress += spider.speed;
                if (spider.progress >= 1) {
                    spider.progress = 0;
                    // Transition to next edge around box
                    spider.edge = (spider.edge + 1) % 4;

                    // Small chance to jump to next card box
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

            // 2. Update & Render Crickets (Catapult jumping over stack/projects/certs)
            crickets.forEach((crk) => {
                if (crk.state === "idle") {
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
                        // High catapult parabolic arc
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
