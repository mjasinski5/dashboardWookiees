import React from 'react'


const HeaderImg = ({onChangeHandler, viewMode, setNextImageIndex}) => (
  <div className="btn-group" data-toggle="buttons">
  <input type="radio" name="rotationMode"
         checked={viewMode === 'staticMode'}
         value='staticMode'
         id='1'
         onChange={onChangeHandler} /> Static
  <input type="radio" name="rotationMode"
         checked={viewMode === 'rotation'}
         value='rotation'
         id='2'
         onChange={onChangeHandler} /> Rotate
  {(() => {
    if(viewMode === 'staticMode'){
      return (
        <div>
          <button className="btn btn-default btn-lg dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
           <span className="glyphicon glyphicon-arrow-left" />
          </button>
          <button onClick={setNextImageIndex} className="btn btn-default btn-lg dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span className="glyphicon glyphicon-arrow-right" />
          </button>
        </div>
      )
    }
  })()}
  </div>

)

HeaderImg.propTypes = {
  setNextImageIndex: React.PropTypes.func.isRequired,
  onChangeHandler: React.PropTypes.func.isRequired,
  viewMode: React.PropTypes.string
}

export default HeaderImg;
