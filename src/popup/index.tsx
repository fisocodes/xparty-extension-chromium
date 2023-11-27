import { createRoot } from 'react-dom/client'
import {NextUIProvider} from '@nextui-org/react'
import { StartJoin } from './startJoin'
import { Party } from './party'
import { useEffect, useState } from 'react'
import './index.css'

const rootElement = document.createElement('div')
document.body.prepend(rootElement)
const popupRoot = createRoot(rootElement)

function Index()
{
    const [xpartyId, setXpartyId] = useState<string | undefined>()

    chrome.storage.onChanged.addListener(async ({xpartyId}) =>
    {
        if(xpartyId)
        setXpartyId(xpartyId.newValue)
    })

    return <NextUIProvider>
        <div className='bg-stone-950 w-80 p-8'>
            <h1 className='font-["Comfortaa"] text-center text-5xl tracking-widest text-gray-300'>xparty</h1>
            <div className='my-8'>
                {xpartyId ? <Party/> : <StartJoin/>}
            </div>
            <p className='text-center text-gray-300'>Support the project here</p>
        </div>
    </NextUIProvider>
}


popupRoot.render(<Index/>)
