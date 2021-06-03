import React from 'react'
import {SortableContainer} from 'react-sortable-hoc'
import DragableBox from './DragableBox'

const DragableColorList = SortableContainer((props) => {
    const {arr, deleteIcon} = props
    return (
        <div style={{height: '110%'}}>
            {arr.map((i, index) => (
                <DragableBox key={i.id} color={i.color} name={i.name} id={i.id} deleteIcon={deleteIcon} index={index} />
            ))}
        </div>
    )
})
export default DragableColorList
