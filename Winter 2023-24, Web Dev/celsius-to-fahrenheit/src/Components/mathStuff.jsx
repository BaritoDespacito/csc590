import React from 'react';
import ReactDOM from 'react-dom/client';

class MathStuff extends React.Component {
    constructor(){
        super();
        this.state = {
            c: 'n/a',
            f: 'n/a',
        }
    }

    render() {
        return (<div>
            <center>
                <table border='2px'>
                    <tr>
                        <td>
                            <button 
                                onClick={() => {this.setState(() => {
                                    return { 
                                        c: Math.floor(Math.random()*100) 
                                    };
                                },  ); }} >Generate Celsius
                            </button>
                        </td>
                        <td>
                            <div>
                                {this.state.c} C
                            </div>
                        </td>
                        <td>
                            <button 
                                onClick={() => {this.setState(() => {
                                    return { 
                                        f: (this.state.c*9/5)+32
                                    };
                                },  ); }} >Convert
                            </button>
                        </td>
                        <td>
                            <div>
                                {this.state.f} F
                            </div>
                        </td>
                    </tr>
                </table>
            </center>
            </div>);
    };
}

export default MathStuff;