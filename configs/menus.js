import {
  Facebook,
  Twitter,
  Youtube,
  Github,
  Instagram,
  Linkedin,
} from './../icons/social.icons';

const footerLinks = [
  {
    name: 'Resources',
    id: 'footer-link-0',
    children: [
      {
        id: 0,
        link: '#',
        value: 'About',
      },
      {
        id: 1,
        link: '#',
        value: 'FAQs',
      },
      {
        id: 2,
        link: '#',
        value: 'Contact',
      },
    ],
  },
  {
    name: 'Follow Us',
    id: 'footer-link-1',
    children: [
      {
        id: 0,
        link: 'https://instagram.com/sataylorcustoms',
        value: 'Instagram',
      },
      // {
      //   id: 1,
      //   link: '#',
      //   value: 'Facebook',
      // },
    ],
  },
  {
    name: 'Legal',
    id: 'footer-link-2',
    children: [
      {
        id: 0,
        link: '#',
        value: 'Privacy Policy',
      },
      {
        id: 1,
        link: '#',
        value: 'Terms & Conditions',
      },
    ],
  },
];

const social = [
  {
    id: 0,
    link: '/',
    icon: <Facebook />,
    className: 'facebook',
    title: 'facebook',
    show: false,
  },
  {
    id: 1,
    link: '/',
    icon: <Twitter />,
    className: 'twitter',
    title: 'twitter',
    show: false,
  },
  {
    id: 2,
    link: '/',
    icon: <Youtube />,
    className: 'youtube',
    title: 'youtube',
    show: false,
  },
  {
    id: 3,
    link: '/',
    icon: <Github />,
    className: 'github',
    title: 'github',
    show: false,
  },
  {
    id: 4,
    link: 'https://instagram.com/sataylorcustoms',
    icon: <Instagram />,
    className: 'instagram',
    title: 'instagram',
    show: true,
  },
  {
    id: 5,
    link: '/',
    icon: <Linkedin />,
    className: 'linkedin',
    title: 'linkedin',
    show: false,
  },
];

const headerLinks = [
  {
    id: 1,
    pathname: '/',
    title: 'Catalog',
  },
  {
    id: 2,
    pathname: '/',
    title: 'Custom Order',
  },
];

export { footerLinks, headerLinks, social };
