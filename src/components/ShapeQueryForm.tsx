import useQueryForm from 'hooks/useQueryForm'
import useShapes from 'hooks/useShapes'
import React from 'react'

const ShapeQueryForm = () => {
  const {
    activeId,
    currentShapeName,
    currentColour,
    error,
    handleEditShape,
    handleSelectShape,
    handleInputChange,
    handleDrawShape,
    height,
    isCircular,
    length,
    shapes,
    options,
    radius,
  } = useQueryForm()
  const svgShapes = useShapes({handleEditShape})
  const renderShapes = () => {
    if (error) {
      return <h1 className="error">{error}</h1>
    }

    return shapes.length > 0
      ? shapes.map((shape, idx) => {
          const svg = svgShapes[shape.type]
          return (
            <React.Fragment key={idx}>{svg(shape, activeId)}</React.Fragment>
          )
        })
      : null
  }

  return (
    <section className="container">
      <form className="form" onSubmit={handleDrawShape}>
        <div className="form-group">
          <label className="label" htmlFor="shape-type">
            Select your preferred shape
          </label>
          <select
            required
            className="form-input"
            value={currentShapeName}
            name="shape-type"
            id="shape-type"
            onChange={handleSelectShape}
          >
            <option value="">Choose...</option>
            {options.map((shape, idx) => (
              <React.Fragment key={`${shape}-${idx}`}>
                <option value={shape}>{shape}</option>
              </React.Fragment>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label className="label" htmlFor="colour">
            Select a colour
          </label>
          <input
            required
            className="form-input__colour"
            value={currentColour}
            type="color"
            name="colour"
            id="colour"
            onChange={handleInputChange}
          />
        </div>

        {currentShapeName.length > 0 ? (
          isCircular ? (
            <div className="form-group">
              <label className="label" htmlFor="radius">
                Enter a radius between 1-50
              </label>
              <input
                required
                value={radius}
                className="form-input"
                min="0"
                max="50"
                type="number"
                name="radius"
                id="radius"
                step="0.01"
                onChange={handleInputChange}
              />
            </div>
          ) : currentShapeName === 'square' ||
            currentShapeName === 'triangle' ? (
            <div className="form-group">
              <label className="label" htmlFor="length">
                Enter the length between 1-200
              </label>
              <input
                required
                className="form-input"
                type="number"
                name="length"
                id="length"
                step="0.01"
                value={length}
                onChange={handleInputChange}
              />
            </div>
          ) : (
            <>
              <div className="form-group">
                <label className="label" htmlFor="length">
                  Enter the length between 1-100
                </label>
                <input
                  required
                  className="form-input"
                  type="number"
                  name="length"
                  id="length"
                  step="0.01"
                  value={length}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label className="label" htmlFor="height">
                  Enter the height between 1-100
                </label>
                <input
                  required
                  className="form-input"
                  type="number"
                  name="height"
                  id="height"
                  step="0.01"
                  value={height}
                  onChange={handleInputChange}
                />
              </div>
            </>
          )
        ) : null}
        <div className="form-group">
          <button
            disabled={
              isCircular
                ? currentColour.length === 0 ||
                  currentShapeName.length === 0 ||
                  radius <= 0
                : currentColour.length === 0 ||
                  currentShapeName.length === 0 ||
                  length <= 0
            }
            aria-label="draw"
            type="button"
            className="form-button"
            onClick={handleDrawShape}
          >
            Draw
          </button>
        </div>
      </form>
      <section className="playground">
        <h2>RESULTS:</h2>
        <div className="shapes">{renderShapes()}</div>
      </section>
    </section>
  )
}
export default ShapeQueryForm
