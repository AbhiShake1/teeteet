import {NextPage} from 'next'
import {AppProps} from 'next/app'

const Index: NextPage<AppProps> = ({pageProps}) => {
    return <div className='flex flex-col space-y-2 ml-4'>
        <code>hello</code>
        <div>hello</div>
        <div>{pageProps}</div>
    </div>
}

export default Index;