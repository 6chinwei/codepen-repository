const config = {
  fftSize: 1024,      // Number of bins in the Fast Fourier Transform
  maxFrequency: 6000, // Maximum frequency (Hz) to display in canvas
  labelFont: '10px Arial',
  labelColor: '#FFF',
  labelStep: 50,   // Frequency step to display label
  xAxisHeight: 20, // Height of the x-axis
  yAxisWidth: 30,  // Width of the y-axis
};

const $audio = document.getElementById('audio');
const $canvas = document.getElementById('visualizer');
const ctx = $canvas.getContext('2d');

const analyser = initialAudioAnalyser($audio);
const audioFrequencyData = new Uint8Array(analyser.frequencyBinCount);
analyser.getByteFrequencyData(audioFrequencyData);
const frequencyResolution = analyser.context.sampleRate / analyser.fftSize

drawAxes(ctx, $canvas); // Initial the axes

$audio.addEventListener('play', () => {
  startVisualizer($canvas);
});

function initialAudioAnalyser(audioElement) {
  const audioContext = new window.AudioContext();
  const analyser = audioContext.createAnalyser();
  analyser.fftSize = config.fftSize;

  const source = audioContext.createMediaElementSource(audioElement);
  source.connect(analyser);
  analyser.connect(audioContext.destination);

  return analyser;
}

function startVisualizer(canvas) {
  function render() {
      drawVisualizer(ctx, canvas, analyser);
      requestAnimationFrame(render);
  }

  if (analyser.context.state === 'suspended') {
    analyser.context.resume();
  }

  render();
}

function drawVisualizer(ctx, canvas, analyser) {
  ctx.clearRect(config.yAxisWidth, 0, canvas.width, canvas.height - config.xAxisHeight);

  // Get current frequency data into audioFrequencyData
  analyser.getByteFrequencyData(audioFrequencyData);
  const barWidth = (canvas.width - config.yAxisWidth) / config.maxFrequency * frequencyResolution - 1;

  let frequency = 0;
  while (frequency <= config.maxFrequency) {
      const binIndex = Math.floor(frequency / frequencyResolution);
      const barPosX = (frequency / config.maxFrequency) * (canvas.width - config.yAxisWidth) + config.yAxisWidth;
      const barHeight = audioFrequencyData[binIndex] || 0;

      drawBar(
        ctx, 
        barPosX, 
        canvas.height - barHeight - config.xAxisHeight, 
        barHeight, 
        barWidth
      );

      frequency += frequencyResolution;
  }
}

function drawAxes(ctx, canvas) {
  drawXAxis(ctx, canvas);
  drawYAxis(ctx, canvas);
}

function drawYAxis(ctx, canvas) {
  drawLabel(ctx, 5, canvas.height - config.xAxisHeight, '0%');
  drawLabel(ctx, 5, config.xAxisHeight, '100%');
  drawLabel(ctx, 5, canvas.height / 2, 'Vol');
}

function drawXAxis(ctx, canvas) {
  let frequency = 0;

  while (frequency <= config.maxFrequency) {
    const barPosX = (frequency / config.maxFrequency) * (canvas.width - config.yAxisWidth) + config.yAxisWidth;

    if (frequency % config.labelStep === 0) {
        drawLabel(
          ctx, 
          barPosX, 
          canvas.height - config.xAxisHeight/4, 
          `${frequency.toFixed(0)} Hz`
        );
    }

    frequency += frequencyResolution;
  }
}

function drawBar(ctx, x, y, height, width) {
  ctx.fillStyle = `rgb(50, 150, ${height + 100})`;
  ctx.fillRect(x, y, width, height);
}

function drawLabel(ctx, x, y, text) {
  ctx.fillStyle = config.labelColor;
  ctx.font = config.labelFont;
  ctx.fillText(text, x, y);
}
