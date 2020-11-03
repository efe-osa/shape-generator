import React from 'react'
import {Circle, Polygon} from '../types'

const useShapes = ({
  handleEditShape,
}: {
  handleEditShape: (shapeIdx: number) => void
}) => {
  const isActive = (idx: number, activeId: number) =>
    activeId === idx ? 'outline' : ''
  const svgShapes: {[key: string]: any} = {
    circle: ({colour, radius}: Circle, idx: number, activeId: number) => (
      <svg viewBox="0 0 110 110" fill={colour} stroke={colour}>
        <circle
          onClick={() => handleEditShape(idx)}
          className={`circle ${isActive(idx, activeId)}`}
          fill={colour}
          cx="55"
          cy="55"
          r={`${radius}`}
        />
      </svg>
    ),
    ellipse: ({colour, radius}: Circle, idx: number, activeId: number) => (
      <svg viewBox="0 0 150 100" fill={colour} stroke={colour}>
        <ellipse
          onClick={() => handleEditShape(idx)}
          className={`ellipse ${isActive(idx, activeId)}`}
          fill={colour}
          cx="75"
          cy="50"
          rx={`${radius}`}
          ry={`${radius / 2}`}
        />
      </svg>
    ),
    square: (
      {colour, length, height}: Polygon,
      idx: number,
      activeId: number,
    ) => (
      <svg
        viewBox={`0 0 ${length + 10} ${height + 10} `}
        fill={colour}
        stroke={colour}
      >
        <rect
          onClick={() => handleEditShape(idx)}
          className={`square ${isActive(idx, activeId)}`}
          x="5"
          y="5"
          height={height}
          width={length}
        />
      </svg>
    ),
    rectangle: (
      {colour, length, height}: Polygon,
      idx: number,
      activeId: number,
    ) => (
      <svg
        viewBox={`0 0 ${length + 10} ${height + 10} `}
        fill={colour}
        stroke={colour}
      >
        <rect
          onClick={() => handleEditShape(idx)}
          className={`rect ${isActive(idx, activeId)}`}
          x="5"
          y="5"
          height={height}
          width={length}
        />
      </svg>
    ),
    triangle: ({colour, length}: Polygon, idx: number, activeId: number) => (
      <svg viewBox="0 0 210 210" fill={colour} stroke={colour}>
        <polygon
          onClick={() => handleEditShape(idx)}
          className={`triangle ${isActive(idx, activeId)}`}
          points={`5,5 5,${5 + length} ${5 + length},${5 + length},${
            length + 5
          }`}
        />
      </svg>
    ),
    trapezium: ({colour, length}: Polygon, idx: number, activeId: number) => (
      <svg viewBox="0 0 210 210" fill={colour} stroke={colour}>
        <polygon
          onClick={() => handleEditShape(idx)}
          className={`${isActive(idx, activeId)}`}
          points={`m5,5 H${length}z`}
        />
      </svg>
    ),
    star: (
      {colour, length, height}: Polygon,
      idx: number,
      activeId: number,
    ) => (
      <svg
        width={length}
        height={height}
        viewBox="0 0 210 210"
        fill={colour}
        stroke={colour}
      >
        <polygon
          onClick={() => handleEditShape(idx)}
          className={`star ${isActive(idx, activeId)}`}
          points="100,10 40,198 190,78 10,78 160,198"
        />
      </svg>
    ),
  }
  return svgShapes
}

export default useShapes
