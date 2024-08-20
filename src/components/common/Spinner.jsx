import React from 'react';

const Spinner = () => {
    return (
        <div style={spinnerStyle}>
            <div className="spinner-border" role="status">
                <span className="sr-only"></span>
            </div>
        </div>
    );
};

const spinnerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    position: 'fixed',
    width: '100%',
    top: 0,
    left: 0,
    zIndex: 9999,
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
};

export default Spinner;
