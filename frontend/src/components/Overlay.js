import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

function Overlay({ overlay, onUpdate, onDelete }) {
    const nodeRef = useRef(null);

    const handleDrag = (e, data) => {
        onUpdate(overlay._id, { x: data.x, y: data.y });
    };

    const handleResize = (e, { size }) => {
        onUpdate(overlay._id, { width: size.width, height: size.height });
    };

    return (
        <Draggable
            nodeRef={nodeRef}
            position={{ x: overlay.x, y: overlay.y }}
            onStop={handleDrag}
            bounds="parent"
        >
            <div ref={nodeRef} style={{ position: 'absolute', cursor: 'move' }}>
                <ResizableBox
                    width={overlay.width}
                    height={overlay.height}
                    onResizeStop={handleResize}
                    minConstraints={[50, 30]}
                >
                    <div
                        style={{
                            width: '100%',
                            height: '100%',
                            border: '2px solid #fff',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            color: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '14px',
                            padding: '5px',
                            boxSizing: 'border-box',
                            overflow: 'hidden'
                        }}
                    >
                        {overlay.type === 'text' ? (
                            <span>{overlay.content}</span>
                        ) : (
                            <img
                                src={overlay.content}
                                alt="overlay"
                                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                            />
                        )}
                        <button
                            onClick={() => onDelete(overlay._id)}
                            style={{
                                position: 'absolute',
                                top: '2px',
                                right: '2px',
                                background: 'red',
                                color: 'white',
                                border: 'none',
                                borderRadius: '3px',
                                cursor: 'pointer',
                                padding: '2px 6px',
                                fontSize: '12px'
                            }}
                        >
                            ×
                        </button>
                    </div>
                </ResizableBox>
            </div>
        </Draggable>
    );
}

export default Overlay;