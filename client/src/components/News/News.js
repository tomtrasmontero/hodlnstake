import React from 'react';
import { Container, Header, Grid, Segment, Divider, Image, Responsive } from 'semantic-ui-react';
import newsPlaceholder from '../../assets/news-placeholder.png';
import classes from './News.scss';

const currentNews = (props) => {
  const topNews = props.currentTopTenNews.map(news => (
    <Container className={classes.News} key={`${news.url}${news.publishedAt}`}>
      <Grid stackable stretched relaxed>
        <Grid.Row as={Segment} className={classes.NewsArticle} >
          <Grid.Column stretched width={4}>
            { news.urlToImage === null
              ?
                <Image
                  size="medium"
                  src={newsPlaceholder}
                  alt="News"
                  centered
                />
              :
                <Image
                  size="medium"
                  src={news.urlToImage}
                  alt="News"
                  centered
                />
            }
          </Grid.Column>

          <Grid.Column width={12}>
            <Grid.Row>
              <Header
                as="h2"
              >
                {news.title}
                <Header.Subheader>
                  <p>{news.author} @ {news.source.name}</p>
                </Header.Subheader>
              </Header>
            </Grid.Row>

            <Responsive as={Grid.Row} minWidth={768} >
              <Divider />
              <p>{news.description}</p>
            </Responsive>

            <div>
              <a href={news.url} target="_blank" >Read full article &gt;&gt;</a>
            </div>

          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  ));

  return topNews;
};


export default currentNews;
