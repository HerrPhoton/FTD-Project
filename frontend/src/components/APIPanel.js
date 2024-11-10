import SwaggerUI from 'swagger-ui-react';
import root from 'react-shadow';
import { API_URL } from '../config' 
function APIPanel() {
    return (
        <div className='intro'>
                    <link rel="stylesheet" href="https://unpkg.com/swagger-ui-react/swagger-ui.css" />
                    <SwaggerUI
                        url={`${API_URL}/openapi.json`} 
                        docExpansion="list"
                        supportedSubmitMethods={['get', 'post', 'put', 'delete']}
                    />

        </div>
    );
};
export default APIPanel;

