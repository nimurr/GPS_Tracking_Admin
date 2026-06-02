import React, { useEffect, useRef } from 'react';

const data = {
  labels: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  values: [460, 130, 390, 500, 130, 350, 240],
};

const ActiveGPSDeviceChart = () => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    import('chart.js/auto').then(({ default: Chart }) => {
      if (chartRef.current) chartRef.current.destroy();
      chartRef.current = new Chart(canvasRef.current, {
        type: 'bar',
        data: {
          labels: data.labels,
          datasets: [{
            data: data.values,
            backgroundColor: data.labels.map((_, i) => i === 3 ? '#fecd38' : '#888888'),
            borderRadius: 3,
            borderSkipped: false,
            barPercentage: 0.55,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: {
              grid: { color: 'rgba(255,255,255,0.05)' },
              ticks: { color: '#888', font: { size: 12 } },
              border: { color: 'transparent' },
            },
            y: {
              min: 0, max: 500,
              ticks: { color: '#888', font: { size: 11 }, stepSize: 100 },
              grid: { color: 'rgba(255,255,255,0.07)' },
              border: { color: 'transparent' },
            },
          },
        },
      });
    });
    return () => chartRef.current?.destroy();
  }, []);

  return (
    <div style={{ background: '#111', borderRadius: 14, padding: '20px 20px 12px' }}>
      <p style={{ color: '#ccc', fontSize: 20, fontWeight: 500, margin: '0 0 16px' }}>
        Active GPS Device
      </p>
      <div style={{ position: 'relative', height: 220 }}>
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};

export default ActiveGPSDeviceChart;