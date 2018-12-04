import React, { Component } from 'react';
import './Userbar.css';

class Userbar extends Component {
    render() {
      return (
        <div>
          <div className="Company">Company</div>
          <div className="User">User</div>
        </div>
      );
    }
  }
  
  export default Userbar;