import React from 'react';
import ReactPlayer from 'react-player';
import AWS from 'aws-sdk';
import { CardDeck, Card, Button, CardColumns } from 'react-bootstrap';
import GenericModal from '../GenericModal/GenericModal';

import './VideoPlayer.css';

const s3 = new AWS.S3({
  accessKeyId: 'AKIA6FM3DP4BKIAGZEPR',
  secretAccessKey: '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',
  Bucket: 'thegangdoesignitevideo'
});

const params = {
  Bucket: 'thegangdoesignitevideo',
  MaxKeys: 5
};

class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      S3MetaData: null,
      isOpen: false,
      currentVideoName: ''
    };
    this.handleOpen = this.handleOpen.bind(this);
  }

  async componentDidMount() {
    const { S3MetaData } = this.state;
    if (!S3MetaData) await this.getS3Data();
  }

  async getS3Data() {
    const data = await s3.listObjects(params).promise();
    this.setState({ S3MetaData: data });
    console.log(data);
  }

  handleClose() {
    this.setState({ isOpen: false, currentVideoName: '' });
  }

  handleOpen(videoName) {
    this.setState({ isOpen: true, currentVideoName: videoName });
  }

  renderVideoCards() {
    const { S3MetaData } = this.state;
    if (S3MetaData) {
      return (
        <CardColumns>
          {S3MetaData.Contents.map((video, index) => {
            return this.renderCard(video.Key, video.LastModified, index);
          })}
        </CardColumns>
      );
    }

    return <h1>Loading or No Video data found to be renderd here</h1>;
  }

  renderCard(videoTitle, lastModified, index) {
    return (
      <Card className="Card" border="secondary">
        <Card.Header>Claim #835730308-00{index}</Card.Header>
        <Card.Body>
        <Card.Subtitle className="mb-2 text-muted">{videoTitle}</Card.Subtitle>
          <Card.Text>Some quick example text to build on the card title.</Card.Text>
          <Button variant='primary' onClick={() => this.handleOpen(videoTitle)}>
            View Video
          </Button>
        </Card.Body>
        <Card.Footer>
          <small className='text-muted'>Last Modified: {lastModified.toUTCString()}</small>
        </Card.Footer>
      </Card>
    );
  }

  renderVideoCard(videoTitle, lastModified) {
    return (
      <Card>
        <Card.Body className='CardBody'>
          <Card.Title>{videoTitle}</Card.Title>
          <ReactPlayer
            className='VideoPlayer'
            url={[
              {
                src: `https://thegangdoesignitevideo.s3.amazonaws.com/${this.state.currentVideoName}`,
                type: 'video/mp4'
              }
            ]}
            width='95%'
            height='95%'
            controls={true}
          />
          <Card.Text>
            This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little
            bit longer.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className='text-muted'>Last Modified {lastModified.toString()}</small>
        </Card.Footer>
      </Card>
    );
  }

  renderVideo(videoTitle) {
    return (
      <ReactPlayer
        className='VideoPlayer'
        url={[
          {
            src: `https://thegangdoesignitevideo.s3.amazonaws.com/${this.state.currentVideoName}`,
            type: 'video/mp4'
          }
        ]}
        width='95%'
        height='95%'
        controls={true}
      />
    );
  }

  render() {
    return (
      <>
        {this.renderVideoCards()}
        <GenericModal
          size='lg'
          header={this.state.currentVideoName}
          handleOpen={this.state.isOpen}
          handleClose={() => this.handleClose()}
          content={this.renderVideo()}
        />
      </>
    );
  }
}

export default VideoPlayer;
