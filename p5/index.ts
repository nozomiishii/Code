import p5 from 'p5';

export const sketch = (p: p5) => {
  p.setup = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.draw = () => {
    p.background(220);
    p.ellipse(50, 50, 80, 80);
  };
};
