import React from 'react'

const HeaderImg = ({}) => (
  <div>
  <input type="radio" name="staticRadio"
         value='static'
         checked={true}
         onChange={() => {}} /> Checked
  <input type="radio" name="rotateRadio"
        value='rotation'
        checked={false}
        onChange={() => {}} /> Rotate
  </div>
)


export default HeaderImg;
