const Sitemap = () => null

export const getServerSideProps = async ({ res }) => {
    const request = await fetch(`${process.env.NEXT_PUBLIC_REACT_APP_SITEMAP}`);
    const links = await request.text();
    res.setHeader('Content-Type', 'text/xml');
    res.write(links);
    res.end();
  return {
    props: {},
  }
}

export default Sitemap