import React from 'react'
import {Circle, Polygon} from '../types'

const useShapes = ({
  handleEditShape,
}: {
  handleEditShape: (shape: Circle | Polygon) => void
}) => {
  const isActive = (idx: number, activeId: number) =>
    activeId === idx ? 'outline' : ''
  const svgShapes: {[key: string]: any} = {
    circle: ({colour, radius, id, ...rest}: Circle, activeId: number) => (
      <svg
        data-testid="svg"
        viewBox="0 0 110 110"
        fill={colour}
        stroke={colour}
      >
        <circle
          onClick={() => handleEditShape({colour, radius, id, ...rest})}
          className={`circle ${isActive(id, activeId)}`}
          fill={colour}
          cx="55"
          cy="55"
          r={`${radius}`}
        />
      </svg>
    ),
    ellipse: ({colour, radius, id, ...rest}: Circle, activeId: number) => (
      <svg
        data-testid="svg"
        viewBox="0 0 150 100"
        fill={colour}
        stroke={colour}
      >
        <ellipse
          onClick={() => handleEditShape({colour, radius, id, ...rest})}
          className={`ellipse ${isActive(id, activeId)}`}
          fill={colour}
          cx="75"
          cy="50"
          rx={`${radius}`}
          ry={`${radius / 2}`}
        />
      </svg>
    ),
    square: (
      {colour, length, height, id, ...rest}: Polygon,

      activeId: number,
    ) => (
      <svg
        data-testid="svg"
        viewBox={`0 0 ${length + 10} ${height + 10} `}
        fill={colour}
        stroke={colour}
      >
        <rect
          onClick={() => handleEditShape({colour, length, height, id, ...rest})}
          className={`square ${isActive(id, activeId)}`}
          x="5"
          y="5"
          height={height}
          width={length}
        />
      </svg>
    ),
    rectangle: (
      {colour, length, height, id, ...rest}: Polygon,

      activeId: number,
    ) => (
      <svg
        data-testid="svg"
        viewBox={`0 0 ${length + 10} ${height + 10} `}
        fill={colour}
        stroke={colour}
      >
        <rect
          onClick={() => handleEditShape({colour, length, height, id, ...rest})}
          className={`rect ${isActive(id, activeId)}`}
          x="5"
          y="5"
          height={height}
          width={length}
        />
      </svg>
    ),
    triangle: (
      {colour, length, height, id, ...rest}: Polygon,

      activeId: number,
    ) => (
      <svg
        data-testid="svg"
        viewBox="0 0 210 210"
        fill={colour}
        stroke={colour}
      >
        <polygon
          onClick={() => handleEditShape({colour, length, height, id, ...rest})}
          className={`triangle ${isActive(id, activeId)}`}
          points={`5,5 5,${5 + length} ${5 + length},${5 + length},${
            length + 5
          }`}
        />
      </svg>
    ),
    trapezium: (
      {colour, length, height, id, ...rest}: Polygon,
      activeId: number,
    ) => (
      <svg
        data-testid="svg"
        viewBox="0 0 210 210"
        fill={colour}
        stroke={colour}
      >
        <polygon
          onClick={() => handleEditShape({colour, length, height, id, ...rest})}
          className={`${isActive(id, activeId)}`}
          points={`m5,5 H${length}z`}
        />
      </svg>
    ),
    star: (
      {colour, length, height, id, ...rest}: Polygon,
      activeId: number,
    ) => (
      <svg
        data-testid="svg"
        width={length}
        height={height}
        viewBox="0 0 210 210"
        fill={colour}
        stroke={colour}
      >
        <polygon
          onClick={() => handleEditShape({colour, length, height, id, ...rest})}
          className={`star ${isActive(id, activeId)}`}
          points="100,10 40,198 190,78 10,78 160,198"
        />
      </svg>
    ),
  }
  return svgShapes
}

export default useShapes
