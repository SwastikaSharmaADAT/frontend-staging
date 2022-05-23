import dynamic from 'next/dynamic'
const LinkedInPopUp = dynamic(() => import('react-linkedin-login-oauth2/lib/LinkedInPopUp'), {
  ssr: false,
})

const LinkedIn = () => <LinkedInPopUp />

export default LinkedIn
