import React from 'react';
import { Segment, Container, Header } from 'semantic-ui-react';

const about = () => (
  <Container text>
    <Segment raised>
      <Header textAlign="center" >
        About
      </Header>
      <p>
        Hodl & Stake is a free-to-use website.  It allows user to search for
        crypto currencies and manage their portfolio.  It is currently a work in
        progress with more charts and live data being implemented.
      </p>
    </Segment>
    <Segment raised>
      <Header textAlign="center" >Disclaimer
        <Header.Subheader>
          NO FINANCIAL ADVICE
        </Header.Subheader>
      </Header>
      <p>
        The Information on this website is
        provided for education and informational purposes only, without any
        express or implied warranty of any kind, including warranties of
        accuracy, completeness, or fitness for any particular purpose. The
        Information contained in or provided from or through this website is not
        intended to be and does not constitute financial advice, investment
        advice, trading advice or any other advice.
        <strong>
          The Information on this
        website and provided from or through this website is general in nature
        and is not specific to you the User or anyone else. You should not make
        any decision, financial, investment, trading or otherwise, based on any
        of the information presented on this website without undertaking
        independent due diligence and consultation with a professional broker or
        financial advisory.
        </strong>
        You understand that you are using any and all
        Information available on or through this website at your own risk.
      </p>
    </Segment>
  </Container>
);

export default about;
