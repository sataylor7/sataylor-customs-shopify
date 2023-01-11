import Link from 'next/link';
import SVGLogo from '../icons/logo.icon';

const Logo = ({ className }) => (
  <Link href='/' passHref>
    <a className={className}>
      <span className='sr-only'>S.A.Taylor Customs</span>
      <SVGLogo color={'#fff'} />
    </a>
  </Link>
);

export default Logo;
