import { connect } from "react-redux";
import { NextImageAction, PrevImageAction, RotateImageAction } from "./store";

type ControlsProps = {
    prev: () => void,
    rotateImage: () => void,
    next: () => void,
  }
  
const Controls = (props: ControlsProps) => {
    const { rotateImage, prev, next } = props;
    return (
        <>
            <button onClick={prev}>Previous</button>
            <button onClick={rotateImage}>Rotate</button>
            <button onClick={next}>Next</button>
        </>
    );
};

const mapDispatchToProps: ControlsProps = {
    rotateImage: () => ({ 'type': 'rotateImage', payload: 15 } as RotateImageAction),
    next: () => ({ type: 'nextImage' } as NextImageAction),
    prev: () => ({ type: 'prevImage' } as PrevImageAction),
};

export default connect(null, mapDispatchToProps)(Controls);