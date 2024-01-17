import React from 'react';
import ReactDOM from 'react-dom/client';
import Instructions from './instructions';
import InstructionsFunction from './instructionsFunction';
import ConvertButton from './convertButton';

class MathStuff extends React.Component {
    constructor(){
        super();
        this.state = {
            flourC: 'n/a',
            flourT: 'n/a',
            eggsC: 'n/a',
            eggsT: 'n/a',
            sugarC: 'n/a',
            sugarT: 'n/a',
        }
    }

    render() {
        return (<div>
            <center>
                <table border='2px'>
                    <tr>
                        <td>Ingredients</td>
                        <td>
                            <button 
                                onClick={() => {this.setState(() => {
                                    return { 
                                        flourC: Math.floor(Math.random()*100), 
                                        eggsC: Math.floor(Math.random()*100),
                                        sugarC: Math.floor(Math.random()*100),
                                    };
                                },  ); }} >Generate Values
                            </button>
                        </td>
                        <td>
                            <button 
                                onClick={() => {this.setState(() => {
                                    return { 
                                        flourT: this.state.flourC*16,
                                        eggsT: this.state.eggsC*16,
                                        sugarT: this.state.sugarC*16,
                                    };
                                },  ); }} >Convert
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>Flour</td>
                        <td>{this.state.flourC} Cups</td>
                        <td>{this.state.flourT} Tablespoons</td>
                    </tr>
                    <tr>
                        <td>Eggs</td>
                        <td>{this.state.eggsC} Cups</td>
                        <td>{this.state.eggsT} Tablespoons</td>
                    </tr>
                    <tr>
                        <td>Sugar</td>
                        <td>{this.state.sugarC} Cups</td>
                        <td>{this.state.sugarT} Tablespoons</td>
                    </tr>
                </table>
                {/* <Instructions 
                    flour='hello'
                    data = {this.state.data}
                /> */}
                <ConvertButton />
                <InstructionsFunction 
                    flour={this.state.flourC}
                    eggs={this.state.eggsC}
                    sugar={this.state.sugarC}
                    unit='cups'
                />
            </center>
            </div>);
    };
}

export default MathStuff;