import React from 'react';
import ReactDOM from 'react-dom/client';

class Navbar extends React.Component {
    render() {
        return (<div>
            <table border='2px'>
                <tr>
                    <td>home</td>
                    <td>about</td>
                    <td>help</td>
                </tr>
            </table>
            </div>);
    };
}

export default Navbar;