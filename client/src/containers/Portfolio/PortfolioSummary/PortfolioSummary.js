import React from 'react';
import { Container, Grid } from 'semantic-ui-react';
import PieChart from '../../../components/Chart/PieChart/PieChart';
import TransactionPerformance from '../../../components/Transaction/TransactionPerformance/TransactionPerformance';
import TransactionSnapShot from '../../../components/Transaction/TransactionSnapShot/TransactionSnapShot';
import classes from './PortfolioSummary.scss';

const portfolioSummary = () => (
  <Container as={Grid} divided stackable columns={2} >
    <Grid.Row className={classes.Row}>
      <Grid.Column computer={6} tablet={16}>
        <PieChart />
      </Grid.Column>
      <Grid.Column computer={10} tablet={16}>
        <Grid.Row>
          <TransactionPerformance />
        </Grid.Row>
        <Grid.Row>
          <TransactionSnapShot />
        </Grid.Row>
      </Grid.Column>
    </Grid.Row>
  </Container>
);


export default portfolioSummary;
