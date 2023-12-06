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

    useEffect(() =>
    {
        const getXpartyId = async () =>
        {
            const {xpartyId} = await chrome.storage.session.get('xpartyId')
            setXpartyId(xpartyId)
        }

        getXpartyId()
        
        const storageListener = ({xpartyId}:{xpartyId: chrome.storage.StorageChange}, area: chrome.storage.AreaName) =>
        {
            if(area === 'session' && xpartyId)
            {
                console.log(xpartyId)
                setXpartyId(xpartyId?.newValue)
            }
        }

        chrome.storage.onChanged.addListener(storageListener)

        return () => chrome.storage.onChanged.removeListener(storageListener)

    }, [])

    return <NextUIProvider>
        <div className='bg-neutral-800 w-80 p-8'>
            <h1 className='font-["Comfortaa"] text-center text-5xl tracking-widest text-gray-300'>xparty</h1>
            <div className='my-8'>
                {xpartyId ? <Party/> : <StartJoin/>}
            </div>
            <p className='text-center text-gray-300'>Support the project here</p>
        </div>
    </NextUIProvider>
}


popupRoot.render(<Index/>)
