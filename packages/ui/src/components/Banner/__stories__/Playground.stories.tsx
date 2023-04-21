import image from './Image.png'
import { Template } from './Template'

export const Playground = Template.bind({})

Playground.args = {
  title: 'Apply to Scaleway Startup programs',
  buttonText: 'Apply now',
  linkText: 'Learn more',
  image: <img src={image} alt="" />,
  children: [
    'The Scaleway Startup programs offer the perfect combination of cloud credits, infrastructure advisors and startup experts to develop your business and limit your expenses.',
  ],
}
