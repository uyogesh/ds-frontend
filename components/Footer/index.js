import React from 'react';
import { FormattedMessage } from 'react-intl';

import LocaleToggle from 'containers/LocaleToggle';
import messages from './messages';
import './Footer.scss';

function Footer() {
  return (
    <div className="footer">
      <section>
        <FormattedMessage {...messages.licenseMessage} />
      </section>
      <section className="controls">
        <span className="buttons" color="white" text="Support" />
        <span className="buttons" color="white" text="Admin" />
        <span
          className="buttons"
          color="white"
          text="Logout"
          onClick={() => { }}
        />
        <LocaleToggle />
      </section>
    </div>
  );
}

export default Footer;
