import {IDBService} from 'helpers/initCache'
import {useEffect, useState} from 'react'
import {Circle, Polygon, TShape} from '../types'

const circularShapes = ['circle', 'ellipse']
const polygons = ['triangle', 'rectangle', 'square', 'star']

const useQueryForm = () => {
  const [error, setError] = useState('')
  const [currentShapeName, setCurrentShapeName] = useState('')
  const [currentColour, setCurrentColour] = useState('#000000')
  const [radius, setRadius] = useState(0)
  const [length, setLength] = useState(0)
  const [height, setHeight] = useState(0)
  const [activeId, setActiveId] = useState<number | null>(null)
  const [shapes, setShapes] = useState<Array<Polygon & Circle>>([])
  const options = [...circularShapes, ...polygons]

  const shapesDB = IDBService()
  const isCircular = circularShapes.includes(currentShapeName)
  const handleSelectShape = ({
    target,
  }: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentShapeName(target.value)
  }

  const handleInputChange = ({target}: React.ChangeEvent<HTMLInputElement>) => {
    const handlers = {
      length: (value: string) => setLength(parseFloat(value)),
      height: (value: string) => setHeight(parseFloat(value)),
      radius: (value: string) => setRadius(parseFloat(value)),
      colour: (value: string) => setCurrentColour(value),
    }
    //@ts-expect-error
    const inputHandler = handlers[target.name]
    inputHandler(target.value)
  }

  const saveShape = async (newShape: Circle | Polygon) => {
    shapesDB.add(newShape, newShape.id)
  }

  const updateShape = async (newShape: Circle | Polygon) => {
    if (typeof activeId === 'number') {
      shapesDB.update(activeId, newShape)
    }
    setActiveId(null)
  }

  const resetForm = () => {
    setHeight(0)
    setLength(0)
    setRadius(0)
    setCurrentColour('#000000')
    setCurrentShapeName('')
  }

  const handleDrawShape = () => {
    const hasValues =
      (currentShapeName.length > 0 && radius > 0) ||
      (currentShapeName.length > 0 && length > 0) ||
      (currentShapeName.length > 0 && length > 0 && height > 0)
    if (!hasValues) {
      setError('Invalid values! Check your input')
      setTimeout(() => setError(''), 3500)
    }

    if ((length > 200 && height > 200) || radius > 50) {
      setError('Invalid values! Check your input')
      setTimeout(() => setError(''), 3500)
    } else {
      let newShape: Polygon | Circle,
        shapeAttrs: TShape = {
          id: shapes.length,
          type: currentShapeName,
          colour: currentColour,
        }

      newShape =
        currentShapeName === 'circle' || currentShapeName === 'ellipse'
          ? {...shapeAttrs, radius}
          : {
              ...shapeAttrs,
              length,
              height: currentShapeName === 'square' ? length : height,
            }

      typeof activeId === 'number' && activeId >= 0
        ? updateShape(newShape)
        : saveShape(newShape)

      resetForm()
    }
  }

  const handleEditShape = (shape: Circle | Polygon) => {
    if (activeId !== null && activeId === shape.id) {
      setActiveId(null)
      resetForm()
    } else {
      setCurrentColour(shape.colour)
      setCurrentShapeName(shape.type)
      setActiveId(shape.id)
      if (
        (shape.type === 'circle' || shape.type === 'ellipse') &&
        'radius' in shape
      ) {
        setRadius(shape.radius)
      } else if ('length' in shape) {
        setLength(shape.length)
        setHeight(shape.height)
      }
    }
  }
  const deleteShape = () => {
    if (activeId !== null) {
      shapesDB.remove(activeId)
      setActiveId(null)
      resetForm()
    }
  }

  useEffect(() => {
    shapesDB.getAll().then(data => {
      setShapes(data)
    })
  }, [shapesDB, setShapes])

  return {
    activeId,
    currentShapeName,
    currentColour,
    deleteShape,
    error,
    isCircular,
    handleSelectShape,
    handleInputChange,
    handleDrawShape,
    handleEditShape,
    height,
    length,
    options,
    radius,
    shapes,
  }
}
export default useQueryForm
