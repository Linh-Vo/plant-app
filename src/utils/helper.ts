export const getPath = (
  width: number,
  height: number,
  curvedButtonSize = 64,
) => {
  const halfWidth = width / 2;
  return `M 0 0 V${height} H${width} V0 H${halfWidth + curvedButtonSize} C${
    halfWidth + curvedButtonSize - 16
  } 0 ${halfWidth + curvedButtonSize - 24} 8 ${halfWidth + 32} 17 C${
    halfWidth + 24
  } 26 ${halfWidth + 16} 34 ${halfWidth} 34 C${halfWidth - 16} 34 ${
    halfWidth - 24
  } 26 ${halfWidth - 32} 17 C${halfWidth - 32} 17 ${halfWidth - 48} 0 ${
    halfWidth - curvedButtonSize
  } 0 H0Z`;
};
