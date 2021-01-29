import React from 'react'

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// Material-u
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
    root: {},
    draggable: {
        backgroundColor: 'ghostwhite',
        width: '100%',
        padding: '20px',
        marginTop: '8px'
    }
})

const ListReorder = ({ list, handleReorderingDesks }) => {
    const classes = useStyles()

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items = reorder(
            list,
            result.source.index,
            result.destination.index
        );
        handleReorderingDesks(items)
        // dispatch(updateEmployee())
        // this.setState({
        //     items
        // });
    }
    if (list.length === 0) return null

    return (
        <Box m={4} display="flex" flexDirection="column">
            <Typography variant="h5">Reorder desk preferences</Typography>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided) => (
                        <Box
                            mt={2}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            display="flex"
                            flexDirection="column">
                            {list.map((item, idx) => (
                                <Draggable key={item.id} draggableId={item.id} index={idx}>
                                    {(provided) => (
                                        <Paper
                                            elevation={1}
                                            className={classes.draggable}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            display="flex">
                                            {item.deskId}
                                        </Paper>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </Box>
                    )}
                </Droppable>
            </DragDropContext>
        </Box>
    )
}

export default ListReorder