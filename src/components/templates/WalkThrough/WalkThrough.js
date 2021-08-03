import React, { useRef } from 'react';
import Align from '../../atoms/Align/Align';
import Card from '../../atoms/Card/Card';
import Button from '../../atoms/Button/Button';
import Text from '../../atoms/Text/Text';
import Container from '../../atoms/Container/Container';
import Popup from '../../atoms/Popup/Popup';
import Slider from 'react-slick';
import './WalkThrough.css';
const walk_through_img_domain = 'https://websiteimages.b-cdn.net/test/';
const walk_through_text_1 =
  "You can start by searching your friends' accounts!";
const walk_through_text_2 =
  'Add an announcment for a hangout for your friends to see';
const walk_through_text_3 = 'Add some information about your hangout';
const walk_through_text_4 =
  'Click the attend button for your friends to know you are interested!';
function WalkThrough(props) {
  var sliderRef = useRef(null);
  const sliderSettings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: false,
    arrows: false,
    dots: false,
  };

  function walkThroughSlide(walk_through_img, walk_through_text, index) {
    return (
      <Container>
        <video autoPlay muted loop width={'720px'} height={'485px'}>
          <source
            src={walk_through_img_domain + walk_through_img}
            type="video/mp4"
          />
        </video>
        <Container style={{ height: '15px' }} />
        <Container>
          <Text
            level={'h6'}
            text={walk_through_text}
            style={{ fontWeight: 'bold', display: 'inline-block' }}
          />
          <Button
            onClick={
              index < 4
                ? () => sliderRef.slickNext()
                : () => props.popupStore.setState('close')
            }
            text={{
              text: index < 4 ? 'Next' : 'Got it!',
              style: { fontWeight: 'bold' },
            }}
            primaryColor={'#e5e5e5'}
            secondaryColor={'#454545'}
            style={{
              width: '150px',
              height: '27px',
              float: 'right',
              display: 'inline-block',
              marginTop: '-5px',
            }}
          />
        </Container>
      </Container>
    );
  }

  return (
    <Popup popupStore={props.popupStore}>
      <Container className={'page_container'}>
        <Card>
          <Align align={'start'}>
            <Slider {...sliderSettings} ref={(c) => (sliderRef = c)}>
              {walkThroughSlide('walkthrough1.mov', walk_through_text_1, 1)}
              {walkThroughSlide('walkthrough2.mov', walk_through_text_2, 2)}
              {walkThroughSlide('walkthrough3.mov', walk_through_text_3, 3)}
              {walkThroughSlide('walkthrough4.mov', walk_through_text_4, 4)}
            </Slider>
          </Align>
        </Card>
      </Container>
    </Popup>
  );
}

export default WalkThrough;
