import React from 'react';

export default class Footer extends React.Component {
  render() {
    const copyRight = `© ${(new Date()).getFullYear()} enigma Co.,LTD`;
    return (
      <footer className="footer-container">
        <span className="copy-right">{copyRight}</span>
      </footer>
    );
  }
}
