import React from 'react';
import ReactDOM from 'react-dom/client';

class Instructions extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            // flour: props.data[flour],
        }
    }

    render() {
        
        return (<div>
            {/* Put {this.state.flour} {this.state.unit} of flour, {this.state.eggs} {this.state.unit} of eggs, and {this.state.sugar} {this.state.unit} of sugar into a bowl. */}
            {this.state.flour}
            hello
            </div>);
    };
}

export default Instructions;