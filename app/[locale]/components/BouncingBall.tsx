import React, { useEffect, useRef } from 'react';

interface BouncingBallProps {
    startX: number,
    startY: number,
    velocityX: number,
    velocityY: number,
    inFrame: boolean
}

export default function BouncingBall( { startX, startY, velocityX, velocityY, inFrame }: BouncingBallProps ) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (inFrame) return;

        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;

        let cx = startX + 7,
            cy = startY + 7,
            vx = velocityX,
            vy = velocityY;
        const radius = 5,
            gravity = 0.3,
            damping = 0.6,
            traction = 0.8,
            paused = false;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight + 12;
        };

        resizeCanvas();

        function circle() {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if (!paused) requestAnimationFrame(circle);

            if (cx + radius >= canvas.width) {
                vx = -vx * damping;
                cx = canvas.width - radius;
            } else if (cx - radius <= 0) {
                vx = -vx * damping;
                cx = radius;
            }
            if (cy + radius >= canvas.height) {
                vy = -vy * damping;
                cy = canvas.height - radius;
                vx *= traction;
            } else if (cy - radius <= 0) {
                vy = -vy * damping;
                cy = radius;
            }

            vy += gravity;

            cx += vx;
            cy += vy;

            ctx.beginPath();
            ctx.arc(cx, cy, radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = '#FF3F3F';
            ctx.fill();
        }

        window.addEventListener('resize', resizeCanvas);
        circle();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
        };
    }, [startX, startY, velocityX, velocityY, inFrame]);

    return <canvas ref={canvasRef} className={`fixed top-0 left-0 w-full h-[calc(100vh+12px)] pointer-events-none z-[100] ${inFrame ? "hidden" : "lg:block hidden"}`}></canvas>;
}