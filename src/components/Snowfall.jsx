import React from 'react';
import './Snowfall.css';

const Snowfall = () => {
    // Generate 70 snowflakes with random properties
    const snowflakes = Array.from({ length: 100 }).map((_, i) => ({
        id: i,
        size: Math.random() * 20 + 5 + 'px',
        left: Math.random() * 100 + '%',
        delay: Math.random() * 20 + 's',
        duration: Math.random() * 15 + 10 + 's',
        opacity: Math.random() * 0.6 + 0.2,
        swayAmount: Math.random() * 150 - 75 + 'px',
        type: Math.random() > 0.4 ? 'circle' : 'icon',
        icon: ['❄', '❅', '❆', '•'][Math.floor(Math.random() * 4)]
    }));

    return (
        <div className="snowfall-container">
            {snowflakes.map(snow => (
                <div
                    key={snow.id}
                    className={`snowflake ${snow.type}`}
                    style={{
                        width: snow.type === 'circle' ? snow.size : 'auto',
                        height: snow.type === 'circle' ? snow.size : 'auto',
                        left: snow.left,
                        animationDelay: snow.delay,
                        animationDuration: snow.duration,
                        opacity: snow.opacity,
                        fontSize: snow.type === 'icon' ? snow.size : 'inherit',
                        '--sway': snow.swayAmount
                    }}
                >
                    {snow.type === 'icon' ? snow.icon : null}
                </div>
            ))}
        </div>
    );
};

export default Snowfall;
