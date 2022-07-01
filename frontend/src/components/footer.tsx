import Link from 'next/link';

const Footer = () => {
  return (
    <footer className=''>
      <hr />
      <span>（フッター）</span>
      <ul className=''>
        <li className=''>
          <Link href='/'>
            <a>Github</a>
          </Link>
        </li>
        <li className=''>
          <Link href='/'>
            <a>Policy</a>
          </Link>
        </li>
        <li className=''>
          <em>0.1</em>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
