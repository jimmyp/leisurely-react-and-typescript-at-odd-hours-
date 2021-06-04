import { Dispatch } from "react";
import { connect } from "react-redux";
import { RotateImageAction } from "./store";

type ControlsProps = {
    // prev: () => void,
    rotateImage: () => void,
    // next: () => void,
  }
  
const Controls = (props: ControlsProps) => {
    const { rotateImage } = props;
    return (
        <>
            <button>Previous</button>
            <button onClick={rotateImage}>Rotate</button>
            <button>Next</button>
        </>
    );
};

function mapDispatchToProps(dispatch: Dispatch<RotateImageAction>): ControlsProps {
    return {
        'rotateImage': () => dispatch({ 'type': 'rotateImage', payload: 15 })
    };
}

export default connect(null, mapDispatchToProps)(Controls);