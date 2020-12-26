import React from 'react';
import '@brainhubeu/react-carousel/lib/style.css';
import Slider from 'react-slick';
import { ITemplateProgramFeed } from '../../interfaces/templates';
import { TextSm } from '../common/Texts';
import { Card } from '../layout/Card';
import { Box, Link } from '@chakra-ui/core';
import { TEMPLATES_URL } from '../util/InternalLinks';

interface ILandingFeedProps {
  templateFeed: ITemplateProgramFeed[];
}

const LandingFeed: React.FC<ILandingFeedProps> = ({ templateFeed }) => {
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 4000,
    vertical: true,
    arrows: false,
    dots: false,
  };

  if (templateFeed == null) return null;

  return (
    <Slider {...settings}>
      {templateFeed!.map((x, idx) => (
        <Box key={idx}>
          <TemplateFeedItem {...x} />
        </Box>
      ))}
    </Slider>
  );
};

const TemplateFeedItem: React.FC<ITemplateProgramFeed> = ({ username, templateName, templateProgramId }) => {
  const viewTemplateLink = () => (window.location.href = `${TEMPLATES_URL}/${templateProgramId}`);

  return (
    <Card borderWidth="1px" rounded="lg" overflow="hidden" textAlign="center" minW="50px">
      <TextSm py={2}>
        {username} has started the program{' '}
        <TextSm fontWeight="bold" color="blue.400">
          <Link onClick={viewTemplateLink}>
            {templateName}{' '}
            <span role="img" aria-label="">
              🎉
            </span>
          </Link>
        </TextSm>{' '}
      </TextSm>
    </Card>
  );
};

export default LandingFeed;
