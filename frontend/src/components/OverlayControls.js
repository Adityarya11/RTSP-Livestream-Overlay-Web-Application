import React, { useState } from 'react';

function OverlayControls({ onAddText, onAddImage }) {
    const [textInput, setTextInput] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleAddText = () => {
        if (textInput.trim()) {
            onAddText(textInput);
            setTextInput('');
        }
    };

    const handleAddImage = () => {
        if (imageUrl.trim()) {
            onAddImage(imageUrl);
            setImageUrl('');
        }
    };

    return (
        <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
            <div style={{ marginBottom: '15px' }}>
                <h3>Add Text Overlay</h3>
                <input
                    type="text"
                    placeholder="Enter text"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    style={{ padding: '8px', marginRight: '10px', width: '300px' }}
                />
                <button onClick={handleAddText} style={{ padding: '8px 16px', cursor: 'pointer' }}>
                    Add Text
                </button>
            </div>

            <div>
                <h3>Add Image Overlay</h3>
                <input
                    type="text"
                    placeholder="Enter image URL"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    style={{ padding: '8px', marginRight: '10px', width: '300px' }}
                />
                <button onClick={handleAddImage} style={{ padding: '8px 16px', cursor: 'pointer' }}>
                    Add Image
                </button>
            </div>
        </div>
    );
}

export default OverlayControls;