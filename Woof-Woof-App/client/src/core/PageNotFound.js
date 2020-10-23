import React from 'react';// React Library.
import { withRouter } from 'react-router-dom';// React Routing Components.

// Component:
const pageNotFound = () => (
    <div
        className="text-center d-flex"
        style={{ height: '90vh', justifyContent: 'center', alignItems: 'center' }}
    >
        <h1>Oops! Something went wrong, page failed to render! <span role="img" aria-label="Bumbed Face">😐</span></h1>
    </div>
);

export default withRouter(pageNotFound);